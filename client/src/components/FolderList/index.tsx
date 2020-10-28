import React from "react"
import "./folderList.scss"
import { IFolder } from "@/types/interfaces"
import Folder from "@/components/Folder"
import { Icon } from "semantic-ui-react"
import FolderModal from "@/components/FolderModal"
import useFolderList from "@/components/FolderList/useFolderList"
import ListFilter from "@/components/ListFilter"

interface IProps {
  foldersSequence: string[]
  width: number
}

const FolderList = ({ foldersSequence, width }: IProps) => {
  console.log(width)
  const { addFolder, items, loading } = useFolderList(foldersSequence)
  return (
    <div className="folder-list" style={{ width: `${width}px` }}>
      <h2 className="text_centered">Folders</h2>
      <ListFilter filterTarget="folder" />
      <div className="folder-drag-and-drop">
        {(items as IFolder[]).map((folder: IFolder) => {
          if (folder) {
            return <Folder folder={folder} key={folder._id} />
          }
        })}
        <FolderModal
          submitFunction={addFolder}
          loading={loading}
          trigger={
            <div className="folder-main folder_add">
              <Icon circular name="add" size="large" />
            </div>
          }
          header="Add folder"
          buttonText="Add"
        />
      </div>
    </div>
  )
}

export default FolderList
