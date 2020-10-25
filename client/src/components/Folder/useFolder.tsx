import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IFolder } from "@/types/interfaces"
import formatFoldersLinks from "@/utils/formatFoldersLinks"
import { RootState } from "@/state/reducers"

const useFolder = (folder: IFolder) => {
  const [expand, setExpand] = useState(false)
  const [isDeleteMessageOpen, setIsDeleteMessageOpen] = useState(false)
  const { links: linksFromState, loading } = useSelector(
    (state: RootState) => state.bookmark
  )
  const [links, setLinks] = useState(
    formatFoldersLinks(folder.links, linksFromState)
  )

  const dispatch = useDispatch()

  const OnMouseLeave = () => {
    setExpand(false)
    setIsDeleteMessageOpen(false)
  }

  const toggleFavorite = () => {}

  const changeFolder = () => {}

  const deleteFolder = () => {}

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
