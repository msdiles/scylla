import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Color } from "@/types/types"
import {
  addLinkToFolderRequested,
  changeLinkRequested,
  deleteLinkRequested,
  removeLinkFromFolderRequested,
} from "@/state/actions/bookmark.actions"
import { ILink } from "@/types/interfaces"
import { RootState } from "@/state/reducers"

interface IState {
  name: string
  url: string
  folders: string[] | []
}

const useLink = (link: ILink) => {
  const [expand, setExpand] = useState(false)
  const [isDeleteMessageOpen, setIsDeleteMessageOpen] = useState(false)
  const folders = useSelector((state: RootState) => state.bookmark.folders)
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

  const changeFolders = (newFolders: string[], link: ILink) => {
    console.log(newFolders, link.folders)
    newFolders.forEach((folder) => {
      if (!link.folders.includes(folder)) {
        dispatch(addLinkToFolderRequested({ data: { folder, link: link._id } }))
      }
    })
    link.folders.forEach((folder) => {
      if (!newFolders.includes(folder)) {
        dispatch(
          removeLinkFromFolderRequested({ data: { folder, link: link._id } })
        )
      }
    })
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
    changeFolders,
    toggleFavorite,
    OnMouseLeave,
    expand,
    setExpand,
    isDeleteMessageOpen,
    setIsDeleteMessageOpen,
  }
}

export default useLink
