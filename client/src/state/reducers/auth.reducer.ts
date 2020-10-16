import {
  AUTH_END_LOADING,
  AUTH_GET_USER_INFO_SUCCEEDED,
  AUTH_LOGOUT_SUCCEEDED,
  AUTH_REFRESH_REQUESTED,
  AUTH_REFRESH_SUCCEEDED,
  AUTH_SIGN_IN_SUCCEEDED,
  AUTH_START_LOADING,
  AuthActionTypes,
} from "../types/auth.types"

interface AuthState {
  userName: string
  userId: string
  userToken: string
  userRole: [string] | []
  isLogged: boolean
  loading: boolean
  started: boolean
}

const initialState: AuthState = {
  userName: "",
  userId: "",
  userToken: "",
  userRole: [],
  isLogged: false,
  loading: false,
  started: false,
}
const authReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case AUTH_SIGN_IN_SUCCEEDED:
      return {
        ...state,
        userName: action.payload.user.name,
        userId: action.payload.user.id,
        userToken: action.payload.accessToken,
        userRole: action.payload.user.role,
        isLogged: true,
      }
    case AUTH_LOGOUT_SUCCEEDED:
      return {
        ...state,
        userName: "",
        userId: "",
        userToken: "",
        userRole: [],
        isLogged: false,
      }
    case AUTH_GET_USER_INFO_SUCCEEDED:
      return {
        ...state,
        userName: action.payload.user.name,
        userId: action.payload.user.id,
        userRole: action.payload.user.role,
        isLogged: true,
      }
    case AUTH_REFRESH_SUCCEEDED:
      return {
        ...state,
        userName: action.payload.user.name,
        userId: action.payload.user.id,
        userToken: action.payload.accessToken,
        userRole: action.payload.user.role,
        isLogged: true,
      }
    case AUTH_START_LOADING:
      return { ...state, loading: true, started: true }
    case AUTH_END_LOADING:
      return { ...state, loading: false }
    default:
      return { ...state }
  }
}

export default authReducer
