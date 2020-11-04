import { put, takeEvery, call, select, all } from "redux-saga/effects"
import {
  AddLinkRequestedAction,
  AddLinkToFolderRequestedAction,
  BOOKMARK_ADD_FOLDER_REQUESTED,
  BOOKMARK_ADD_LINK_REQUESTED,
  BOOKMARK_ADD_LINK_TO_FOLDER_REQUESTED,
  BOOKMARK_CHANGE_FOLDER_REQUESTED,
  BOOKMARK_CHANGE_LINK_REQUESTED,
  BOOKMARK_CHANGE_LINKS_DIRECTION_REQUESTED,
  BOOKMARK_DELETE_FOLDER_REQUESTED,
  BOOKMARK_DELETE_LINK_REQUESTED,
  BOOKMARK_GET_ALL_REQUESTED,
  BOOKMARK_REMOVE_LINK_FROM_FOLDER_REQUESTED,
  ChangeFolderRequestedAction,
  ChangeLinkRequestedAction,
  ChangeLinksDirectionRequestedAction,
  DeleteFolderRequestedAction,
  DeleteLinkRequestedAction,
  GetAllRequestedAction,
  RemoveLinkFromFolderRequestedAction,
} from "@/state/types/bookmark.types"
import { setError, setMessage } from "@/state/actions/app.actions"
import {
  addFolderRequested,
  addFolderSucceeded,
  addLinkRequested,
  addLinkSucceeded,
  addLinkToFolderRequested,
  addLinkToFolderSucceeded,
  changeFolderRequested,
  changeFolderSucceeded,
  changeLinkRequested,
  changeLinksDirectionRequested,
  changeLinksDirectionSucceeded,
  changeLinkSucceeded,
  deleteFolderRequested,
  deleteFolderSucceeded,
  deleteLinkRequested,
  deleteLinkSucceeded,
  endLoadingBookmarkAction,
  getAllRequested,
  getAllSucceeded,
  removeLinkFromFolderRequested,
  removeLinkFromFolderSucceeded,
  startLoadingBookmarkAction,
} from "@/state/actions/bookmark.actions"
import http from "@/http/http"
import { refreshRequested } from "@/state/actions/auth.actions"
import { RootState } from "@/state/reducers"
import changeLinksPosition from "@/utils/changeLinksPosition"

const getAccessToken = (state: RootState) => state.auth.userToken

export function* addLinkRequestedSaga(action: AddLinkRequestedAction) {
  try {
    yield put(startLoadingBookmarkAction())
    const token = yield select(getAccessToken)
    const response = yield call(
      http,
      "/bookmark/link/add",
      "POST",
      {
        ...action.payload.data,
      },
      { Authorization: `bearer ${token}` }
    )
    if (response.status === 401) {
      yield put(
        refreshRequested({ action: addLinkRequested, data: action.payload })
      )
    } else {
      if (response.status > 200) throw new Error("Something went wrong")
      const result = yield response.json()
      yield put(addLinkSucceeded({ ...result }))

      yield all(
        (action.payload.data.folders as any).map((folder: string) => {
          return put(
            addLinkToFolderSucceeded({
              success: true,
              target: { link: result.target._id, folder },
            })
          )
        })
      )
      yield put(setMessage({ message: "Bookmark added" }))
    }
  } catch (e) {
    yield put(setError({ error: e.message }))
  } finally {
    yield put(endLoadingBookmarkAction())
  }
}

export function* changeLinkRequestedSaga(action: ChangeLinkRequestedAction) {
  try {
    yield put(startLoadingBookmarkAction())
    const token = yield select(getAccessToken)
    const response = yield call(
      http,
      "/bookmark/link/change",
      "POST",
      {
        ...action.payload.data,
      },
      { Authorization: `bearer ${token}` }
    )
    if (response.status === 401) {
      yield put(
        refreshRequested({ action: changeLinkRequested, data: action.payload })
      )
    } else {
      if (response.status > 200) throw new Error("Something went wrong")
      const result = yield response.json()
      yield put(changeLinkSucceeded({ ...result }))
      yield put(setMessage({ message: "Bookmark changed" }))
    }
  } catch (e) {
    yield put(setError({ error: e.message }))
  } finally {
    yield put(endLoadingBookmarkAction())
  }
}

