import {
  IBookmarks,
  IFolder,
  IFolderToAdd,
  ILink,
  ILinkToAdd,
} from "@/types/interfaces"
import { SortBy, SortDirection } from "@/types/types"

export const BOOKMARK_ADD_LINK_REQUESTED = "BOOKMARK_ADD_LINK_REQUESTED"
export const BOOKMARK_ADD_LINK_SUCCEEDED = "BOOKMARK_ADD_LINK_SUCCEEDED"

export const BOOKMARK_CHANGE_LINK_REQUESTED = "BOOKMARK_CHANGE_LINK_REQUESTED"
export const BOOKMARK_CHANGE_LINK_SUCCEEDED = "BOOKMARK_CHANGE_LINK_SUCCEEDED"

export const BOOKMARK_DELETE_LINK_REQUESTED = "BOOKMARK_DELETE_LINK_REQUESTED"
export const BOOKMARK_DELETE_LINK_SUCCEEDED = "BOOKMARK_DELETE_LINK_SUCCEEDED"

export const BOOKMARK_ADD_FOLDER_REQUESTED = "BOOKMARK_ADD_FOLDER_REQUESTED"
export const BOOKMARK_ADD_FOLDER_SUCCEEDED = "BOOKMARK_ADD_FOLDER_SUCCEEDED"

export const BOOKMARK_CHANGE_FOLDER_REQUESTED =
  "BOOKMARK_CHANGE_FOLDER_REQUESTED"
export const BOOKMARK_CHANGE_FOLDER_SUCCEEDED =
  "BOOKMARK_CHANGE_FOLDER_SUCCEEDED"

export const BOOKMARK_DELETE_FOLDER_REQUESTED =
  "BOOKMARK_DELETE_FOLDER_REQUESTED"
export const BOOKMARK_DELETE_FOLDER_SUCCEEDED =
  "BOOKMARK_DELETE_FOLDER_SUCCEEDED"

export const BOOKMARK_ADD_LINK_TO_FOLDER_REQUESTED =
  "BOOKMARK_ADD_LINK_TO_FOLDER_REQUESTED"
export const BOOKMARK_ADD_LINK_TO_FOLDER_SUCCEEDED =
  "BOOKMARK_ADD_LINK_TO_FOLDER_SUCCEEDED"

export const BOOKMARK_REMOVE_LINK_FROM_FOLDER_REQUESTED =
  "BOOKMARK_REMOVE_LINK_FROM_FOLDER_REQUESTED"
export const BOOKMARK_REMOVE_LINK_FROM_FOLDER_SUCCEEDED =
  "BOOKMARK_REMOVE_LINK_FROM_FOLDER_SUCCEEDED"

export const BOOKMARK_GET_ALL_REQUESTED = "BOOKMARK_GET_ALL_REQUESTED"
export const BOOKMARK_GET_ALL_SUCCEEDED = "BOOKMARK_GET_ALL_SUCCEEDED"

export const BOOKMARK_START_LOADING = "BOOKMARK_START_LOADING"
export const BOOKMARK_END_LOADING = "BOOKMARK_END_LOADING"

export const BOOKMARK_LINKS_SORT = "BOOKMARK_LINKS_SORT"
export const BOOKMARK_FOLDERS_SORT = "BOOKMARK_FOLDERS_SORT"

export const BOOKMARK_CHANGE_LINKS_DIRECTION_REQUESTED =
  "BOOKMARK_CHANGE_LINKS_DIRECTION_REQUESTED"
export const BOOKMARK_CHANGE_LINKS_DIRECTION_SUCCEEDED =
  "BOOKMARK_CHANGE_LINKS_DIRECTION_SUCCEEDED"

export const BOOKMARK_CLEAR = "BOOKMARK_CLEAR"

