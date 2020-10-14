import React, { useState } from "react"
import "@/styles/authForm.scss"
import { Link } from "react-router-dom"
import { Button, Header, Modal } from "semantic-ui-react"
import Form from "semantic-ui-react/dist/commonjs/collections/Form"
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon"
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider"
import { useForm } from "react-hook-form"
import isEmail from "validator/lib/isEmail"
import { useDispatch } from "react-redux"
import {
  mustHaveDigit,
  mustHaveLowercase,
  mustHaveOnlyLettersAndDigits,
  mustHaveUppercase,
} from "@/utils/validator"
import useCheckEmail from "@/pages/Signup/useCheckEmail"
import AwesomeDebouncePromise from "awesome-debounce-promise"
import ValidationInput from "@/components/ValidationInput"
import useSignup from "@/pages/Signup/useSignup"
import PageLoader from "@/components/PageLoader"
import { redirect } from "@/state/actions/app.actions"

const Signup = () => {
  const [signupModal, setSignupModal] = useState(false)
  const dispatch = useDispatch()
  const { handleSubmit, register, errors, watch } = useForm()
  const { emailLoading, checkEmail } = useCheckEmail()
  const { signupLoading, signup } = useSignup()
  const onSubmit = async (value: any) => {
    const result = await signup(value)
    if (result) setSignupModal(true)
  }

  const checkEmailDebounce = AwesomeDebouncePromise(checkEmail, 1000)

  return (
    <>
      <Form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <Icon name="signup" className="auth-form__icon" size="large" />
        <h1 className="auth-form__title">SIGN UP</h1>
        <Form.Field className="auth-form__input">
          <ValidationInput
            label="Username"
            name="username"
            placeholder="Username"
            autoComplete="off"
            className={errors.username ? "error" : ""}
            errors={errors}
            register={register({
              required: true,
              minLength: 6,
              maxLength: 128,
            })}
            errorMessages={{
              required: "Enter username",
              minLength: "Login must have at least 6 characters",
              maxLength: "Your login can't be longer than 128 characters",
            }}
          />
        </Form.Field>
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
                isExist: async (value) => await checkEmailDebounce(value),
              },
              maxLength: 128,
            })}
            errorMessages={{
              required: "Enter email",
              isEmail: "Invalid email format",
              maxLength: "Your email can't be longer than 128 characters",
              isExist: "User with this email already exists",
            }}
          />
        </Form.Field>
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
          SIGN UP
        </Button>
        <Divider horizontal className="auth-form__divider">
          Or
        </Divider>

        <div className="auth-form__links auth-form__links_center">
          Already have an account? Sign in&nbsp;
          <Link to="/login" className="auth-form__link ">
            here
          </Link>
        </div>
      </Form>

      <PageLoader loading={signupLoading} inverted={true} />

      <Modal open={signupModal} centered={true}>
        <Header className="text_centered">Congratulations!</Header>
        <Modal.Content>
          <p className="text_centered">You have successfully registered.</p>
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

export default Signup
