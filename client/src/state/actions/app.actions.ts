import {
  APP_REDIRECT,
  APP_REMOVE_ERROR,
  APP_REMOVE_MESSAGE,
  APP_SET_ERROR,
  APP_SET_MESSAGE,
  RedirectPayload,
  SetErrorPayload,
  SetMessagePayload,
} from "../types/app.types"

export const setError = (payload: SetErrorPayload) => ({
  type: APP_SET_ERROR,
  payload,
})

export const removeError = () => ({
  type: APP_REMOVE_ERROR,
})

export const setMessage = (payload: SetMessagePayload) => ({
  type: APP_SET_MESSAGE,
  payload,
})

export const removeMessage = () => ({
  type: APP_REMOVE_MESSAGE,
})

export const redirect = (payload: RedirectPayload) => ({
  type: APP_REDIRECT,
  payload,
})
