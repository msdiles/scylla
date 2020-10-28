import { check } from "express-validator"

export class BookmarkRules {
  static addLinkRules = () => {
    return [
      check("data.userId")
        .not()
        .isEmpty()
        .withMessage("UserId is Empty")
        .trim(),
      check("data.date").not().isEmpty().withMessage("Date is Empty").trim(),
      check("data.name").not().isEmpty().withMessage("Name is Empty").trim(),
      check("data.url").not().isEmpty().withMessage("URL is Empty").trim(),
    ]
  }

  static deleteOrChangeLinkRules = () => {
    return [
      check("data.target.userId")
        .not()
        .isEmpty()
        .withMessage("UserId is Empty")
        .trim(),
      check("data.target.date")
        .not()
        .isEmpty()
        .withMessage("Date is Empty")
        .trim(),
      check("data.target.name")
        .not()
        .isEmpty()
        .withMessage("Name is Empty")
        .trim(),
      check("data.target.url")
        .not()
        .isEmpty()
        .withMessage("URL is Empty")
        .trim(),
      check("data.target.color")
        .not()
        .isEmpty()
        .withMessage("Color is Empty")
        .trim(),
      check("data.target._id")
        .not()
        .isEmpty()
        .withMessage("_ID is Empty")
        .trim(),
    ]
  }

  static deleteOrChangeFolderRules = () => {
    return [
      check("data.target.userId")
        .not()
        .isEmpty()
        .withMessage("UserId is Empty")
        .trim(),
      check("data.target.date")
        .not()
        .isEmpty()
        .withMessage("Date is Empty")
        .trim(),
      check("data.target.name")
        .not()
        .isEmpty()
        .withMessage("Name is Empty")
        .trim(),
      check("data.target._id")
        .not()
        .isEmpty()
        .withMessage("_ID is Empty")
        .trim(),
    ]
  }

  static addFolderRules = () => {
    return [
      check("data.userId")
        .not()
        .isEmpty()
        .withMessage("UserId is Empty")
        .trim(),
      check("data.date").not().isEmpty().withMessage("Date is Empty").trim(),
      check("data.name").not().isEmpty().withMessage("Name is Empty").trim(),
    ]
  }
  static linkSequenceRules = () => {
    return [
      check("data.userId")
        .not()
        .isEmpty()
        .withMessage("UserId is Empty")
        .trim(),
      check("data.links").isArray(),
    ]
  }
  static getAll = () => {
    return [
      check("data.userId")
        .not()
        .isEmpty()
        .withMessage("UserId is Empty")
        .trim(),
    ]
  }

  static addOrRemoveLinkToFromFolder = () => {
    return [
      check("data.link").not().isEmpty().withMessage("Link is Empty").trim(),
      check("data.folder")
        .not()
        .isEmpty()
        .withMessage("Folder is Empty")
        .trim(),
    ]
  }
}

export default BookmarkRules
