import { color } from "@/types/types"

export interface ILink {
  url: string
  date: string
  folders: string[]
  name: string
  _id?: string
  color: color
  userId: string
}

export interface IFolder {
  date: string
  links: string[]
  name: string
  parent: string
  _id: string
}

export interface ILinkToAdd {
  url: string
  date: string
  folder: string[] | IFolder[]
  name: string
  _id?: string
}

export interface IFolderToAdd {
  date: string
  links: string[] | ILink[]
  name: string
  parent: string
  _id?: string
}
