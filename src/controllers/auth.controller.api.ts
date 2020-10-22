import { NextFunction, Request, Response } from "express"
import AuthController from "./auth.controller"
import bcrypt from "bcrypt"
import { HTTPException } from "../interfaces/HTTPExtensions"
import { Bookmark } from "../models/Bookmark"

const saltRounds = 10

class AuthControllerApi {
  static async checkEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body.data
      const isUserExist = await AuthController.isUserExist(data.email)
      res.status(200).send({ isUserExist, data })
    } catch (e) {
      next(e)
    }
  }

  static async signUp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, username, password } = req.body.data

      const hashedPassword = await bcrypt.hash(password, saltRounds)
      const isUserExist = await AuthController.isUserExist(email)
      if (isUserExist) {
        res.status(200).send({
          success: false,
          message: "User with this email already exists",
          target: email,
        })
      } else {
        const user = await AuthController.registerUser(
          username,
          email,
          hashedPassword
        )
        await Bookmark.create({ userId: user._id, links: [], folders: [] })
        res.status(200).send({
          success: true,
          message: "You have successfully registered",
          target: email,
        })
      }
    } catch (e) {
      next(e)
    }
  }

  static async signIn(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password, fingerprint } = req.body.data
      const { success, tokenData } = await AuthController.checkPassword(
        password,
        email
      )
      if (!success) {
        throw new HTTPException(401, "Invalid password or email")
      }
      const [accessToken, refreshToken] = await Promise.all([
        AuthController.createAccessToken(tokenData),
        AuthController.createRefreshToken(tokenData, fingerprint),
      ])
      res.status(200).send({
        user: { ...tokenData },
        accessToken: accessToken,
        refreshToken: refreshToken,
        success: true,
        message: "You have successfully signed in",
      })
    } catch (e) {
      next(e)
    }
  }

  static async logOut(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { token } = req.body.data
      await AuthController.deleteSession(token)
      res.status(200).send({
        success: true,
        message: "You have been successfully logged out",
      })
    } catch (e) {
      next(e)
    }
  }

  static async getUserInfo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      res.status(200).send(req.body.user)
    } catch (e) {
      next(e)
    }
  }

  static async checkJWTMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const header = req.headers["authorization"]
      if (typeof header !== "undefined") {
        const bearer = header.split(" ")
        const token = bearer[1]

        if (token) {
          req.body.user = await AuthController.asyncVerify(
            token,
            process.env.ACCESS_SECRET_KEY as string
          )
          next()
        }
      } else {
        res.status(401).send({
          success: false,
          error: "Token is invalid",
        })
      }
    } catch (e) {
      next(e)
    }
  }

  static async refreshTokens(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { token, fingerprint } = req.body.data
      await AuthController.asyncVerify(
        token,
        process.env.REFRESH_SECRET_KEY as string
      )
      const [user, session] = await AuthController.getInfoAboutUserThroughToken(
        token
      )
      await AuthController.checkSessionIsValid(session, fingerprint)
      const tokenData = await AuthController.getTokenPayload(user)
      const [accessToken, refreshToken] = await Promise.all([
        AuthController.createAccessToken(tokenData),
        AuthController.createRefreshToken(tokenData, fingerprint),
      ])
      await AuthController.deleteSession(token)
      res.status(200).send({
        user: { ...tokenData },
        accessToken: accessToken,
        refreshToken: refreshToken,
        success: true,
      })
    } catch (e) {
      try {
        await AuthController.deleteSession(req.body.data.token)
        next(e)
      } catch (e) {
        next(e)
      }
    }
  }

  static async getResetURL(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email } = req.body.data
      const isUserExist = await AuthController.isUserExist(email)
      res.status(202).send({ isUserExist })
      if (isUserExist) {
        await AuthController.createResetPasswordURL(email)
      }
    } catch (e) {
      next(e)
    }
  }

  static async resetCheck(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { resetId, resetDate } = req.body.data
      const isToken = await AuthController.checkResetToken(resetId, resetDate)
      if (isToken) {
        res.status(200).send({ success: true })
      } else {
        throw new HTTPException(403, "Token not found")
      }
    } catch (e) {
      next(e)
    }
  }

  static async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { resetId, resetDate, password } = req.body.data

      const isToken = await AuthController.checkResetToken(resetId, resetDate)

      if (isToken) {
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        await AuthController.changePassword(resetId, resetDate, hashedPassword)
        res.status(200).send({ success: true })
      } else {
        throw new HTTPException(403, "Token not found")
      }
    } catch (e) {
      next(e)
    }
  }
}

export default AuthControllerApi
