import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFolderRequested } from "@/state/actions/bookmark.actions"
import { getRandomColor } from "@/utils/colors"
import { RootState } from "@/state/reducers"
import { IFolder, ILink } from "@/types/interfaces"
import sorter from "@/utils/sorter"

const useFolderList = (foldersSequence: string[]) => {
  const [items, setItems] = useState<IFolder[] | []>([])
  const dispatch = useDispatch()
  const { userId } = useSelector((state: RootState) => state.auth)
  const { folders, loading, folderSort } = useSelector(
    (state: RootState) => state.bookmark
  )

  useEffect(() => {
    const sort = async () => {
      await setItems([
        ...sorter(
          [...folders],
          folderSort.sortBy,
          folderSort.sortDirection,
          foldersSequence
        ),
      ])
    }
    sort()
  }, [folders, folderSort, foldersSequence, loading])

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
  return { addFolder, items, loading }
}

export default useFolderList
