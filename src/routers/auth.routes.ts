import express from "express"

import Router from "./Router"
import Validator from "../validate/validator"
import AuthRules from "../validate/auth.rules"
import AuthControllerApi from "../controllers/auth.controller.api"

class AuthRouter extends Router {
  path = "/api/auth"
  router = express.Router()

  constructor(middleware: any[]) {
    super(middleware)
    this.initRoute()
  }
  initRoute() {
    this.router.post(
      "/email-check",
      AuthRules.emailRules(),
      Validator.validate,
      AuthControllerApi.checkEmail
    )
    this.router.post(
      "/signup",
      AuthRules.signupRules(),
      Validator.validate,
      AuthControllerApi.signUp
    )
    this.router.post(
      "/signin",
      AuthRules.signinRules(),
      Validator.validate,
      AuthControllerApi.signIn
    )
    this.router.post(
      "/logout",
      AuthRules.logoutRules(),
      Validator.validate,
      AuthControllerApi.logOut
    )

    this.router.post(
      "/refresh",
      AuthRules.refreshRules(),
      Validator.validate,
      AuthControllerApi.refreshTokens
    )

    this.router.get(
      "/refresh",
      AuthControllerApi.checkJWTMiddleware,
      AuthControllerApi.getUserInfo
    )
    this.router.post(
      "/reset/get",
      AuthRules.emailRules(),
      Validator.validate,
      AuthControllerApi.getResetURL
    )

    this.router.post(
      "/reset/check",
      AuthRules.resetCheckRules(),
      Validator.validate,
      AuthControllerApi.resetCheck
    )

    this.router.post(
      "/reset/password",
      AuthRules.resetPasswordRules(),
      Validator.validate,
      AuthControllerApi.resetPassword
    )
  }
}

export default AuthRouter
