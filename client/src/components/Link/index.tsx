import React, { useState } from "react"
import { ILink } from "@/types/interfaces"
import "./link.scss"
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon"
import Button from "semantic-ui-react/dist/commonjs/elements/Button"
import CSSTransition from "react-transition-group/CSSTransition"
import { color } from "@/types/types"
import URLNameLabel from "@/components/Link/URLNameLabel"
import LinkModal from "@/components/LinkModal"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/state/reducers"
import {
  changeLinkRequested,
  deleteLinkRequested,
} from "@/state/actions/bookmark.actions"

interface IProps extends ILink {
  color: color
  _id: string
}

interface IState {
  name: string
  url: string
  folders: string[] | []
}

const Link = ({
  name,
  url,
  _id,
  color,
  folders: linkFolders,
  userId,
  date,
}: IProps) => {
  const [expand, setExpand] = useState(false)
  const { folders, loading } = useSelector((state: RootState) => state.bookmark)
  const dispatch = useDispatch()

  const openUrl = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.target === e.currentTarget) {
      window.open(url, "_blank")
    }
  }
  //TODO fix that
  const changeColor = (newColor: color) => {
    dispatch(
      changeLinkRequested({
        data: {
          id: _id,
          target: {
            _id: _id,
            userId,
            color: newColor,
            date,
            url: url,
            name: name,
            folders: linkFolders,
          },
        },
      })
    )
  }

  const changeLink = (form: IState) => {
    dispatch(
      changeLinkRequested({
        data: {
          id: _id,
          target: {
            _id: _id,
            userId,
            color,
            date,
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
            _id: _id,
            userId,
            color,
            date,
            url,
            name,
            folders: linkFolders,
          },
        },
      })
    )
  }

  return (
    <CSSTransition in={expand} timeout={300} classNames={"link"}>
      <div
        className="link"
        onMouseOver={(e) => setExpand(true)}
        onMouseLeave={(e) => setExpand(false)}
        onClick={(e) => openUrl(e)}
      >
        <URLNameLabel
          expand={expand}
          color={color}
          name={name}
          changeColor={changeColor}
        />

        {expand && (
          <>
            <p className="link__url">{url}</p>

            <LinkModal
              folders={folders}
              submitFunction={changeLink}
              loading={loading}
              header={"Change Bookmark"}
              buttonText={"Change"}
              changeFolders={linkFolders}
              changeName={name}
              changeUrl={url}
              trigger={
                <Button icon className="link__button-change">
                  <Icon name="write" />
                </Button>
              }
            />
            <Button icon className="link__button-delete" onClick={deleteLink}>
              <Icon name="close" />
            </Button>
          </>
        )}
      </div>
    </CSSTransition>
  )
}

export default React.memo(Link)
