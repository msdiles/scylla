import { all, fork } from "redux-saga/effects"
import appSagas from "./app.sagas"
import authSagas from "./auth.sagas"
import bookmarkSagas from "./bookmark.sagas"

export default function* () {
  yield all([fork(appSagas), fork(authSagas), fork(bookmarkSagas)])
}
