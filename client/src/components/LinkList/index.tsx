import React, { useEffect, useState } from "react"
import "./linkList.scss"
import { useDispatch, useSelector } from "react-redux"
import { addLinkRequested } from "@/state/actions/bookmark.actions"
import { RootState } from "@/state/reducers"
import LinkModal from "@/components/LinkModal"
import { ILink } from "@/types/interfaces"
import Link from "@/components/Link"
import { getRandomColor } from "@/utils/colors"
import Button from "semantic-ui-react/dist/commonjs/elements/Button"
import ListFilter from "@/components/ListFilter"
import sorter from "@/utils/sorter"
import { Droppable } from "react-beautiful-dnd"

interface IAddLink {
  name: string
  url: string
  folders: string[] | []
}

const LinkList = () => {
  const [items, setItems] = useState<ILink[] | []>([])
  const dispatch = useDispatch()
  const userId = useSelector((state: RootState) => state.auth.userId)
  const { links, folders, loading, linkSort, bookmarks } = useSelector(
    (state: RootState) => state.bookmark
  )
  useEffect(() => {
    console.log("Loading", loading)
    console.log("USEEEFFECT", links, linkSort, bookmarks.links)
    setItems([
      ...sorter(
        [...links],
        linkSort.sortBy,
        linkSort.sortDirection,
        bookmarks.links
      ),
    ])
  }, [links, linkSort, bookmarks.links, loading])

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

  return (
    <div className="link-list">
      <h2>Unfiltered Bookmarks</h2>
      <ListFilter />
      <Droppable droppableId="links">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className="drag-and-drop"
            {...provided.droppableProps}
          >
            {(items as any).map((link: ILink, index: number) => (
              // <div>
              <Link link={link} key={link._id as string} index={index} />
              // </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <LinkModal
        folders={folders}
        submitFunction={addLink}
        loading={loading}
        header={"Add Bookmark"}
        buttonText={"Add"}
        trigger={
          <Button circular icon="add" className={"add-link-modal__button"} />
        }
      />
    </div>
  )
}

export default LinkList
