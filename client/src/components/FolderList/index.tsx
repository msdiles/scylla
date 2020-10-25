import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFolderRequested } from "@/state/actions/bookmark.actions"
import { RootState } from "@/state/reducers"
import "./folderList.scss"
import { Droppable, DroppableProvided } from "react-beautiful-dnd"
import { IFolder } from "@/types/interfaces"
import Folder from "@/components/Folder"
import { Icon } from "semantic-ui-react"
import FolderModal from "@/components/FolderModal"
import useFolderList from "@/components/FolderList/useFolderList"

const FolderList = () => {
  const userId = useSelector((state: RootState) => state.auth.userId)
  const { folders, loading } = useSelector((state: RootState) => state.bookmark)
  const { addFolder } = useFolderList()
  return (
    <div className="folder-list">
      <h2 className="text_centered">Folders</h2>
      <Droppable droppableId="folders">
        {(provided: DroppableProvided) => (
          <div
            className="folder-drag-and-drop"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {(folders as IFolder[]).map((folder: IFolder, index: number) => {
              if (folder) {
                return <Folder folder={folder} key={folder._id} index={index} />
              }
            })}
            <FolderModal
              submitFunction={addFolder}
              loading={loading}
              trigger={
                <div className="folder folder_add">
                  <Icon circular name="add" size="large" />
                </div>
              }
              header="Add folder"
              buttonText="Add"
            />
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default FolderList
