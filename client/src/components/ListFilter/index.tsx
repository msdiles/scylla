import React, { useState } from "react"
import "./listFilter.scss"
import { Menu } from "semantic-ui-react"
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon"
import classNames from "@/utils/classNames"
import CSSTransition from "react-transition-group/CSSTransition"
import Popup from "semantic-ui-react/dist/commonjs/modules/Popup"
import { SortBy, SortDirection } from "@/types/types"
import { useDispatch, useSelector } from "react-redux"
import { sortLinks } from "@/state/actions/bookmark.actions"
import { RootState } from "@/state/reducers"

const ListFilter = () => {
  const [isOpen, setIsOpen] = useState(false)
  // const [sortBy, setSortBy] = useState<SortBy>("favorite")
  // const [sortDirection, setSortDirection] = useState<SortDirection>(
  //   "sort content ascending"
  // )
  //
  const { sortBy, sortDirection } = useSelector(
    (state: RootState) => state.bookmark.linkSort
  )
  const dispatch = useDispatch()

  const changeSortBy = (option: SortBy) => {
    // setSortBy(option)
    dispatch(sortLinks({ sortBy: option, sortDirection }))
  }

  const changeSortDirection = (option: SortDirection) => {
    // setSortDirection(option)
    dispatch(sortLinks({ sortBy, sortDirection: option }))
  }

  return (
    <div className="list-filter">
      <Menu compact>
        <Menu.Item
          className={classNames({
            "link-filter__toggle": true,
            "link-filter__toggle_active": isOpen,
          })}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icon name="filter" />
        </Menu.Item>
      </Menu>

      <CSSTransition timeout={300} in={isOpen} classNames={"filter"}>
        <Menu icon vertical className="link-filter__menu">
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
          <div className="link-filter__divider"></div>
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
//TODO rework to Menu from Semantic UI
export default ListFilter
