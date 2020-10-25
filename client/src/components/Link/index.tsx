import React from "react"
import { useSelector } from "react-redux"
import { Draggable, DraggableProvided } from "react-beautiful-dnd"
import CSSTransition from "react-transition-group/CSSTransition"
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon"
import Button from "semantic-ui-react/dist/commonjs/elements/Button"
import { ILink } from "@/types/interfaces"
import { RootState } from "@/state/reducers"
import classNames from "@/utils/classNames"
import URLNameLabel from "@/components/Link/URLNameLabel"
import LinkModal from "@/components/LinkModal"
import useLink from "@/components/Link/useLink"
import "./link.scss"

interface IProps {
  link: ILink
  index: number
}

const Link = ({ link, index }: IProps) => {
  const {
    openUrl,
    changeColor,
    changeLink,
    deleteLink,
    toggleFavorite,
    OnMouseLeave,
    expand,
    setExpand,
    isDeleteMessageOpen,
    setIsDeleteMessageOpen,
  } = useLink(link)
  const { folders, loading } = useSelector((state: RootState) => state.bookmark)
  return (
    <Draggable draggableId={link._id} index={index}>
      {(provided: DraggableProvided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={
            "link-draggable" + classNames({ "link-draggable_expand": expand })
          }
        >
          <div
            className={
              "link" +
              classNames({
                link_favorite: link.favorite,
                link_delete: isDeleteMessageOpen,
                link_expand: expand,
              })
            }
            onMouseOver={() => setExpand(true)}
            onMouseLeave={OnMouseLeave}
          >
            <URLNameLabel
              expand={expand}
              link={link}
              changeColor={changeColor}
            />

            {expand && (
              <>
                <p className="link__url">{link.url}</p>

                <Button
                  icon
                  className="link__button-open-url"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    openUrl(e)
                  }
                >
                  <Icon name="external alternate" />
                </Button>

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
        </div>
      )}
    </Draggable>
  )
}

export default React.memo(Link)
