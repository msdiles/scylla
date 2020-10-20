import { combineReducers } from "redux"
import authReducer from "./auth.reducer"
import appReducer from "./app.reducer"
import { connectRouter } from "connected-react-router"
import bookmarkReducer from "@/state/reducers/bookmark.reducer"
const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  bookmark: bookmarkReducer,
})

export const createRouterReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    app: appReducer,
    bookmark: bookmarkReducer,
  })

export type RootState = ReturnType<typeof rootReducer>
