import React, { useEffect, useRef, useState } from "react"
import { Input } from "semantic-ui-react"
import "./home.scss"
import LinkList from "@/components/LinkList"
import { useDispatch, useSelector } from "react-redux"
import {
  changeLinksDirectionRequested,
  getAllRequested,
  sortLinks,
} from "@/state/actions/bookmark.actions"
import { RootState } from "@/state/reducers"
import FolderLsit from "@/components/FolderList"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import changeLinksPosition from "@/utils/changeLinksPosition"
import Divider from "@/components/Divider"
import Search from "@/components/Search"

const Home = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [linksSequence, setLinksSequence] = useState<string[]>([])
  const [foldersSequence, setFoldersSequence] = useState<string[]>([])
  const [dividerPosition, setDividerPosition] = useState(
    ref.current ? (ref.current.clientWidth - 2) / 2 : 0
  )
  const dispatch = useDispatch()
  const userId = useSelector((state: RootState) => state.auth.userId)
  const { links, folders } = useSelector(
    (state: RootState) => state.bookmark.bookmarks
  )
  const sortDirection = useSelector(
    (state: RootState) => state.bookmark.linkSort.sortDirection
  )
  useEffect(() => {
    dispatch(getAllRequested({ data: { userId } }))
  }, [])

  useEffect(() => {
    setDividerPosition(ref.current ? (ref.current.clientWidth - 2) / 2 : 0)
  }, [ref])

  useEffect(() => {
    setLinksSequence(links)
  }, [links])
  useEffect(() => {
    setFoldersSequence(folders)
  }, [folders])

  const onDragEnd = async (dropResult: DropResult) => {
    if (
      typeof dropResult.destination?.index === "number" &&
      dropResult.destination?.index !== dropResult.source.index
    ) {
      await setLinksSequence(
        changeLinksPosition({
          links: linksSequence,
          source: dropResult.source.index,
          destination: dropResult.destination?.index,
        })
      )
      dispatch(sortLinks({ sortBy: "setting", sortDirection: sortDirection }))
      dispatch(
        changeLinksDirectionRequested({
          userId,
          forChange: {
            links,
            source: dropResult.source.index,
            destination: dropResult.destination?.index,
          },
        })
      )
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="home" ref={ref}>
        <Search />

        <LinkList linksSequence={linksSequence} width={dividerPosition} />

        <Divider setDividerPosition={setDividerPosition} />
        <FolderLsit
          foldersSequence={foldersSequence}
          width={ref.current ? ref.current.clientWidth - dividerPosition : 0}
        />
      </div>
    </DragDropContext>
  )
}

export default Home
