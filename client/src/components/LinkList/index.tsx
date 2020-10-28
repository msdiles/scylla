import React from "react"
import { Droppable } from "react-beautiful-dnd"
import Button from "semantic-ui-react/dist/commonjs/elements/Button"
import { ILink } from "@/types/interfaces"
import LinkModal from "@/components/LinkModal"
import Link from "@/components/Link"
import ListFilter from "@/components/ListFilter"
import useLinkList from "@/components/LinkList/useLinkList"
import "./linkList.scss"

interface IProps {
  linksSequence: string[]
  width: number
}

const LinkList = ({ linksSequence, width }: IProps) => {
  const { loading, items, folders, addLink } = useLinkList(linksSequence)

  return (
    <div className="link-list" style={{ width: `${width}px` }}>
      <h2 className="text_centered">Unfiltered Bookmarks</h2>
      <ListFilter filterTarget="link" />
      <Droppable droppableId="links">
        {(provided) => (
          <div
            ref={provided.innerRef}
            className="link-drag-and-drop"
            {...provided.droppableProps}
          >
            {(items as any).map((link: ILink, index: number) => {
              if (link) {
                return (
                  <Link link={link} key={link._id as string} index={index} />
                )
              }
            })}
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
