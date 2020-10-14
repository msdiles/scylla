import React from "react"
import "@/styles/authForm.scss"
import { Link } from "react-router-dom"
import { Button } from "semantic-ui-react"
import Form from "semantic-ui-react/dist/commonjs/collections/Form"
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon"
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { signInRequested } from "@/state/actions/auth.actions"
import { isEmail } from "@/utils/validator"
import ValidationInput from "@/components/ValidationInput"

const Login = () => {
  const { handleSubmit, register, errors } = useForm()
  const dispatch = useDispatch()

  const onSubmit = (value: any) => {
    dispatch(signInRequested({ data: { ...value } }))
  }

  return (
    <Form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <Icon name="sign-in" className="auth-form__icon" size="large" />
      <h1 className="auth-form__title">Login</h1>
      <Form.Field className="auth-form__input">
        <ValidationInput
          label="Email"
          name="email"
          placeholder="Email"
          autoComplete="off"
          className={errors.email ? "error" : ""}
          errors={errors}
          register={register({
            required: true,
            validate: (value) => isEmail(value),
          })}
          errorMessages={{
            required: "Enter email",
            validate: "Invalid email format",
          }}
        />
      </Form.Field>
      <Form.Field className="auth-form__input">
        <ValidationInput
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          className={errors.email ? "error" : ""}
          errors={errors}
          register={register({
            required: true,
          })}
          errorMessages={{
            required: "Enter password",
            validate: "Invalid email format",
          }}
        />
      </Form.Field>
      <Button type="submit" fluid color="blue" className="auth-form__button">
        SIGN IN
      </Button>
      <Divider horizontal className="auth-form__divider">
        Or
      </Divider>

      <div className="auth-form__links auth-form__links_between">
        <Link to="/reset" className="auth-form__link left">
          Forgot password
        </Link>
        <Link to="/signup" className="auth-form__link right">
          Don't have an account?
        </Link>
      </div>
    </Form>
  )
}

export default Login
