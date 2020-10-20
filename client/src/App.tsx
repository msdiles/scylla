import React, { useEffect } from "react"
import { Switch } from "react-router-dom"
import Router from "./components/Routes"
import "./app.scss"
import history from "@/utils/history"
import { ConnectedRouter } from "connected-react-router"
import SnackbarHandler from "@/components/SnackbarHandler"
import { useDispatch } from "react-redux"
import { refreshRequested } from "@/state/actions/auth.actions"
import AppContextProvide from "@/components/AppContext"

const App: React.FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    console.log("FETCHED")
    dispatch(refreshRequested())
  }, [])
  return (
    <div className="app">
      <AppContextProvide>
        <ConnectedRouter history={history}>
          <Router />
          <SnackbarHandler />
        </ConnectedRouter>
      </AppContextProvide>
    </div>
  )
}

export default App
