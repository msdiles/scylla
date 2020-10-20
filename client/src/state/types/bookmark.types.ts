import { IFolder, ILink } from "@/types/interfaces"

export const BOOKMARK_ADD_LINK_REQUESTED = "BOOKMARK_ADD_LINK_REQUESTED"
export const BOOKMARK_ADD_LINK_SUCCEEDED = "BOOKMARK_ADD_LINK_SUCCEEDED"

export const BOOKMARK_CHANGE_LINK_REQUESTED = "BOOKMARK_CHANGE_LINK_REQUESTED"
export const BOOKMARK_CHANGE_LINK_SUCCEEDED = "BOOKMARK_CHANGE_LINK_SUCCEEDED"

export const BOOKMARK_DELETE_LINK_REQUESTED = "BOOKMARK_DELETE_LINK_REQUESTED"
export const BOOKMARK_DELETE_LINK_SUCCEEDED = "BOOKMARK_DELETE_LINK_SUCCEEDED"

export const BOOKMARK_ADD_FOLDER_REQUESTED = "BOOKMARK_ADD_FOLDER_REQUESTED"
export const BOOKMARK_ADD_FOLDER_SUCCEEDED = "BOOKMARK_ADD_FOLDER_SUCCEEDED"

export const BOOKMARK_ADD_LINK_TO_FOLDER_REQUESTED =
  "BOOKMARK_ADD_LINK_TO_FOLDER_REQUESTED"
export const BOOKMARK_ADD_LINK_TO_FOLDER_SUCCEEDED =
  "BOOKMARK_ADD_LINK_TO_FOLDER_SUCCEEDED"

export const BOOKMARK_GET_ALL_REQUESTED = "BOOKMARK_GET_ALL_REQUESTED"
export const BOOKMARK_GET_ALL_SUCCEEDED = "BOOKMARK_GET_ALL_SUCCEEDED"

export const BOOKMARK_START_LOADING = "BOOKMARK_START_LOADING"
export const BOOKMARK_END_LOADING = "BOOKMARK_END_LOADING"

//AddLink
export interface AddLinkRequestedPayload {
  data: {
    userId: string
    date: Date
    url: string
    folders: string[] | []
    name: string
    color: string
  }
}

export interface AddLinkRequestedAction {
  type: typeof BOOKMARK_ADD_LINK_REQUESTED
  payload: AddLinkRequestedPayload
}

export interface AddLinkSucceededPayload {
  success: boolean
  target: ILink
}

interface AddLinkSucceededAction {
  type: typeof BOOKMARK_ADD_LINK_SUCCEEDED
  payload: AddLinkSucceededPayload
}

//ChangeLink
export interface ChangeLinkRequestedPayload {
  data: {
    id: string
    target: ILink
  }
}

export interface ChangeLinkRequestedAction {
  type: typeof BOOKMARK_CHANGE_LINK_REQUESTED
  payload: ChangeLinkRequestedPayload
}

export interface ChangeLinkSucceededPayload {
  success: boolean
  target: ILink
}

interface ChangeLinkSucceededAction {
  type: typeof BOOKMARK_CHANGE_LINK_SUCCEEDED
  payload: ChangeLinkSucceededPayload
}

//DeleteLink
export interface DeleteLinkRequestedPayload {
  data: {
    target: ILink
  }
}

export interface DeleteLinkRequestedAction {
  type: typeof BOOKMARK_DELETE_LINK_REQUESTED
  payload: DeleteLinkRequestedPayload
}

export interface DeleteLinkSucceededPayload {
  success: boolean
  target: ILink
}

interface DeleteLinkSucceededAction {
  type: typeof BOOKMARK_DELETE_LINK_SUCCEEDED
  payload: DeleteLinkSucceededPayload
}

//AddFolder
export interface AddFolderRequestedPayload {
  data: {
    userId: string
    date: Date
    parent: string
    name: string
  }
}

export interface AddFolderRequestedAction {
  type: typeof BOOKMARK_ADD_FOLDER_REQUESTED
  payload: AddFolderRequestedPayload
}

export interface AddFolderSucceededPayload {
  success: boolean
  target: IFolder
}

interface AddFolderSucceededAction {
  type: typeof BOOKMARK_ADD_FOLDER_SUCCEEDED
  payload: AddFolderSucceededPayload
}

//AddLinkToFolder
export interface AddLinkToFolderRequestedPayload {
  data: {
    link: string
    folder: string
  }
}

export interface AddLinkToFolderRequestedAction {
  type: typeof BOOKMARK_ADD_LINK_TO_FOLDER_REQUESTED
  payload: AddLinkToFolderRequestedPayload
}

export interface AddLinkToFolderSucceededPayload {
  link: string
  folder: string
}

interface AddLinkToFolderSucceededAction {
  type: typeof BOOKMARK_ADD_LINK_TO_FOLDER_SUCCEEDED
  payload: AddLinkToFolderSucceededPayload
}

//GetAll
export interface GetAllRequestedPayload {
  data: {
    userId: string
  }
}

export interface GetAllRequestedAction {
  type: typeof BOOKMARK_GET_ALL_REQUESTED
  payload: GetAllRequestedPayload
}

export interface GetAllSucceededPayload {
  success: boolean
  data: {
    links: ILink[]
    folders: IFolder[]
  }
}

interface GetAllSucceededAction {
  type: typeof BOOKMARK_GET_ALL_SUCCEEDED
  payload: GetAllSucceededPayload
}

//StartLoading
interface StartLoadingBookmarkAction {
  type: typeof BOOKMARK_START_LOADING
}

//

//EndLoading
interface EndLoadingBookmarkAction {
  type: typeof BOOKMARK_END_LOADING
}

//

export type BookmarkActionTypes =
  | AddLinkRequestedAction
  | AddLinkSucceededAction
  | ChangeLinkRequestedAction
  | ChangeLinkSucceededAction
  | DeleteLinkRequestedAction
  | DeleteLinkSucceededAction
  | AddFolderRequestedAction
  | AddFolderSucceededAction
  | AddLinkToFolderRequestedAction
  | AddLinkToFolderSucceededAction
  | GetAllRequestedAction
  | GetAllSucceededAction
  | StartLoadingBookmarkAction
  | EndLoadingBookmarkAction
