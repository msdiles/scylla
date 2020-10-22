import React, { ReactNode, useEffect, useState } from "react"
import { Form, Header } from "semantic-ui-react"
import Button from "semantic-ui-react/dist/commonjs/elements/Button"
import "./linkModal.scss"
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown"
import { IFolder, ILink } from "@/types/interfaces"
import Popup from "semantic-ui-react/dist/commonjs/modules/Popup"

interface IProps {
  folders: IFolder[]
  submitFunction: (data: IState) => void
  loading: boolean
  trigger: ReactNode
  header: string
  buttonText: string
  link?: ILink
}

interface IState {
  name: string
  url: string
  folders: string[] | []
}

const LinkModal = ({
  folders,
  submitFunction,
  loading,
  trigger,
  header,
  buttonText,
  link,
}: IProps) => {
  const [form, setForm] = useState<IState>({
    name: "",
    url: "",
    folders: [],
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setForm({
      name: (link && link.name) ?? "",
      url: (link && link.url) ?? "",
      folders: (link && link.folders) ?? [],
    })
  }, [link])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const changeFolder = (
    event: React.SyntheticEvent<HTMLElement, Event>,
    data: any
  ) => {
    setForm({ ...form, folders: data.value })
  }

  const onSubmit = async (form: IState) => {
    await submitFunction(form)
    setForm({ name: "", url: "", folders: [] })
    setIsModalOpen(false)
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
        <Form.Field>
          <Form.Input
            label={"URL"}
            placeholder={"URL"}
            type={"text"}
            name={"url"}
            onChange={handleChange}
            value={form.url}
            autoComplete="off"
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            label={"Name"}
            placeholder={"Name"}
            type={"text"}
            name={"name"}
            onChange={handleChange}
            value={form.name}
            autoComplete="off"
          />
        </Form.Field>
        {buttonText !== "Change" && (
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
            value={form.folders}
          />
        )}
      </Form>
      <Button
        disabled={!form.url || !form.name}
        type={"submit"}
        color={"blue"}
        onClick={() => onSubmit(form)}
        loading={loading}
        className={"add-link-modal__submit"}
      >
        {buttonText}
      </Button>
    </Popup>
  )
}

export default LinkModal
