import React, { useState } from "react"
import CSSTransition from "react-transition-group/CSSTransition"
import { useDispatch, useSelector } from "react-redux"
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu"
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon"
import Popup from "semantic-ui-react/dist/commonjs/modules/Popup"
import classNames from "@/utils/classNames"
import { SortBy, SortDirection } from "@/types/types"
import { sortFolders, sortLinks } from "@/state/actions/bookmark.actions"
import { RootState } from "@/state/reducers"
import "./listFilter.scss"

interface IProps {
  filterTarget: "link" | "folder"
}

const ListFilter = ({ filterTarget }: IProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { sortBy, sortDirection } = useSelector((state: RootState) => {
    if (filterTarget === "link") {
      return state.bookmark.linkSort
    } else {
      return state.bookmark.folderSort
    }
  })
  const dispatch = useDispatch()

  const changeSortBy = (option: SortBy) => {
    if (filterTarget === "link") {
      dispatch(sortLinks({ sortBy: option, sortDirection }))
    } else {
      dispatch(sortFolders({ sortBy: option, sortDirection }))
    }
  }

  const changeSortDirection = (option: SortDirection) => {
    if (filterTarget === "link") {
      dispatch(sortLinks({ sortBy, sortDirection: option }))
    } else {
      dispatch(sortFolders({ sortBy, sortDirection: option }))
    }
  }

  return (
    <div
      className={
        "list-filter" +
        classNames({
          "list-filter_link": filterTarget === "link",
          "list-filter_folder": filterTarget === "folder",
        })
      }
    >
      <Menu compact>
        <Menu.Item
          className={classNames({
            filter__toggle: true,
            filter__toggle_active: isOpen,
          })}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icon name="filter" />
        </Menu.Item>
      </Menu>

      <CSSTransition
        timeout={300}
        in={isOpen}
        classNames={filterTarget === "link" ? "filter-links" : "filter-folders"}
      >
        <Menu
          icon
          vertical
          className={
            filterTarget === "link"
              ? "filter-links__menu"
              : "filter-folders__menu"
          }
        >
          <Popup
            content="Sort by favorite"
            basic
            position="right center"
            trigger={
              <Menu.Item
                name="favorite"
                active={sortBy === "favorite"}
                onClick={() => changeSortBy("favorite")}
              >
                <Icon name="favorite" />
              </Menu.Item>
            }
          />
          <Popup
            content="Sort by date"
            basic
            position="right center"
            trigger={
              <Menu.Item
                name="calendar"
                active={sortBy === "calendar"}
                onClick={() => changeSortBy("calendar")}
              >
                <Icon name="calendar" />
              </Menu.Item>
            }
          />
          <Popup
            content="Sort by alphabet"
            basic
            position="right center"
            trigger={
              <Menu.Item
                name="font"
                active={sortBy === "font"}
                onClick={() => changeSortBy("font")}
              >
                <Icon name="font" />
              </Menu.Item>
            }
          />
          {filterTarget === "link" && (
            <Popup
              content="Custom sort"
              basic
              position="right center"
              trigger={
                <Menu.Item
                  name="setting"
                  active={sortBy === "setting"}
                  onClick={() => changeSortBy("setting")}
                >
                  <Icon name="setting" />
                </Menu.Item>
              }
            />
          )}
          <div className="filter__divider"></div>
          <Popup
            content="Sort ascending"
            basic
            position="right center"
            trigger={
              <Menu.Item
                name="sort content ascending"
                active={sortDirection === "sort content ascending"}
                onClick={() => changeSortDirection("sort content ascending")}
              >
                <Icon name="sort content ascending" />
              </Menu.Item>
            }
          />

          <Popup
            content="Sort descending"
            basic
            position="right center"
            trigger={
              <Menu.Item
                name="sort content descending"
                active={sortDirection === "sort content descending"}
                onClick={() => changeSortDirection("sort content descending")}
              >
                <Icon name="sort content descending" />
              </Menu.Item>
            }
          />
        </Menu>
      </CSSTransition>
    </div>
  )
}

export default ListFilter
