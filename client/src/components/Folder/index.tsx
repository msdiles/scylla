import React, { useEffect } from "react"
import { IFolder, ILink } from "@/types/interfaces"
import "./folder.scss"
import useFolder from "@/components/Folder/useFolder"
import classNames from "@/utils/classNames"
import Label from "semantic-ui-react/dist/commonjs/elements/Label"
import Button from "semantic-ui-react/dist/commonjs/elements/Button"
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon"
import CSSTransition from "react-transition-group/CSSTransition"
import FolderModal from "../FolderModal"
import FolderLink from "@/components/Folder/FolderLink"

interface IProps {
  folder: IFolder
}

const Folder = ({ folder }: IProps) => {
  const {
    expand,
    setExpand,
    OnMouseLeave,
    links,
    isDeleteMessageOpen,
    setIsDeleteMessageOpen,
    toggleFavorite,
    changeFolder,
    deleteFolder,
    loading,
  } = useFolder(folder)

  useEffect(() => {
    if (folder._id === "5f95b432ffa2321b00693ae9") {
      console.log("REnder", folder)
    }
  })
  return (
    <div
      className="folder-main"
      onMouseOver={() => setExpand(true)}
      onMouseLeave={() => OnMouseLeave()}
    >
      <p className="folder__name">{folder.name}</p>

      <div
        className={
          "folder__link-list" +
          classNames({ "folder__link-list_expand": expand })
        }
      >
        <div className="folder__link-list-names">
          {(links as ILink[]).map((link: ILink, index: number) => {
            return <FolderLink link={link} folder={folder} key={link._id} />
          })}
          <CSSTransition
            in={isDeleteMessageOpen}
            timeout={300}
            classNames={"delete"}
          >
            <div className="folder__delete-message">
              <Button
                className="folder__button-delete-cancel"
                onClick={() => setIsDeleteMessageOpen(false)}
              >
                Cancel
              </Button>
              <Button
                primary
                negative
                className="folder__button-delete-confirm"
                onClick={deleteFolder}
              >
                Delete
              </Button>
            </div>
          </CSSTransition>
        </div>

        <div className="folder-buttons">
          <Button
            icon
            className="folder__button-favorite"
            color={folder.favorite ? "yellow" : undefined}
            onClick={toggleFavorite}
          >
            <Icon name="favorite" />
          </Button>

          <FolderModal
            submitFunction={changeFolder}
            loading={loading}
            header={"Change Bookmark"}
            buttonText={"Change"}
            folder={folder}
            trigger={
              <Button icon className="folder__button-change">
                <Icon name="write" />
              </Button>
            }
          />

          <Button
            icon
            className="folder__button-delete"
            onClick={() => {
              setIsDeleteMessageOpen(true)
            }}
          >
            <Icon name="close" />
          </Button>
        </div>
      </div>

      {folder.favorite && (
        <Icon
          className="folder-favorite-label"
          name="favorite"
          color="yellow"
        />
      )}
    </div>
  )
}

export default React.memo(Folder)
