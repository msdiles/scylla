import mongoose from "mongoose"

const Schema = mongoose.Schema

export interface ISession extends mongoose.Document {
  userId: string
  fingerprint: string
  refreshToken: string
}

const sessionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  fingerprint: { type: String, required: true },
  refreshToken: { type: String, required: true },
})

export default mongoose.model<ISession>("session", sessionSchema)
