import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"
import { HTTPException } from "../interfaces/HTTPExtensions"
import User, { IUser, roles } from "../models/User"
import Session, { ISession } from "../models/Session"
import Email from "../email/email.api"
import ResetToken, { IResetToken } from "../models/ResetToken"

export interface User {
  id: string
  name: string
  role: string[]
}

class AuthController {
  static async isUserExist(email: string): Promise<boolean> {
    try {
      const user = await User.findOne({ email })
      return !!user
    } catch (e) {
      throw new HTTPException(500, "Database query error")
    }
  }

  static async registerUser(
    login: string,
    email: string,
    password: string
  ): Promise<IUser> {
    try {
      const user = await User.create({
        username: login,
        email,
        password,
        userRole: [roles.user],
      })
      return user
    } catch (e) {
      throw new HTTPException(
        500,
        "Something went wrong. User registration failed"
      )
    }
  }

  static async checkPassword(password: string, email: string) {
    try {
      const user = await User.findOne({ email })
      if (!user) {
        throw new HTTPException(401, "Invalid password or email")
      }
      const [tokenData, success] = await Promise.all([
        this.getTokenPayload(user),
        bcrypt.compare(password, user.password),
      ])
      return { success, tokenData }
    } catch (e) {
      if (e instanceof HTTPException) {
        throw new HTTPException(e.status, e.message)
      } else throw new Error(e.message)
    }
  }

  static async createAccessToken(
    payload: User,
    time: string = "10m"
  ): Promise<string> {
    try {
      return await this.asyncSign(
        { user: payload },
        process.env.ACCESS_SECRET_KEY as string,
        { expiresIn: time }
      )
    } catch (e) {
      throw new Error(e)
    }
  }

  static async createRefreshToken(
    payload: User,
    fingerprint: string
  ): Promise<string> {
    try {
      const sessions = await Session.find({ userId: payload.id })
      if (sessions.length >= 5) {
        await Session.deleteMany({ userId: payload.id })
      }
      const token = await this.asyncSign(
        { user: payload },
        process.env.REFRESH_SECRET_KEY as string,
        { expiresIn: "12m" }
      )
      await Session.create({
        refreshToken: token,
        fingerprint,
        userId: payload.id,
      })
      return token
    } catch (e) {
      throw new Error(e)
    }
  }

  static async deleteSession(token: string): Promise<void> {
    try {
      await Session.deleteOne({ refreshToken: token })
    } catch (e) {
      throw new Error(e)
    }
  }

  static async asyncSign(
    { user }: { user: User },
    secret: string,
    { expiresIn }: { expiresIn: string }
  ): Promise<string> {
    try {
      return await jwt.sign({ user: user }, secret, { expiresIn })
    } catch (e) {
      throw new Error(e)
    }
  }

  static async asyncVerify(
    token: string,
    secret: string
  ): Promise<string | object> {
    try {
      return await jwt.verify(token, secret)
    } catch (e) {
      if (e.message === "jwt expired") {
        throw new HTTPException(401, "Token expired", e)
      } else {
        throw new HTTPException(401, "Invalid token", e)
      }
    }
  }

  static async getInfoAboutUserThroughToken(
    token: string
  ): Promise<[IUser, ISession]> {
    try {
      const session = await Session.findOne({ refreshToken: token })
      if (!session) {
        throw new HTTPException(403, "Not found token")
      }
      const user = await User.findOne({ _id: session.userId })

      if (!user) {
        throw new HTTPException(403, "Not found user")
      }
      return [user, session]
    } catch (e) {
      if (e instanceof HTTPException) {
        throw new HTTPException(e.status, e.message)
      } else throw new Error(e.message)
    }
  }

  static async checkSessionIsValid(
    session: ISession,
    fingerprint: string
  ): Promise<boolean> {
    try {
      if (session.fingerprint === fingerprint) {
        return await true
      } else {
        throw new HTTPException(403, "Invalid fingerprint")
      }
    } catch (e) {
      if (e instanceof HTTPException) {
        throw new HTTPException(e.status, e.message)
      } else throw new Error(e.message)
    }
  }

  static async getTokenPayload(userData: IUser): Promise<User> {
    try {
      return {
        id: userData._id,
        name: userData.username,
        role: userData.userRole,
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  static async getInfoAboutUserThroughEmail(email: string): Promise<IUser> {
    try {
      return (await User.findOne({ email })) as IUser
    } catch (e) {
      throw new Error(e)
    }
  }

  static async createResetPasswordURL(email: string): Promise<void> {
    try {
      const userData = await this.getInfoAboutUserThroughEmail(email)
      const resetDate = new Date().getTime().toString()
      const resetId = await uuidv4()
      await this.saveResetTokenToDatabase(userData.id, resetDate, resetId)
      const sender = new Email(resetDate, resetId, email)
      await sender.sendEmail()
    } catch (e) {}
  }

  static async saveResetTokenToDatabase(
    id: string,
    resetDate: string,
    resetId: string
  ): Promise<void> {
    try {
      await ResetToken.deleteMany({ userId: id })
      await ResetToken.create({ userId: id, resetId, resetDate })
    } catch (e) {
      throw new Error(e)
    }
  }

  static async checkResetToken(
    resetId: string,
    resetDate: string
  ): Promise<boolean> {
    try {
      const result = await ResetToken.findOne({ resetId, resetDate })
      return !!result
    } catch (e) {
      throw new Error(e)
    }
  }

  static async changePassword(
    resetId: string,
    resetDate: string,
    password: string
  ) {
    try {
      const user = (await ResetToken.findOne({
        resetId,
        resetDate,
      })) as IResetToken
      await User.findByIdAndUpdate(user.userId, { password: password })
      await ResetToken.deleteOne({ resetId, resetDate })
    } catch (e) {
      throw new Error(e)
    }
  }
}

export default AuthController
