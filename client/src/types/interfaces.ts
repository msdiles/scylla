import { Color } from "@/types/types"

export interface ILink {
  userId: string
  _id: string
  url: string
  date: string
  folders: string[]
  name: string
  color: Color
  favorite: boolean
}

export interface IFolder {
  userId: string
  _id: string
  date: string
  links: string[]
  name: string
  parent: string
  color: Color
  favorite: boolean
}

export interface ILinkToAdd {
  userId: string
  url: string
  date: string
  folders: string[]
  name: string
  color: Color
  favorite: boolean
}

export interface IFolderToAdd {
  userId: string
  date: string
  links: string[]
  name: string
  parent: string
  color: Color | ""
  favorite: boolean
}

export interface IBookmarks {
  userId: string
  links: string[]
  folders: string[]
}
