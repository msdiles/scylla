import mongoose from "mongoose"

const Schema = mongoose.Schema

export interface IResetToken extends mongoose.Document {
  userId: string
  resetId: string
  resetDate: string
}

const userSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  resetId: { type: String, required: true },
  resetDate: { type: String, required: true },
})

export default mongoose.model<IResetToken>("resetToken", userSchema)
