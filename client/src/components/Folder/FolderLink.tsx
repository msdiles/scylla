import React, { useState } from "react"
import Label from "semantic-ui-react/dist/commonjs/elements/Label"
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon"
import { IFolder, ILink } from "@/types/interfaces"
import Button from "semantic-ui-react/dist/commonjs/elements/Button"
import { useDispatch } from "react-redux"
import { removeLinkFromFolderRequested } from "@/state/actions/bookmark.actions"

interface IProps {
  link: ILink
  folder: IFolder
}

const FolderLink = ({ link, folder }: IProps) => {
  const [display, setDisplay] = useState(false)
  const dispatch = useDispatch()
  const onMouseOver = (e: React.MouseEvent) => {
    console.log("true", e.currentTarget)
    e.preventDefault()
    setDisplay(true)
  }

  const openUrl = () => {
    window.open(link.url, "_blank")
  }

  const onMouseLeave = (e: React.MouseEvent) => {
    console.log("false", e.currentTarget)
    e.preventDefault()
    setDisplay(false)
  }

  const removeLinkFromFolder = () => {
    dispatch(
      removeLinkFromFolderRequested({
        data: { folder: folder._id, link: link._id },
      })
    )
  }

  return (
    <div
      className="folder-link"
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <Label className="folder-link__url" color={link.color} onClick={openUrl}>
        <p>{link.name}</p>
      </Label>
      {display && (
        <Button
          icon
          className="folder-link__remove-button"
          color={"red"}
          size="mini"
          onClick={removeLinkFromFolder}
        >
          <Icon name="remove" />
        </Button>
      )}
    </div>
  )
}

export default FolderLink
