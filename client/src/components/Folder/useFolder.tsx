import React, { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IFolder } from "@/types/interfaces"
import formatFoldersLinks from "@/utils/formatFoldersLinks"
import { RootState } from "@/state/reducers"
import {
  changeFolderRequested,
  deleteFolderRequested,
} from "@/state/actions/bookmark.actions"
import { AppContext } from "@/components/AppContext"

interface IState {
  name: string
}

const useFolder = (folder: IFolder) => {
  const [expand, setExpand] = useState(false)
  const [isDeleteMessageOpen, setIsDeleteMessageOpen] = useState(false)
  const { links: linksFromState, loading } = useSelector(
    (state: RootState) => state.bookmark
  )
  const { expandFolder } = useContext(AppContext)

  useEffect(() => {
    if (expandFolder === folder._id) {
      setExpand(true)
    }
  }, [expandFolder])

  const [links, setLinks] = useState(
    formatFoldersLinks(folder.links, linksFromState)
  )

  useEffect(() => {
    setLinks(formatFoldersLinks(folder.links, linksFromState))
  }, [folder.links])

  const dispatch = useDispatch()

  const OnMouseLeave = () => {
    setExpand(false)
    setIsDeleteMessageOpen(false)
  }

  const toggleFavorite = () => {
    dispatch(
      changeFolderRequested({
        data: {
          target: {
            ...folder,
            favorite: !folder.favorite,
          },
        },
      })
    )
  }

  const changeFolder = (form: IState) => {
    dispatch(
      changeFolderRequested({
        data: {
          target: {
            ...folder,
            name: form.name,
          },
        },
      })
    )
  }

  const deleteFolder = () => {
    dispatch(deleteFolderRequested({ data: { target: { ...folder } } }))
  }

  return {
    OnMouseLeave,
    expand,
    setExpand,
    links,
    loading,
    isDeleteMessageOpen,
    setIsDeleteMessageOpen,
    toggleFavorite,
    changeFolder,
    deleteFolder,
  }
}

export default useFolder
