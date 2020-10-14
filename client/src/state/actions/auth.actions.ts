import {
  AUTH_END_LOADING,
  AUTH_GET_USER_INFO_REQUESTED,
  AUTH_GET_USER_INFO_SUCCEEDED,
  AUTH_LOGOUT_REQUESTED,
  AUTH_LOGOUT_SUCCEEDED,
  AUTH_REFRESH_REQUESTED,
  AUTH_REFRESH_SUCCEEDED,
  AUTH_SIGN_IN_REQUESTED,
  AUTH_SIGN_IN_SUCCEEDED,
  AUTH_START_LOADING,
  AuthActionTypes,
  GetUserInfoRequestedPayload,
  GetUserInfoSucceededPayload,
  RefreshSucceededPayload,
  SignInRequestedPayload,
  SignInSucceededPayload,
} from "../types/auth.types"

export const signInRequested = (payload: SignInRequestedPayload) => ({
  type: AUTH_SIGN_IN_REQUESTED,
  payload,
})

export const signInSucceeded = (payload: SignInSucceededPayload) => ({
  type: AUTH_SIGN_IN_SUCCEEDED,
  payload,
})

export const logoutRequested = () => ({
  type: AUTH_LOGOUT_REQUESTED,
})

export const logoutSucceeded = () => ({
  type: AUTH_LOGOUT_SUCCEEDED,
})

export const refreshRequested = () => ({
  type: AUTH_REFRESH_REQUESTED,
})

export const refreshSucceeded = (payload: RefreshSucceededPayload) => ({
  type: AUTH_REFRESH_SUCCEEDED,
  payload,
})

export const getUserInfoRequested = (payload: GetUserInfoRequestedPayload) => ({
  type: AUTH_GET_USER_INFO_REQUESTED,
  payload,
})

export const getUserInfoSucceded = (payload: GetUserInfoSucceededPayload) => ({
  type: AUTH_GET_USER_INFO_SUCCEEDED,
  payload,
})

export const startLoadingAction = (): AuthActionTypes => ({
  type: AUTH_START_LOADING,
})
export const endLoadingAction = (): AuthActionTypes => ({
  type: AUTH_END_LOADING,
})
