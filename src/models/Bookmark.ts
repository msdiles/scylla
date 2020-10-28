import mongoose from "mongoose"

const Schema = mongoose.Schema

interface ILink extends mongoose.Document {
  userId: string
  url: string
  date: string
  folders: IFolder[] | []
  name: string
  color: string
  favorite: boolean
}

interface IFolder extends mongoose.Document {
  userId: string
  date: string
  name: string
  links: string[] | []
  parent: string
  favorite: boolean
}

interface IBookmark extends mongoose.Document {
  userId: string
  links: string[]
  folders: string[]
}

const bookmarkSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  folders: [String],
  links: [String],
})

const linkSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  url: { type: String, required: true },
  date: { type: String, required: true },
  folders: [{ type: Schema.Types.ObjectId, ref: "Folder" }],
  name: { type: String, required: true },
  color: { type: String, required: true },
  favorite: { type: Boolean, required: true },
})

const folderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: String, required: true },
  links: [{ type: Schema.Types.ObjectId, ref: "Link" }],
  name: { type: String, required: true },
  parent: { type: String },
  favorite: { type: Boolean, required: true },
})

export const Link = mongoose.model<ILink>("Link", linkSchema)
export const Folder = mongoose.model<IFolder>("Folder", folderSchema)
export const Bookmark = mongoose.model<IBookmark>("Bookmark", bookmarkSchema)
