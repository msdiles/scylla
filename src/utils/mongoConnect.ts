import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

export default async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
  } catch (e) {
    throw new Error(e.message)
  }
}
