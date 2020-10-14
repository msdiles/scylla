import mongoose from "mongoose"

const Schema = mongoose.Schema

export enum roles {
  user = "user",
  moderator = "moderator",
  admin = "admin",
  superadmin = "superadmin",
}

export interface IUser extends mongoose.Document {
  username: string
  email: string
  password: string
  userRole: [roles]
}

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
  userRole: [String],
})

export default mongoose.model<IUser>("user", userSchema)