//AddLink
export interface AddLinkRequestedPayload {
  data: ILinkToAdd
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
  data: IFolderToAdd
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

//ChangeFolder
export interface ChangeFolderRequestedPayload {
  data: {
    target: IFolder
  }
}

export interface ChangeFolderRequestedAction {
  type: typeof BOOKMARK_CHANGE_FOLDER_REQUESTED
  payload: ChangeFolderRequestedPayload
}

export interface ChangeFolderSucceededPayload {
  success: boolean
  target: IFolder
}

interface ChangeFolderSucceededAction {
  type: typeof BOOKMARK_CHANGE_FOLDER_SUCCEEDED
  payload: ChangeFolderSucceededPayload
}

//DeleteFolder
export interface DeleteFolderRequestedPayload {
  data: {
    target: IFolder
  }
}

export interface DeleteFolderRequestedAction {
  type: typeof BOOKMARK_DELETE_FOLDER_REQUESTED
  payload: DeleteFolderRequestedPayload
}

export interface DeleteFolderSucceededPayload {
  success: boolean
  target: IFolder
}

interface DeleteFolderSucceededAction {
  type: typeof BOOKMARK_DELETE_FOLDER_SUCCEEDED
  payload: DeleteFolderSucceededPayload
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
  success: boolean
  target: {
    link: string
    folder: string
  }
}

interface AddLinkToFolderSucceededAction {
  type: typeof BOOKMARK_ADD_LINK_TO_FOLDER_SUCCEEDED
  payload: AddLinkToFolderSucceededPayload
}

//RemoveLinkFromFolder
export interface RemoveLinkFromFolderRequestedPayload {
  data: {
    link: string
    folder: string
  }
}

export interface RemoveLinkFromFolderRequestedAction {
  type: typeof BOOKMARK_REMOVE_LINK_FROM_FOLDER_REQUESTED
  payload: RemoveLinkFromFolderRequestedPayload
}

export interface RemoveLinkFromFolderSucceededPayload {
  success: boolean
  target: {
    link: string
    folder: string
  }
}

interface RemoveLinkFromFolderSucceededAction {
  type: typeof BOOKMARK_REMOVE_LINK_FROM_FOLDER_SUCCEEDED
  payload: RemoveLinkFromFolderSucceededPayload
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
    bookmarks: IBookmarks
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

//SortLinks
export interface SortLinksPayload {
  sortBy: SortBy
  sortDirection: SortDirection
}

interface SortLinksAction {
  type: typeof BOOKMARK_LINKS_SORT
  payload: SortLinksPayload
}

//SortFolders
export interface SortFoldersPayload {
  sortBy: SortBy
  sortDirection: SortDirection
}

interface SortFoldersAction {
  type: typeof BOOKMARK_FOLDERS_SORT
  payload: SortFoldersPayload
}

//ChangeLinksDirectionRequested
export interface ChangeLinksDirectionRequestedPayload {
  forChange: {
    links: string[]
    source: number
    destination: number
  }
  userId: string
}

export interface ChangeLinksDirectionRequestedAction {
  type: typeof BOOKMARK_CHANGE_LINKS_DIRECTION_REQUESTED
  payload: ChangeLinksDirectionRequestedPayload
}

//ChangeLinksDirectionSucceeded
export interface ChangeLinksDirectionSucceededPayload {
  success: boolean
  target: string[]
}

export interface ChangeLinksDirectionSucceededAction {
  type: typeof BOOKMARK_CHANGE_LINKS_DIRECTION_SUCCEEDED
  payload: ChangeLinksDirectionSucceededPayload
}

//Clear

export interface ClearAction {
  type: typeof BOOKMARK_CLEAR
}

export type BookmarkActionTypes =
  | AddLinkRequestedAction
  | AddLinkSucceededAction
  | ChangeLinkRequestedAction
  | ChangeLinkSucceededAction
  | DeleteLinkRequestedAction
  | DeleteLinkSucceededAction
  | AddFolderRequestedAction
  | AddFolderSucceededAction
  | ChangeFolderRequestedAction
  | ChangeFolderSucceededAction
  | DeleteFolderRequestedAction
  | DeleteFolderSucceededAction
  | AddLinkToFolderRequestedAction
  | AddLinkToFolderSucceededAction
  | RemoveLinkFromFolderRequestedAction
  | RemoveLinkFromFolderSucceededAction
  | GetAllRequestedAction
  | GetAllSucceededAction
  | StartLoadingBookmarkAction
  | EndLoadingBookmarkAction
  | SortLinksAction
  | SortFoldersAction
  | ChangeLinksDirectionRequestedAction
  | ChangeLinksDirectionSucceededAction
  | ClearAction
