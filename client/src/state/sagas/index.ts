import { all, fork } from "redux-saga/effects"
import appSagas from "./app.sagas"
import authSagas from "./auth.sagas"

export default function* () {
  yield all([fork(appSagas), fork(authSagas)])
}