export function* deleteLinkRequestedSaga(action: DeleteLinkRequestedAction) {
  try {
    yield put(startLoadingBookmarkAction())
    const token = yield select(getAccessToken)
    const response = yield call(
      http,
      "/bookmark/link/delete",
      "POST",
      {
        ...action.payload.data,
      },
      { Authorization: `bearer ${token}` }
    )
    if (response.status === 401) {
      yield put(
        refreshRequested({ action: deleteLinkRequested, data: action.payload })
      )
    } else {
      if (response.status > 200) throw new Error("Something went wrong")
      const result = yield response.json()
      yield put(deleteLinkSucceeded({ ...result }))

      yield put(setMessage({ message: "Bookmark deleted" }))
    }
  } catch (e) {
    yield put(setError({ error: e.message }))
  } finally {
    yield put(endLoadingBookmarkAction())
  }
}

export function* changeFolderRequestedSaga(
  action: ChangeFolderRequestedAction
) {
  try {
    yield put(startLoadingBookmarkAction())
    const token = yield select(getAccessToken)
    const response = yield call(
      http,
      "/bookmark/folder/change",
      "POST",
      {
        ...action.payload.data,
      },
      { Authorization: `bearer ${token}` }
    )
    if (response.status === 401) {
      yield put(
        refreshRequested({
          action: changeFolderRequested,
          data: action.payload,
        })
      )
    } else {
      if (response.status > 200) throw new Error("Something went wrong")
      const result = yield response.json()
      yield put(changeFolderSucceeded({ ...result }))
      yield put(setMessage({ message: "Profile changed" }))
    }
  } catch (e) {
    yield put(setError({ error: e.message }))
  } finally {
    yield put(endLoadingBookmarkAction())
  }
}

export function* deleteFolderRequestedSaga(
  action: DeleteFolderRequestedAction
) {
  try {
    yield put(startLoadingBookmarkAction())
    const token = yield select(getAccessToken)
    const response = yield call(
      http,
      "/bookmark/folder/delete",
      "POST",
      {
        ...action.payload.data,
      },
      { Authorization: `bearer ${token}` }
    )
    if (response.status === 401) {
      yield put(
        refreshRequested({
          action: deleteFolderRequested,
          data: action.payload,
        })
      )
    } else {
      if (response.status > 200) throw new Error("Something went wrong")
      const result = yield response.json()
      yield put(deleteFolderSucceeded({ ...result }))

      yield put(setMessage({ message: "Profile deleted" }))
    }
  } catch (e) {
    yield put(setError({ error: e.message }))
  } finally {
    yield put(endLoadingBookmarkAction())
  }
}

export function* addFolderRequestedSaga(action: AddLinkRequestedAction) {
  try {
    yield put(startLoadingBookmarkAction())
    const token = yield select(getAccessToken)
    const response = yield call(
      http,
      "/bookmark/folder/add",
      "POST",
      {
        ...action.payload.data,
      },
      { Authorization: `bearer ${token}` }
    )
    if (response.status === 401) {
      yield put(
        refreshRequested({ action: addFolderRequested, data: action.payload })
      )
    } else {
      if (response.status > 200) throw new Error("Something went wrong")
      const result = yield response.json()
      yield put(addFolderSucceeded({ ...result }))
      yield put(setMessage({ message: "Profile created" }))
    }
  } catch (e) {
    yield put(setError({ error: e.message }))
  } finally {
    yield put(endLoadingBookmarkAction())
  }
}

export function* addLinkToFolderRequestedSaga(
  action: AddLinkToFolderRequestedAction
) {
  try {
    yield put(startLoadingBookmarkAction())
    const token = yield select(getAccessToken)
    const response = yield call(
      http,
      "/bookmark/link/add-to-folder",
      "POST",
      {
        ...action.payload.data,
      },
      { Authorization: `bearer ${token}` }
    )
    if (response.status === 401) {
      yield put(
        refreshRequested({
          action: addLinkToFolderRequested,
          data: action.payload,
        })
      )
    } else {
      if (response.status > 200) throw new Error("Something went wrong")
      const result = yield response.json()
      yield put(addLinkToFolderSucceeded({ ...result }))
      yield put(setMessage({ message: "Bookmark added to folder" }))
    }
  } catch (e) {
    yield put(setError({ error: e.message }))
  } finally {
    yield put(endLoadingBookmarkAction())
  }
}

