import React, { ReactNode, useEffect, useState } from "react"
import { Form, Header, Popup } from "semantic-ui-react"
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown"
import Button from "semantic-ui-react/dist/commonjs/elements/Button"
import { IFolder, ILink } from "@/types/interfaces"

interface IProps {
  folders: IFolder[]
  trigger: ReactNode
  header: string
  buttonText: string
  link: ILink
  loading: boolean
  onSubmit: (folders: string[]) => void
}

const AddFolderPopup = ({
  trigger,
  header,
  buttonText,
  link,
  folders,
  loading,
  onSubmit,
}: IProps) => {
  const [newFolders, setNewFolders] = useState<string[] | []>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setNewFolders((link && link.folders) ?? [])
  }, [link])

  const changeFolder = (
    event: React.SyntheticEvent<HTMLElement, Event>,
    data: any
  ) => {
    setNewFolders(data.value)
  }

  return (
    <Popup
      className="add-link-modal"
      basic
      position="bottom center"
      on="click"
      trigger={trigger}
      onOpen={() => setIsModalOpen(true)}
      onClose={() => setIsModalOpen(false)}
      open={isModalOpen}
    >
      <Header className={"text_centered"}>{header}</Header>
      <Form className="add-form">
        <Dropdown
          options={folders.map((folder) => ({
            text: folder.name,
            value: folder._id,
          }))}
          placeholder="Folder"
          fluid
          multiple
          search
          selection
          onChange={changeFolder}
          value={newFolders}
        />
      </Form>
      <Button
        disabled={newFolders.length === 0}
        type={"submit"}
        color={"blue"}
        onClick={() => onSubmit(newFolders)}
        loading={loading}
        className={"add-link-modal__submit"}
      >
        {buttonText}
      </Button>
    </Popup>
  )
}

export default AddFolderPopup
