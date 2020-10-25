import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Color } from "@/types/types"
import {
  changeLinkRequested,
  deleteLinkRequested,
} from "@/state/actions/bookmark.actions"
import { ILink } from "@/types/interfaces"

interface IState {
  name: string
  url: string
  folders: string[] | []
}

const useLink = (link: ILink) => {
  const [expand, setExpand] = useState(false)
  const [isDeleteMessageOpen, setIsDeleteMessageOpen] = useState(false)
  const dispatch = useDispatch()

  const openUrl = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (e.target === e.currentTarget) {
      window.open(link.url, "_blank")
    }
  }

  const changeColor = (newColor: Color) => {
    dispatch(
      changeLinkRequested({
        data: {
          target: {
            ...link,
            color: newColor,
          },
        },
      })
    )
  }

  const changeLink = (form: IState) => {
    dispatch(
      changeLinkRequested({
        data: {
          target: {
            ...link,
            url: form.url,
            name: form.name,
            folders: form.folders,
          },
        },
      })
    )
  }

  const deleteLink = () => {
    dispatch(
      deleteLinkRequested({
        data: {
          target: {
            ...link,
          },
        },
      })
    )
  }

  const toggleFavorite = () => {
    dispatch(
      changeLinkRequested({
        data: {
          target: {
            ...link,
            favorite: !link.favorite,
          },
        },
      })
    )
  }

  const OnMouseLeave = () => {
    setExpand(false)
    setIsDeleteMessageOpen(false)
  }

  return {
    openUrl,
    changeColor,
    changeLink,
    deleteLink,
    toggleFavorite,
    OnMouseLeave,
    expand,
    setExpand,
    isDeleteMessageOpen,
    setIsDeleteMessageOpen,
  }
}

export default useLink
