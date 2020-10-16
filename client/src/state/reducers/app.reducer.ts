import {
  APP_REMOVE_ERROR,
  APP_REMOVE_MESSAGE,
  APP_SET_ERROR,
  APP_SET_MESSAGE,
  AppActionTypes,
} from "../types/app.types"

interface AppState {
  error: string
  message: string
}

const initialState: AppState = {
  error: "",
  message: "",
}

const appReducer = (state = initialState, action: AppActionTypes) => {
  switch (action.type) {
    case APP_SET_ERROR:
      return { ...state, error: action.payload.error }
    case APP_REMOVE_ERROR:
      return { ...state, error: "" }
    case APP_SET_MESSAGE:
      return { ...state, message: action.payload.message }
    case APP_REMOVE_MESSAGE:
      return { ...state, message: "" }
    default:
      return { ...state }
  }
}

export default appReducer
