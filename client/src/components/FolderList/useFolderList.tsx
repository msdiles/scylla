import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFolderRequested } from "@/state/actions/bookmark.actions"
import { getRandomColor } from "@/utils/colors"
import { RootState } from "@/state/reducers"

const useFolderList = () => {
  const dispatch = useDispatch()
  const { userId } = useSelector((state: RootState) => state.auth)

  const addFolder = (form: { name: string }) => {
    dispatch(
      addFolderRequested({
        data: {
          name: form.name,
          favorite: false,
          color: getRandomColor(),
          links: [],
          date: Date.now().toString(),
          parent: "",
          userId,
        },
      })
    )
  }
  return { addFolder }
}

export default useFolderList
