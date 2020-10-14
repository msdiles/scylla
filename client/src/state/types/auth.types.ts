export const AUTH_SIGN_IN_REQUESTED = "AUTH_SIGN_IN_REQUESTED"
export const AUTH_SIGN_IN_SUCCEEDED = "AUTH_SIGN_IN_SUCCEEDED"

export const AUTH_LOGOUT_REQUESTED = "AUTH_LOGOUT_REQUESTED"
export const AUTH_LOGOUT_SUCCEEDED = "AUTH_LOGOUT_SUCCEEDED"

export const AUTH_REFRESH_REQUESTED = "AUTH_REFRESH_REQUESTED"
export const AUTH_REFRESH_SUCCEEDED = "AUTH_REFRESH_SUCCEEDED"

export const AUTH_GET_USER_INFO_REQUESTED = "AUTH_GET_USER_INFO_REQUESTED"
export const AUTH_GET_USER_INFO_SUCCEEDED = "AUTH_GET_USER_INFO_SUCCEEDED"

export const AUTH_START_LOADING = "AUTH_START_LOADING"
export const AUTH_END_LOADING = "AUTH_END_LOADING"

//SignIn
export interface SignInRequestedPayload {
  data: {
    password: string
    email: string
  }
}

export interface SignInRequestedAction {
  type: typeof AUTH_SIGN_IN_REQUESTED
  payload: SignInRequestedPayload
}

export interface SignInSucceededPayload {
  user: {
    id: string
    name: string
    role: [string]
  }
  accessToken: string
  refreshToken: string
}

interface SignInSucceededAction {
  type: typeof AUTH_SIGN_IN_SUCCEEDED
  payload: SignInSucceededPayload
}

// Logout

export interface LogoutRequestedAction {
  type: typeof AUTH_LOGOUT_REQUESTED
}

interface LogoutSucceededAction {
  type: typeof AUTH_LOGOUT_SUCCEEDED
}

//

//Refresh

export interface RefreshRequestedAction {
  type: typeof AUTH_REFRESH_REQUESTED
}

export interface RefreshSucceededPayload {
  user: {
    id: string
    name: string
    role: [string]
  }
  accessToken: string
}

interface RefreshSucceededAction {
  type: typeof AUTH_REFRESH_SUCCEEDED
  payload: RefreshSucceededPayload
}

//

//GetUserInfo
export interface GetUserInfoRequestedPayload {
  token: string
}

export interface GetUserInfoRequestedAction {
  type: typeof AUTH_GET_USER_INFO_REQUESTED
  payload: GetUserInfoRequestedPayload
}

export interface GetUserInfoSucceededPayload {
  user: {
    id: string
    name: string
    role: [string]
  }
}

interface GetUserInfoSucceededAction {
  type: typeof AUTH_GET_USER_INFO_SUCCEEDED
  payload: GetUserInfoSucceededPayload
}

//

//StartLoading
interface StartLoadingAction {
  type: typeof AUTH_START_LOADING
}

//

//EndLoading
interface EndLoadingAction {
  type: typeof AUTH_END_LOADING
}
//

export type AuthActionTypes =
  | SignInRequestedAction
  | SignInSucceededAction
  | LogoutRequestedAction
  | LogoutSucceededAction
  | RefreshRequestedAction
  | RefreshSucceededAction
  | GetUserInfoRequestedAction
  | GetUserInfoSucceededAction
  | StartLoadingAction
  | EndLoadingAction