export function* removeLinkFromFolderRequestedSaga(
  action: RemoveLinkFromFolderRequestedAction
) {
  try {
    yield put(startLoadingBookmarkAction())
    const token = yield select(getAccessToken)
    const response = yield call(
      http,
      "/bookmark/link/remove-from-folder",
      "POST",
      {
        ...action.payload.data,
      },
      { Authorization: `bearer ${token}` }
    )
    if (response.status === 401) {
      yield put(
        refreshRequested({
          action: removeLinkFromFolderRequested,
          data: action.payload,
        })
      )
    } else {
      if (response.status > 200) throw new Error("Something went wrong")
      const result = yield response.json()
      yield put(removeLinkFromFolderSucceeded({ ...result }))
      yield put(setMessage({ message: "Bookmark removed from folder" }))
    }
  } catch (e) {
    yield put(setError({ error: e.message }))
  } finally {
    yield put(endLoadingBookmarkAction())
  }
}

export function* getAllRequestedSaga(action: GetAllRequestedAction) {
  try {
    yield put(startLoadingBookmarkAction())
    const token = yield select(getAccessToken)
    const response = yield call(
      http,
      "/bookmark/all",
      "POST",
      {
        ...action.payload.data,
      },
      { Authorization: `bearer ${token}` }
    )
    if (response.status === 401) {
      yield put(
        refreshRequested({ action: getAllRequested, data: action.payload })
      )
    } else {
      if (response.status > 200) throw new Error("Something went wrong")
      const result = yield response.json()
      yield put(getAllSucceeded({ ...result }))
    }
  } catch (e) {
    yield put(setError({ error: e.message }))
  } finally {
    yield put(endLoadingBookmarkAction())
  }
}

export function* changeLinksDirectionSaga(
  action: ChangeLinksDirectionRequestedAction
) {
  try {
    yield put(startLoadingBookmarkAction())
    const token = yield select(getAccessToken)
    const links = yield call(changeLinksPosition, {
      ...action.payload.forChange,
    })
    // yield put(changeLinksDirectionSucceeded({ target: links, success: true }))
    const response = yield call(
      http,
      "/bookmark/link/sequence",
      "POST",
      {
        links,
        userId: action.payload.userId,
      },
      { Authorization: `bearer ${token}` }
    )
    if (response.status === 401) {
      yield put(
        refreshRequested({
          action: changeLinksDirectionRequested,
          data: action.payload,
        })
      )
    } else {
      if (response.status > 200) throw new Error("Something went wrong")
      const result = yield response.json()
      yield put(changeLinksDirectionSucceeded({ ...result }))
    }
  } catch (e) {
    yield put(setError({ error: e.message }))
  } finally {
    yield put(endLoadingBookmarkAction())
  }
}

export default function* () {
  yield takeEvery(BOOKMARK_ADD_LINK_REQUESTED, addLinkRequestedSaga)
  yield takeEvery(BOOKMARK_CHANGE_LINK_REQUESTED, changeLinkRequestedSaga)
  yield takeEvery(BOOKMARK_DELETE_LINK_REQUESTED, deleteLinkRequestedSaga)
  yield takeEvery(BOOKMARK_ADD_FOLDER_REQUESTED, addFolderRequestedSaga)
  yield takeEvery(BOOKMARK_CHANGE_FOLDER_REQUESTED, changeFolderRequestedSaga)
  yield takeEvery(BOOKMARK_DELETE_FOLDER_REQUESTED, deleteFolderRequestedSaga)
  yield takeEvery(
    BOOKMARK_ADD_LINK_TO_FOLDER_REQUESTED,
    addLinkToFolderRequestedSaga
  )
  yield takeEvery(
    BOOKMARK_REMOVE_LINK_FROM_FOLDER_REQUESTED,
    removeLinkFromFolderRequestedSaga
  )
  yield takeEvery(BOOKMARK_GET_ALL_REQUESTED, getAllRequestedSaga)
  yield takeEvery(
    BOOKMARK_CHANGE_LINKS_DIRECTION_REQUESTED,
    changeLinksDirectionSaga
  )
}
