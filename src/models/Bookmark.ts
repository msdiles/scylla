import mongoose from "mongoose"

const Schema = mongoose.Schema

interface ILink extends mongoose.Document {
  url: string
  date: string
  folders: IFolder[] | []
  name: string
  color: string
}

interface IFolder extends mongoose.Document {
  date: string
  name: string
}

interface IBookmark extends mongoose.Document {
  userId: string
  links: ILink[] | []
  folders: IFolder[] | []
}

const linkSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  url: { type: String, required: true },
  date: { type: Date, required: true },
  folders: [{ type: Schema.Types.ObjectId, ref: "Folder" }],
  name: { type: String, required: true },
  color: { type: String, required: true },
})

const folderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, required: true },
  links: [{ type: Schema.Types.ObjectId, ref: "Link" }],
  name: { type: String, required: true },
  parent: { type: String },
})

export const Link = mongoose.model<ILink>("Link", linkSchema)
export const Folder = mongoose.model<IFolder>("Folder", folderSchema)

// export const Bookmark = mongoose.model<IBookmark>("Bookmark", bookmarkSchema)
