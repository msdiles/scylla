import { combineReducers } from "redux"
import authReducer from "./auth.reducer"
import appReducer from "./app.reducer"
import { connectRouter } from "connected-react-router"
const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
})

export const createRouterReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    app: appReducer,
  })

export type RootState = ReturnType<typeof rootReducer>
