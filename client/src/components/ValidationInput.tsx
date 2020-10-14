import React from "react"
import Form from "semantic-ui-react/dist/commonjs/collections/Form"
import { FormInputProps } from "semantic-ui-react"
import {
  CustomElement,
  FieldErrors,
  FieldValues,
  ValidationRules,
} from "react-hook-form"

interface Props extends FormInputProps {
  errors: FieldErrors<FieldValues>
  register: (
    ref:
      | (ValidationRules & HTMLInputElement)
      | (ValidationRules & HTMLSelectElement)
      | (ValidationRules & HTMLTextAreaElement)
      | (ValidationRules & CustomElement<FieldValues>)
      | null
  ) => void
  errorMessages: { [key: string]: string }
}

const ValidationInput = ({
  errors,
  register,
  errorMessages,
  ...props
}: Props) => {
  return (
    <>
      <Form.Input
        {...props}
        input={{
          ref: register,
        }}
      />
      {Object.keys(errorMessages).map(
        (key) =>
          errors[props.name]?.type === key && (
            <small className="auth-form__error" key={key}>
              {errorMessages[key]}
            </small>
          )
      )}
    </>
  )
}

export default ValidationInput
