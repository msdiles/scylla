import React from "react"
import "./main.scss"
import { Button } from "semantic-ui-react"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "@/state/reducers"

const Main = () => {
  const history = useHistory()
  const isLogged = useSelector((state: RootState) => state.auth.isLogged)
  return (
    <div className="main">
      <Button
        className="main-button"
        primary
        onClick={() => history.push("/login")}
      >
        LOGIN
      </Button>
      <Button
        className="main-button"
        primary
        onClick={() => history.push("/signin")}
      >
        SIGNIN
      </Button>
      {isLogged && (
        <Button
          className="main-button"
          primary
          onClick={() => history.push("/home")}
        >
          START
        </Button>
      )}
    </div>
  )
}

export default Main
