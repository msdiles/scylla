import React from "react"
import { Message } from "semantic-ui-react"
import "./snackbar.scss"
import { Snackbar } from "@/components/SnackbarHandler"

const Snackbar = ({ message, remove, id, ...props }: Snackbar) => {
  return (
    <Message
      className="snackbar"
      onClick={() => {
        remove(id)
      }}
      success={!props.isError}
      negative={props.isError}
    >
      <Message.Content className="snackbar__content">{message}</Message.Content>
    </Message>
  )
}

export default Snackbar
