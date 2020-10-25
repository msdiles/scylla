import React, { ReactNode, useEffect, useState } from "react"
import { Form, Header } from "semantic-ui-react"
import Button from "semantic-ui-react/dist/commonjs/elements/Button"
import "@/components/LinkModal/linkModal.scss"
import { IFolder } from "@/types/interfaces"
import Popup from "semantic-ui-react/dist/commonjs/modules/Popup"

interface IProps {
  submitFunction: (data: IState) => void
  loading: boolean
  trigger: ReactNode
  header: string
  buttonText: string
  folder?: IFolder
}

interface IState {
  name: string
}

const FolderModal = ({
  submitFunction,
  loading,
  trigger,
  header,
  buttonText,
  folder,
}: IProps) => {
  const [form, setForm] = useState<IState>({
    name: "",
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setForm({
      name: (folder && folder.name) ?? "",
    })
  }, [folder])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const onSubmit = async (form: IState) => {
    await submitFunction(form)
    setForm({ name: "" })
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
            label={"Name"}
            placeholder={"Name"}
            type={"text"}
            name={"name"}
            onChange={handleChange}
            value={form.name}
            autoComplete="off"
          />
        </Form.Field>
      </Form>
      <Button
        disabled={!form.name}
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

export default FolderModal
