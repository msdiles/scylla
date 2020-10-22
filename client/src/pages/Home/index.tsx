import React, { useEffect } from "react"
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
import { DragDropContext } from "react-beautiful-dnd"
import AwesomeDebouncePromise from "awesome-debounce-promise"

const Home = () => {
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
  return (
    <DragDropContext
      onDragUpdate={AwesomeDebouncePromise(() => console.log("ASD"), 500)}
      onDragEnd={(dropResult) => {
        if (
          typeof dropResult.destination?.index === "number" &&
          dropResult.destination?.index !== dropResult.source.index
        ) {
          dispatch(
            sortLinks({ sortBy: "setting", sortDirection: sortDirection })
          )
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
      }}
    >
      <div className="home">
        <Input
          icon={{ name: "search", circular: true, link: true }}
          placeholder="Search..."
          fluid
          className="home__search"
        />

        <LinkList />

        <div className="divider"></div>
        <FolderLsit />
      </div>
    </DragDropContext>
  )
}

export default Home
