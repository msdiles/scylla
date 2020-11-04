import React from "react"
import "./main.scss"
import { Button } from "semantic-ui-react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/state/reducers"
import { logoutRequested } from "@/state/actions/auth.actions"

const Main = () => {
  const history = useHistory()
  const isLogged = useSelector((state: RootState) => state.auth.isLogged)
  const dispatch = useDispatch()
  return (
    <div className="main">
      {isLogged ? (
        <>
          <Button
            className="main-button"
            primary
            onClick={() => history.push("/home")}
          >
            START
          </Button>
          <Button
            className="main-button"
            primary
            onClick={() => dispatch(logoutRequested())}
          >
            LOGOUT
          </Button>
        </>
      ) : (
        <>
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
            onClick={() => history.push("/signup")}
          >
            SIGNUP
          </Button>
        </>
      )}
    </div>
  )
}

export default Main
