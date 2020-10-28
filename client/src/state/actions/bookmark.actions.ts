import {
  AddFolderRequestedPayload,
  AddFolderSucceededPayload,
  AddLinkRequestedPayload,
  AddLinkSucceededPayload,
  AddLinkToFolderRequestedPayload,
  AddLinkToFolderSucceededPayload,
  BOOKMARK_ADD_FOLDER_REQUESTED,
  BOOKMARK_ADD_FOLDER_SUCCEEDED,
  BOOKMARK_ADD_LINK_REQUESTED,
  BOOKMARK_ADD_LINK_SUCCEEDED,
  BOOKMARK_ADD_LINK_TO_FOLDER_REQUESTED,
  BOOKMARK_ADD_LINK_TO_FOLDER_SUCCEEDED,
  BOOKMARK_CHANGE_FOLDER_REQUESTED,
  BOOKMARK_CHANGE_FOLDER_SUCCEEDED,
  BOOKMARK_CHANGE_LINK_REQUESTED,
  BOOKMARK_CHANGE_LINK_SUCCEEDED,
  BOOKMARK_CHANGE_LINKS_DIRECTION_REQUESTED,
  BOOKMARK_CHANGE_LINKS_DIRECTION_SUCCEEDED,
  BOOKMARK_DELETE_FOLDER_REQUESTED,
  BOOKMARK_DELETE_FOLDER_SUCCEEDED,
  BOOKMARK_DELETE_LINK_REQUESTED,
  BOOKMARK_DELETE_LINK_SUCCEEDED,
  BOOKMARK_END_LOADING,
  BOOKMARK_FOLDERS_SORT,
  BOOKMARK_GET_ALL_REQUESTED,
  BOOKMARK_GET_ALL_SUCCEEDED,
  BOOKMARK_LINKS_SORT,
  BOOKMARK_REMOVE_LINK_FROM_FOLDER_REQUESTED,
  BOOKMARK_REMOVE_LINK_FROM_FOLDER_SUCCEEDED,
  BOOKMARK_START_LOADING,
  ChangeFolderRequestedPayload,
  ChangeFolderSucceededPayload,
  ChangeLinkRequestedPayload,
  ChangeLinksDirectionRequestedPayload,
  ChangeLinksDirectionSucceededPayload,
  ChangeLinkSucceededPayload,
  DeleteFolderRequestedPayload,
  DeleteFolderSucceededPayload,
  DeleteLinkRequestedPayload,
  DeleteLinkSucceededPayload,
  GetAllRequestedPayload,
  GetAllSucceededPayload,
  RemoveLinkFromFolderRequestedPayload,
  RemoveLinkFromFolderSucceededPayload,
  SortFoldersPayload,
  SortLinksPayload,
} from "@/state/types/bookmark.types"

export const addLinkRequested = (payload: AddLinkRequestedPayload) => ({
  type: BOOKMARK_ADD_LINK_REQUESTED,
  payload,
})

export const addLinkSucceeded = (payload: AddLinkSucceededPayload) => ({
  type: BOOKMARK_ADD_LINK_SUCCEEDED,
  payload,
})

export const changeLinkRequested = (payload: ChangeLinkRequestedPayload) => ({
  type: BOOKMARK_CHANGE_LINK_REQUESTED,
  payload,
})

export const changeLinkSucceeded = (payload: ChangeLinkSucceededPayload) => ({
  type: BOOKMARK_CHANGE_LINK_SUCCEEDED,
  payload,
})

export const deleteLinkRequested = (payload: DeleteLinkRequestedPayload) => ({
  type: BOOKMARK_DELETE_LINK_REQUESTED,
  payload,
})

export const deleteLinkSucceeded = (payload: DeleteLinkSucceededPayload) => ({
  type: BOOKMARK_DELETE_LINK_SUCCEEDED,
  payload,
})

export const changeFolderRequested = (
  payload: ChangeFolderRequestedPayload
) => ({
  type: BOOKMARK_CHANGE_FOLDER_REQUESTED,
  payload,
})

export const changeFolderSucceeded = (
  payload: ChangeFolderSucceededPayload
) => ({
  type: BOOKMARK_CHANGE_FOLDER_SUCCEEDED,
  payload,
})

export const deleteFolderRequested = (
  payload: DeleteFolderRequestedPayload
) => ({
  type: BOOKMARK_DELETE_FOLDER_REQUESTED,
  payload,
})

export const deleteFolderSucceeded = (
  payload: DeleteFolderSucceededPayload
) => ({
  type: BOOKMARK_DELETE_FOLDER_SUCCEEDED,
  payload,
})

export const addFolderRequested = (payload: AddFolderRequestedPayload) => ({
  type: BOOKMARK_ADD_FOLDER_REQUESTED,
  payload,
})

export const addFolderSucceeded = (payload: AddFolderSucceededPayload) => ({
  type: BOOKMARK_ADD_FOLDER_SUCCEEDED,
  payload,
})

export const addLinkToFolderRequested = (
  payload: AddLinkToFolderRequestedPayload
) => ({
  type: BOOKMARK_ADD_LINK_TO_FOLDER_REQUESTED,
  payload,
})

export const addLinkToFolderSucceeded = (
  payload: AddLinkToFolderSucceededPayload
) => ({
  type: BOOKMARK_ADD_LINK_TO_FOLDER_SUCCEEDED,
  payload,
})

export const removeLinkFromFolderRequested = (
  payload: RemoveLinkFromFolderRequestedPayload
) => ({
  type: BOOKMARK_REMOVE_LINK_FROM_FOLDER_REQUESTED,
  payload,
})

export const removeLinkFromFolderSucceeded = (
  payload: RemoveLinkFromFolderSucceededPayload
) => ({
  type: BOOKMARK_REMOVE_LINK_FROM_FOLDER_SUCCEEDED,
  payload,
})

export const getAllRequested = (payload: GetAllRequestedPayload) => ({
  type: BOOKMARK_GET_ALL_REQUESTED,
  payload,
})

export const getAllSucceeded = (payload: GetAllSucceededPayload) => ({
  type: BOOKMARK_GET_ALL_SUCCEEDED,
  payload,
})

export const startLoadingBookmarkAction = () => ({
  type: BOOKMARK_START_LOADING,
})
export const endLoadingBookmarkAction = () => ({
  type: BOOKMARK_END_LOADING,
})

export const sortLinks = (payload: SortLinksPayload) => ({
  type: BOOKMARK_LINKS_SORT,
  payload,
})

export const sortFolders = (payload: SortFoldersPayload) => ({
  type: BOOKMARK_FOLDERS_SORT,
  payload,
})

export const changeLinksDirectionRequested = (
  payload: ChangeLinksDirectionRequestedPayload
) => ({
  type: BOOKMARK_CHANGE_LINKS_DIRECTION_REQUESTED,
  payload,
})

export const changeLinksDirectionSucceeded = (
  payload: ChangeLinksDirectionSucceededPayload
) => ({
  type: BOOKMARK_CHANGE_LINKS_DIRECTION_SUCCEEDED,
  payload,
})
