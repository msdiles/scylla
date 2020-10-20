import React, { useEffect, useState } from "react"
import "./linkList.scss"
import { useDispatch, useSelector } from "react-redux"
import { addLinkRequested } from "@/state/actions/bookmark.actions"
import { RootState } from "@/state/reducers"
import LinkModal from "@/components/LinkModal"
import { ILink } from "@/types/interfaces"
import Link from "@/components/Link"
import { color } from "@/types/types"
import { getRandomColor } from "@/utils/colors"
import Button from "semantic-ui-react/dist/commonjs/elements/Button"

interface IAddLink {
  name: string
  url: string
  folders: string[] | []
}

interface IItems extends ILink {
  color: color
}

const LinkList = () => {
  const [items, setItems] = useState<ILink[] | []>([])
  const dispatch = useDispatch()
  const userId = useSelector((state: RootState) => state.auth.userId)
  const { links, folders, loading } = useSelector(
    (state: RootState) => state.bookmark
  )

  useEffect(() => {
    setItems([...links])
  }, [links])

  const addLink = (data: IAddLink) => {
    dispatch(
      addLinkRequested({
        data: {
          userId,
          url: data.url,
          date: new Date(),
          name: data.name,
          folders: data.folders,
          color: getRandomColor(),
        },
      })
    )
  }

  return (
    <div className="link-list">
      <h2>Unfiltered Bookmarks</h2>
      {(items as any).map((link: IItems) => (
        <Link {...link} _id={link._id as string} key={link._id as string} />
      ))}
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

//TODO fix delete function
//TODO add color to state(add function )
//TODO Add Link to favorite
//TODO change props
