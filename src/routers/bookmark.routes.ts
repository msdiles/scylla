import express from "express"

import Router from "./Router"
import Validator from "../validate/validator"
import BookmarkRules from "../validate/bookmark.rules"
import BookmarkControllerApi from "../controllers/bookmark.controller.api"
import AuthControllerApi from "../controllers/auth.controller.api"

class BookmarkRouter extends Router {
  path = "/api/bookmark"
  router = express.Router()

  constructor(middleware: any[]) {
    super(middleware)
    this.initRoute()
  }
  initRoute() {
    this.router.post(
      "/link/add",
      BookmarkRules.addLinkRules(),
      Validator.validate,
      AuthControllerApi.checkJWTMiddleware,
      BookmarkControllerApi.addLink
    )
    this.router.post(
      "/link/change",
      BookmarkRules.changeLinkRules(),
      Validator.validate,
      AuthControllerApi.checkJWTMiddleware,
      BookmarkControllerApi.changeLink
    )
    this.router.post(
      "/link/delete",
      BookmarkRules.deleteLinkRules(),
      Validator.validate,
      AuthControllerApi.checkJWTMiddleware,
      BookmarkControllerApi.deleteLink
    )
    this.router.post(
      "/folder/add",
      BookmarkRules.addFolderRules(),
      Validator.validate,
      AuthControllerApi.checkJWTMiddleware,
      BookmarkControllerApi.addFolder
    )
    this.router.post(
      "/all",
      BookmarkRules.getAll(),
      Validator.validate,
      AuthControllerApi.checkJWTMiddleware,
      BookmarkControllerApi.getAll
    )
  }
}

export default BookmarkRouter
