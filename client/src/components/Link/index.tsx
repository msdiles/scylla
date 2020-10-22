import React, { useEffect, useState } from "react"
import { ILink } from "@/types/interfaces"
import "./link.scss"
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon"
import Button from "semantic-ui-react/dist/commonjs/elements/Button"
import CSSTransition from "react-transition-group/CSSTransition"
import { Color } from "@/types/types"
import URLNameLabel from "@/components/Link/URLNameLabel"
import LinkModal from "@/components/LinkModal"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/state/reducers"
import {
  changeLinkRequested,
  deleteLinkRequested,
} from "@/state/actions/bookmark.actions"
import classNames from "@/utils/classNames"
import { Draggable } from "react-beautiful-dnd"

interface IProps {
  link: ILink
  index: number
}

interface IState {
  name: string
  url: string
  folders: string[] | []
}

const Link = ({ link, index }: IProps) => {
  const [expand, setExpand] = useState(false)
  const [isDeleteMessageOpen, setIsDeleteMessageOpen] = useState(false)
  const { folders, loading } = useSelector((state: RootState) => state.bookmark)
  const dispatch = useDispatch()

  const openUrl = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.target === e.currentTarget) {
      window.open(link.url, "_blank")
    }
  }

  const changeColor = (newColor: Color) => {
    dispatch(
      changeLinkRequested({
        data: {
          target: {
            ...link,
            color: newColor,
          },
        },
      })
    )
  }

  const changeLink = (form: IState) => {
    dispatch(
      changeLinkRequested({
        data: {
          target: {
            ...link,
            url: form.url,
            name: form.name,
            folders: form.folders,
          },
        },
      })
    )
  }

  const deleteLink = () => {
    dispatch(
      deleteLinkRequested({
        data: {
          target: {
            ...link,
          },
        },
      })
    )
  }

  const toggleFavorite = () => {
    dispatch(
      changeLinkRequested({
        data: {
          target: {
            ...link,
            favorite: !link.favorite,
          },
        },
      })
    )
  }

  return (
    <Draggable draggableId={link._id} index={index}>
      {(provided) => (
        // <CSSTransition in={expand} timeout={300} classNames="link">
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={
            "link" +
            classNames({
              link_favorite: link.favorite,
              link_delete: isDeleteMessageOpen,
              link_expand: expand,
            })
          }
          onMouseOver={(e) => setExpand(true)}
          onMouseLeave={(e) => {
            setExpand(false)
            setIsDeleteMessageOpen(false)
          }}
          // onClick={(e) => openUrl(e)}
        >
          <URLNameLabel expand={expand} link={link} changeColor={changeColor} />

          {expand && (
            <>
              <p className="link__url">{link.url}</p>

              <Button
                icon
                className="link__button-favorite"
                color={link.favorite ? "yellow" : undefined}
                onClick={toggleFavorite}
              >
                <Icon name="favorite" />
              </Button>

              <LinkModal
                folders={folders}
                submitFunction={changeLink}
                loading={loading}
                header={"Change Bookmark"}
                buttonText={"Change"}
                link={link}
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
                    onClick={deleteLink}
                  >
                    Delete
                  </Button>
                </div>
              </CSSTransition>
            </>
          )}
        </div>
        // </CSSTransition>
      )}
    </Draggable>
  )
}

export default React.memo(Link)
