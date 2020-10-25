import React, { useEffect, useState } from "react"
import { Input } from "semantic-ui-react"
import "./home.scss"
import LinkList from "@/components/LinkList"
import { useDispatch, useSelector } from "react-redux"
import {
  changeLinksDirectionRequested,
  changeLinksDirectionSucceeded,
  changeLinkSucceeded,
  getAllRequested,
  sortLinks,
} from "@/state/actions/bookmark.actions"
import { RootState } from "@/state/reducers"
import FolderLsit from "@/components/FolderList"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import changeLinksPosition from "@/utils/changeLinksPosition"

const Home = () => {
  const [linksSequence, setLinksSequence] = useState<string[]>([])
  const dispatch = useDispatch()
  const userId = useSelector((state: RootState) => state.auth.userId)
  const links = useSelector(
    (state: RootState) => state.bookmark.bookmarks.links
  )
  const sortDirection = useSelector(
    (state: RootState) => state.bookmark.linkSort.sortDirection
  )
  useEffect(() => {
    dispatch(getAllRequested({ data: { userId } }))
  }, [])

  useEffect(() => {
    setLinksSequence(links)
  }, [links])

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
      <div className="home">
        <Input
          icon={{ name: "search", circular: true, link: true }}
          placeholder="Search..."
          fluid
          className="home__search"
        />

        <LinkList linksSequence={linksSequence} />

        <div className="home-divider"></div>
        <FolderLsit />
      </div>
    </DragDropContext>
  )
}

export default Home
