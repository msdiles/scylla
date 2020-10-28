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
      BookmarkRules.deleteOrChangeLinkRules(),
      Validator.validate,
      AuthControllerApi.checkJWTMiddleware,
      BookmarkControllerApi.changeLink
    )
    this.router.post(
      "/link/delete",
      BookmarkRules.deleteOrChangeLinkRules(),
      Validator.validate,
      AuthControllerApi.checkJWTMiddleware,
      BookmarkControllerApi.deleteLink
    )
    this.router.post(
      "/link/sequence",
      BookmarkRules.linkSequenceRules(),
      Validator.validate,
      AuthControllerApi.checkJWTMiddleware,
      BookmarkControllerApi.sequenceLink
    )
    this.router.post(
      "/link/add-to-folder",
      BookmarkRules.addOrRemoveLinkToFromFolder(),
      Validator.validate,
      AuthControllerApi.checkJWTMiddleware,
      BookmarkControllerApi.addLinkToFolder
    )
    this.router.post(
      "/link/remove-from-folder",
      BookmarkRules.addOrRemoveLinkToFromFolder(),
      Validator.validate,
      AuthControllerApi.checkJWTMiddleware,
      BookmarkControllerApi.removeLinkFromFolder
    )
    this.router.post(
      "/folder/add",
      BookmarkRules.addFolderRules(),
      Validator.validate,
      AuthControllerApi.checkJWTMiddleware,
      BookmarkControllerApi.addFolder
    )
    this.router.post(
      "/folder/change",
      BookmarkRules.deleteOrChangeFolderRules(),
      Validator.validate,
      AuthControllerApi.checkJWTMiddleware,
      BookmarkControllerApi.changeFolder
    )
    this.router.post(
      "/folder/delete",
      BookmarkRules.deleteOrChangeFolderRules(),
      Validator.validate,
      AuthControllerApi.checkJWTMiddleware,
      BookmarkControllerApi.deleteFolder
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
