import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import Form from "semantic-ui-react/dist/commonjs/collections/Form"
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon"
import { Button, Header, Message, Modal } from "semantic-ui-react"
import ValidationInput from "@/components/ValidationInput"
import { useParams } from "react-router-dom"
import PageLoader from "@/components/PageLoader"
import { redirect } from "@/state/actions/app.actions"
import {
  mustHaveDigit,
  mustHaveLowercase,
  mustHaveOnlyLettersAndDigits,
  mustHaveUppercase,
} from "@/utils/validator"
import useCheckLink from "@/pages/ResetPassword/useResetCheck"
import userResetPassword from "@/pages/ResetPassword/useResetPassword"

enum fetchState {
  "Null" = "Null",
  "False" = "False",
  "True" = "True",
}

const ResetPassword = () => {
  const [isLinkCorrect, setIsLinkCorrect] = useState(fetchState.Null)
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(fetchState.Null)
  const { handleSubmit, register, errors, watch, getValues } = useForm()
  const { checkLoading, checkLink } = useCheckLink()
  const { passwordLoading, resetPassword } = userResetPassword()
  const { id, date } = useParams<{ id: string; date: string }>()
  const dispatch = useDispatch()
  const onSubmit = async () => {
    const result = await resetPassword({
      resetId: id,
      resetDate: date,
      password: getValues("password"),
    })
    if (result) {
      setIsPasswordUpdated(fetchState.True)
    }
  }

  useEffect(() => {
    const check = async () => {
      const result = await checkLink({ resetId: id, resetDate: date })
      if (result) {
        setIsLinkCorrect(fetchState.True)
      } else {
        setIsLinkCorrect(fetchState.False)
      }
    }
    check()
  }, [])

  return (
    <>
      <Form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <Icon name="lock" className="auth-form__icon" size="large" />
        <h1 className="auth-form__title">RESET PASSWORD</h1>

        <Message> Enter your new password</Message>

        <Form.Field className="auth-form__input">
          <ValidationInput
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            className={errors.password ? "error" : ""}
            errors={errors}
            register={register({
              required: true,
              minLength: 8,
              maxLength: 128,
              validate: {
                hasUpperCase: (value) => mustHaveUppercase(value),
                hasLowerCase: (value) => mustHaveLowercase(value),
                hasDigit: (value) => mustHaveDigit(value),
                hasNotSpecial: (value) => mustHaveOnlyLettersAndDigits(value),
              },
            })}
            errorMessages={{
              required: "Enter password",
              minLength: "Password must have at least 8 characters",
              maxLength: "Your password can't be longer than 128 characters",
              hasUpperCase: "Password must have at least one uppercase letter",
              hasLowerCase: "Password must have at least one lowercase letter",
              hasDigit: "Password must have at least one digit character",
              hasNotSpecial: "Password mustn't have any special characters",
            }}
          />
        </Form.Field>
        <Form.Field className="auth-form__input">
          <ValidationInput
            label="Repeat Password"
            name="repeatPassword"
            type="password"
            placeholder="Repeat Password"
            className={errors.repeatPassword ? "error" : ""}
            errors={errors}
            register={register({
              required: true,
              validate: (value) => value === watch("password"),
            })}
            errorMessages={{
              required: "Repeat password",
              validate: "Passwords don't match",
            }}
          />
        </Form.Field>
        <Button type="submit" fluid color="blue" className="auth-form__button">
          RESET PASSWORD
        </Button>
      </Form>
      <PageLoader loading={checkLoading || passwordLoading} inverted={true} />
      <Modal
        open={isLinkCorrect === fetchState.False}
        centered={true}
        size="tiny"
      >
        <Header className="text_centered">Your reset link is invalid</Header>
        <Modal.Content>
          <p className="text_centered">
            Please try resetting your password again
          </p>
        </Modal.Content>
        <Modal.Actions className="flex-centered">
          <Button
            type="button"
            onClick={() => dispatch(redirect({ path: "/" }))}
          >
            Cancel
          </Button>
          <Button
            type="button"
            color="green"
            onClick={() => dispatch(redirect({ path: "/reset" }))}
          >
            Reset password
          </Button>
        </Modal.Actions>
      </Modal>

      <Modal
        open={isPasswordUpdated === fetchState.True}
        centered={true}
        size="tiny"
      >
        <Header className="text_centered">Succeeded!</Header>
        <Modal.Content>
          <p className="text_centered">Your password has been changed</p>
        </Modal.Content>
        <Modal.Actions className="flex-centered">
          <Button
            type="button"
            onClick={() => dispatch(redirect({ path: "/" }))}
          >
            Go to home page
          </Button>
          <Button
            type="button"
            color="green"
            onClick={() => dispatch(redirect({ path: "/login" }))}
          >
            Login
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}
export default ResetPassword
