export const APP_SET_ERROR = "APP_SET_ERROR"
export const APP_REMOVE_ERROR = "APP_REMOVE_ERROR"

export const APP_SET_MESSAGE = "APP_SET_MESSAGE"
export const APP_REMOVE_MESSAGE = "APP_REMOVE_MESSAGE"

export const APP_REDIRECT = "APP_REDIRECT"

//SetError
export interface SetErrorPayload {
  error: string
}

interface SetErrorAction {
  type: typeof APP_SET_ERROR
  payload: SetErrorPayload
}

//RemoveError
export interface RemoveErrorPayload {
  error: string
}

interface RemoveErrorAction {
  type: typeof APP_REMOVE_ERROR
  payload: RemoveErrorPayload
}

//SetMessage
export interface SetMessagePayload {
  message: string
}

interface SetMessageAction {
  type: typeof APP_SET_MESSAGE
  payload: SetMessagePayload
}

//RemoveMessage
export interface RemoveMessagePayload {
  error: string
}

interface RemoveMessageAction {
  type: typeof APP_REMOVE_MESSAGE
  payload: RemoveMessagePayload
}

//Redirect
export interface RedirectPayload {
  path: string
}

export interface RedirectAction {
  type: typeof APP_REDIRECT
  payload: RedirectPayload
}

export type AppActionTypes =
  | SetErrorAction
  | RemoveErrorAction
  | SetMessageAction
  | RemoveMessageAction
  | RedirectAction
