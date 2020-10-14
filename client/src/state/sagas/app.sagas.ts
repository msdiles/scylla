import { takeEvery, call } from "redux-saga/effects"
import { APP_REDIRECT, RedirectAction } from "../types/app.types"
import { push } from "@/utils/history"

export function* redirectSaga(action: RedirectAction) {
  yield call(push, action.payload.path)
}

export default function* appSagas() {
  yield takeEvery(APP_REDIRECT, redirectSaga)
}
