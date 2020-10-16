import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/state/reducers"
import Snackbar from "@/components/Snackbar"
import { removeError, removeMessage } from "@/state/actions/app.actions"
import CSSTransition from "react-transition-group/CSSTransition"
import TransitionGroup from "react-transition-group/TransitionGroup"
import "./snackbarHandler.scss"

export interface Snackbar {
  message: string
  id: number
  isError: boolean
  remove: (id: number) => void
}

const SnackbarHandler = () => {
  const [snackbars, setSnackBars] = useState<Snackbar[] | []>([])
  const dispatch = useDispatch()
  const message = useSelector((state: RootState) => state.app.message)
  const error = useSelector((state: RootState) => state.app.error)

  useEffect(() => {
    if (message !== "") {
      const newSnackbar: Snackbar = {
        message: message,
        id: Date.now(),
        isError: false,
        remove: function (id) {
          setSnackBars((prev) =>
            (prev as any).filter((s: Snackbar) => s.id !== id)
          )
        },
      }
      setSnackBars([...snackbars, newSnackbar])
      setTimeout(() => {
        setSnackBars((prev) =>
          (prev as any).filter((s: Snackbar) => s.id !== newSnackbar.id)
        )
      }, 5000)
      dispatch(removeMessage())
    }
  }, [message])

  useEffect(() => {
    if (error !== "") {
      const newSnackbar: Snackbar = {
        message: error,
        id: Date.now(),
        isError: true,
        remove: function (id) {
          setSnackBars((prev) =>
            (prev as any).filter((s: Snackbar) => s.id !== id)
          )
        },
      }
      setSnackBars([...snackbars, newSnackbar])
      setTimeout(() => {
        setSnackBars((prev) =>
          (prev as any).filter((s: Snackbar) => s.id !== newSnackbar.id)
        )
      }, 5000)
      dispatch(removeError())
    }
  }, [error])

  return (
    <TransitionGroup className="snackbar-handler">
      {(snackbars as any).map((s: Snackbar) => (
        <CSSTransition key={s.id} classNames="snackbar" timeout={1000}>
          <Snackbar {...s} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}

export default SnackbarHandler
