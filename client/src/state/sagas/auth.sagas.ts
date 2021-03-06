import { takeEvery, put, call } from "redux-saga/effects"
import {
  AUTH_GET_USER_INFO_REQUESTED,
  AUTH_LOGOUT_REQUESTED,
  AUTH_REFRESH_REQUESTED,
  AUTH_SIGN_IN_REQUESTED,
  RefreshRequestedAction,
  SignInRequestedAction,
} from "../types/auth.types"
import http from "@/http/http"
import {
  endLoadingAction,
  getUserInfoSucceded,
  logoutSucceeded,
  refreshRequested,
  refreshSucceeded,
  signInSucceeded,
  startLoadingAction,
} from "../actions/auth.actions"
import { redirect, setError, setMessage } from "../actions/app.actions"
import getFingerprint from "../../utils/getFingerprint"
import Storage from "../../utils/Storage"
import { clearBookmarks } from "@/state/actions/bookmark.actions"

export function* signInRequestedSaga(action: SignInRequestedAction) {
  try {
    yield put(startLoadingAction())
    const fingerprint = yield call(getFingerprint)
    if (fingerprint) {
      const response = yield call(http, "/auth/signin", "POST", {
        ...action.payload.data,
        fingerprint,
      })
      if (response.status === 401) throw new Error("Invalid password or email")
      if (response.status === 422) throw new Error("Invalid format")
      const result = yield response.json()
      yield put(signInSucceeded({ ...result }))
      yield call(Storage.setInStorage, "session", result.refreshToken)
      yield put(redirect({ path: "/home" }))
      yield put(setMessage({ message: result.message }))
    } else {
      throw new Error("Something went wrong")
    }
  } catch (e) {
    yield put(setError({ error: e.message }))
  } finally {
    yield put(endLoadingAction())
  }
}

export function* logoutRequestedSaga() {
  try {
    yield put(startLoadingAction())
    const token = yield call(Storage.takeFromStorage, "session")
    if (token) {
      const response = yield call(http, "/auth/logout", "POST", {
        token,
      })
      const result = yield response.json()
      yield call(Storage.removeFromStorage, "session")
      yield put(setMessage({ message: result.message }))
    }
    yield put(logoutSucceeded())
    yield put(clearBookmarks())
    yield put(redirect({ path: "/" }))
  } catch (e) {
    yield put(setError({ error: e.message }))
  } finally {
    yield put(endLoadingAction())
  }
}

export function* refreshRequestedSaga(action: RefreshRequestedAction) {
  try {
    yield put(startLoadingAction())
    const token = yield call(Storage.takeFromStorage, "session")
    const fingerprint = yield call(getFingerprint)
    if (token && fingerprint) {
      const response = yield call(http, "/auth/refresh", "POST", {
        token,
        fingerprint,
      })
      const result = yield response.json()
      if (response.status > 200) {
        yield call(Storage.removeFromStorage, "session")
        yield put(setMessage({ message: "Your session expired" }))
        yield put(logoutSucceeded())
        yield put(clearBookmarks())
        yield put(redirect({ path: "/login" }))
      } else {
        yield put(
          refreshSucceeded({
            user: result.user,
            accessToken: result.accessToken,
          })
        )
        yield call(Storage.setInStorage, "session", result.refreshToken)
        if (action.payload) {
          yield put(action.payload.action(action.payload.data))
        }
      }
    } else {
      yield put(logoutSucceeded())
      yield put(clearBookmarks())
    }
  } catch (e) {
    yield put(setError({ error: e.message }))
  } finally {
    yield put(endLoadingAction())
  }
}

export function* getUserInfoRequestedSaga() {
  try {
    yield put(startLoadingAction())
    const token = yield call(Storage.takeFromStorage, "session")
    if (token) {
      const response = yield call(http, "/auth/refresh", "GET", "", {
        Authorization: `bearer ${token}`,
      })
      const result = yield response.json()
      if (response.status === 401) {
        yield call(refreshRequested)
      } else {
        yield put(getUserInfoSucceded(result.user))
      }
    } else {
      yield put(logoutSucceeded())
      yield put(clearBookmarks())
      yield put(redirect({ path: "/" }))
    }
  } catch (e) {
    yield put(setError({ error: e.message }))
  } finally {
    yield put(endLoadingAction())
  }
}

export default function* authSagas() {
  yield takeEvery(AUTH_SIGN_IN_REQUESTED, signInRequestedSaga)
  yield takeEvery(AUTH_LOGOUT_REQUESTED, logoutRequestedSaga)
  yield takeEvery(AUTH_REFRESH_REQUESTED, refreshRequestedSaga)
  yield takeEvery(AUTH_GET_USER_INFO_REQUESTED, getUserInfoRequestedSaga)
}
