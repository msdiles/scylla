import { IBookmarks, IFolder, ILink } from "@/types/interfaces"
import {
  BOOKMARK_ADD_FOLDER_SUCCEEDED,
  BOOKMARK_ADD_LINK_SUCCEEDED,
  BOOKMARK_ADD_LINK_TO_FOLDER_SUCCEEDED,
  BOOKMARK_CHANGE_LINK_SUCCEEDED,
  BOOKMARK_CHANGE_LINKS_DIRECTION_SUCCEEDED,
  BOOKMARK_DELETE_LINK_SUCCEEDED,
  BOOKMARK_END_LOADING,
  BOOKMARK_FOLDERS_SORT,
  BOOKMARK_GET_ALL_SUCCEEDED,
  BOOKMARK_LINKS_SORT,
  BOOKMARK_START_LOADING,
  BookmarkActionTypes,
} from "@/state/types/bookmark.types"
import { SortBy, SortDirection } from "@/types/types"

interface BookmarkState {
  links: ILink[] | []
  folders: IFolder[] | []
  loading: boolean
  linkSort: {
    sortBy: SortBy
    sortDirection: SortDirection
  }
  folderSort: {
    sortBy: SortBy
    sortDirection: SortDirection
  }
  bookmarks: IBookmarks
}

const initialState: BookmarkState = {
  links: [],
  folders: [],
  loading: false,
  linkSort: {
    sortBy: "setting",
    sortDirection: "sort content ascending",
  },
  folderSort: {
    sortBy: "setting",
    sortDirection: "sort content ascending",
  },
  bookmarks: {
    userId: "",
    links: [],
    folders: [],
  },
}

const bookmarkReducer = (state = initialState, action: BookmarkActionTypes) => {
  switch (action.type) {
    case BOOKMARK_ADD_LINK_SUCCEEDED:
      return {
        ...state,
        links: [...state.links, action.payload.target],
        bookmarks: {
          ...state.bookmarks,
          links: [...state.bookmarks.links, action.payload.target._id],
        },
      }
    case BOOKMARK_CHANGE_LINK_SUCCEEDED:
      return {
        ...state,
        links: [
          ...(state.links as ILink[]).map((link: ILink) => {
            if (link._id === action.payload.target._id) {
              return action.payload.target
            }
            return link
          }),
        ],
      }
    case BOOKMARK_DELETE_LINK_SUCCEEDED:
      return {
        ...state,
        links: [
          ...state.links.filter(
            (link: ILink) => link._id !== action.payload.target._id
          ),
        ],
        folders: [
          ...(state.folders as IFolder[]).map((folder) => {
            if (action.payload.target.folders.includes(folder._id)) {
              return {
                ...folder,
                links: folder.links.filter(
                  (link) => link !== action.payload.target._id
                ),
              }
            }
            return folder
          }),
        ],
        bookmarks: {
          ...state.bookmarks,
          links: state.bookmarks.links.filter(
            (link) => link !== action.payload.target._id
          ),
        },
      }
    case BOOKMARK_ADD_FOLDER_SUCCEEDED:
      return {
        ...state,
        folders: [...state.folders, action.payload.target],
        bookmarks: {
          ...state.bookmarks,
          folders: [...state.bookmarks.folders, action.payload.target._id],
        },
      }
    case BOOKMARK_GET_ALL_SUCCEEDED:
      return {
        ...state,
        links: action.payload.data.links,
        folders: action.payload.data.folders,
        bookmarks: action.payload.data.bookmarks,
      }
    case BOOKMARK_ADD_LINK_TO_FOLDER_SUCCEEDED:
      return {
        ...state,
        folders: [
          ...(state.folders as IFolder[]).map((folder: IFolder) => {
            if (folder._id === action.payload.folder) {
              return {
                ...folder,
                links: [...folder.links, action.payload.link],
              }
            }
            return folder
          }),
        ],
      }
    case BOOKMARK_CHANGE_LINKS_DIRECTION_SUCCEEDED:
      return {
        ...state,
        bookmarks: { ...state.bookmarks, links: action.payload.target },
      }
    case BOOKMARK_LINKS_SORT:
      return {
        ...state,
        linkSort: {
          ...state.linkSort,
          sortBy: action.payload.sortBy,
          sortDirection: action.payload.sortDirection,
        },
      }
    case BOOKMARK_FOLDERS_SORT:
      return {
        ...state,
        folderSort: {
          ...state.folderSort,
          sortBy: action.payload.sortBy,
          sortDirection: action.payload.sortDirection,
        },
      }
    case BOOKMARK_START_LOADING:
      return {
        ...state,
        loading: true,
      }
    case BOOKMARK_END_LOADING:
      return {
        ...state,
        loading: false,
      }
    default:
      return {
        ...state,
      }
  }
}

export default bookmarkReducer
