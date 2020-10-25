import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ILink } from "@/types/interfaces"
import { RootState } from "@/state/reducers"
import sorter from "@/utils/sorter"
import { addLinkRequested } from "@/state/actions/bookmark.actions"
import { getRandomColor } from "@/utils/colors"

interface IAddLink {
  name: string
  url: string
  folders: string[] | []
}

const useLinkList = (linksSequence: string[]) => {
  const [items, setItems] = useState<ILink[] | []>([])
  const dispatch = useDispatch()
  const userId = useSelector((state: RootState) => state.auth.userId)
  const { links, folders, loading, linkSort } = useSelector(
    (state: RootState) => state.bookmark
  )
  useEffect(() => {
    setItems([
      ...sorter(
        [...links],
        linkSort.sortBy,
        linkSort.sortDirection,
        linksSequence
      ),
    ])
  }, [links, linkSort, linksSequence, loading])

  const addLink = (data: IAddLink) => {
    dispatch(
      addLinkRequested({
        data: {
          userId,
          url: data.url,
          date: Date.now().toString(),
          name: data.name,
          folders: data.folders,
          color: getRandomColor(),
          favorite: false,
        },
      })
    )
  }
  return { addLink, items, folders, loading }
}

export default useLinkList
