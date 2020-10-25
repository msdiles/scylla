import React, { useState } from "react"
import { IFolder, ILink } from "@/types/interfaces"
import "./folder.scss"
import useFolder from "@/components/Folder/useFolder"
import classNames from "@/utils/classNames"
import Label from "semantic-ui-react/dist/commonjs/elements/Label"
import Button from "semantic-ui-react/dist/commonjs/elements/Button"
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon"
import LinkModal from "@/components/LinkModal"
import CSSTransition from "react-transition-group/CSSTransition"
import FolderModal from "../FolderModal"

interface IProps {
  folder: IFolder
  index: number
}

const Folder = ({ folder, index }: IProps) => {
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

  return (
    <div
      className="folder"
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
          {links.map((link: ILink) => (
            <div className="folder-link" key={link._id}>
              <Label className="folder-link__url" color={link.color}>
                {link.name}
              </Label>
            </div>
          ))}
        </div>
        <div className="folder-buttons">
          <Button
            icon
            className="link__button-favorite"
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
              <Button icon className="link__button-change">
                <Icon name="write" />
              </Button>
            }
          />

          <Button
            icon
            className="link__button-delete"
            onClick={() => {
              setIsDeleteMessageOpen(true)
            }}
          >
            <Icon name="close" />
          </Button>

          <CSSTransition
            in={isDeleteMessageOpen}
            timeout={300}
            classNames={"delete"}
          >
            <div className="link__delete-message">
              <Button
                className="link__button-delete-cancel"
                onClick={() => setIsDeleteMessageOpen(false)}
              >
                Cancel
              </Button>
              <Button
                primary
                negative
                className="link__button-delete-confirm"
                onClick={deleteFolder}
              >
                Delete
              </Button>
            </div>
          </CSSTransition>
        </div>
      </div>
    </div>
  )
}

export default Folder
