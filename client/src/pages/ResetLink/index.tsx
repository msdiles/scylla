import React, { useState } from "react"
import Form from "semantic-ui-react/dist/commonjs/collections/Form"
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon"
import ValidationInput from "@/components/ValidationInput"
import isEmail from "validator/lib/isEmail"
import { Button, Header, Message, Modal } from "semantic-ui-react"
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider"
import { Link } from "react-router-dom"
import PageLoader from "@/components/PageLoader"
import { redirect } from "@/state/actions/app.actions"
import { useForm } from "react-hook-form"
import useSendLink from "@/pages/ResetLink/useSendLink"
import { useDispatch } from "react-redux"

enum userState {
  "Null" = "Null",
  "False" = "False",
  "True" = "True",
}

const ResetLink = () => {
  const [userExist, setUserExist] = useState<userState>(userState.Null)
  const { handleSubmit, register, errors } = useForm()
  const { emailLoading, sendLink } = useSendLink()
  const dispatch = useDispatch()
  const onSubmit = async (value: any) => {
    setUserExist(userState.Null)
    const result = await sendLink(value)
    console.log(result)
    if (result) {
      setUserExist(userState.True)
    } else {
      setUserExist(userState.False)
    }
    console.log(userExist)
  }

  return (
    <>
      <Form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <Icon name="redo" className="auth-form__icon" size="large" />
        <h1 className="auth-form__title">RESET PASSWORD</h1>

        <Message className="auth-form__message">
          {" "}
          Enter your email address and we'll send you a link to reset your
          password
        </Message>

        <Form.Field className="auth-form__input">
          <ValidationInput
            label="Email"
            name="email"
            placeholder="Email"
            autoComplete="off"
            loading={emailLoading}
            className={errors.email ? "error" : ""}
            errors={errors}
            register={register({
              required: true,
              validate: {
                isEmail: (value) => isEmail(value),
              },
            })}
            errorMessages={{
              required: "Enter email",
              isEmail: "Invalid email format",
            }}
          />
        </Form.Field>
        <Button type="submit" fluid color="blue" className="auth-form__button">
          SEND LINK
        </Button>
        {userExist === userState.False && (
          <Message negative attached className="auth-form__message">
            <Message.Header>
              The user with entered email does not exist
            </Message.Header>
            <Message.Content>
              Please check that you have typed your email correct
            </Message.Content>
          </Message>
        )}
        <Divider horizontal className="auth-form__divider">
          Or
        </Divider>
        <div className="auth-form__links auth-form__links_center">
          Don't have an account? Signup&nbsp;
          <Link to="/signup" className="auth-form__link ">
            here
          </Link>
        </div>
      </Form>
      <PageLoader loading={emailLoading} inverted={true} />
      <Modal open={userExist === userState.True} centered={true}>
        <Header className="text_centered">Check Your Email</Header>
        <Modal.Content>
          <p className="text_centered">
            We just sent instructions for completing your password reset to the
            designated email address
          </p>
        </Modal.Content>
        <Modal.Actions className="flex-centered">
          <Button
            type="button"
            color="green"
            onClick={() => dispatch(redirect({ path: "/" }))}
          >
            Go to home page
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default ResetLink
