import React, { useEffect } from "react"
import { Input } from "semantic-ui-react"
import "./home.scss"
import LinkList from "@/components/LinkList"
import { useDispatch, useSelector } from "react-redux"
import { getAllRequested } from "@/state/actions/bookmark.actions"
import { RootState } from "@/state/reducers"
import FolderLsit from "@/components/FolderList"

const Home = () => {
  const dispatch = useDispatch()
  const userId = useSelector((state: RootState) => state.auth.userId)
  useEffect(() => {
    dispatch(getAllRequested({ data: { userId } }))
  }, [])
  return (
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
  )
}

export default Home
