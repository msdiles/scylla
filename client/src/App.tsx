import React from "react"
import { Switch } from "react-router-dom"
import Routes from "./components/Routes"
import "./app.scss"
import history from "@/utils/history"
import { ConnectedRouter } from "connected-react-router"

const App: React.FC = () => {
  return (
    <div className="app">
      <ConnectedRouter history={history}>
        <Switch>
          <Routes />
        </Switch>
      </ConnectedRouter>
    </div>
  )
}

export default App
