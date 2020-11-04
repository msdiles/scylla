import React from "react"
import "./error.scss"
import { Button } from "semantic-ui-react"
import { useHistory } from "react-router-dom"

const Error = () => {
  const history = useHistory()
  return (
    <div className="error-page">
      <p className="error-page__title">404</p>
      <p className="error-page__text">Page not found</p>
      <Button primary onClick={() => history.push("/")}>
        Go To Home
      </Button>
    </div>
  )
}

export default Error
