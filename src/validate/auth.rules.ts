import { check } from "express-validator"

export class AuthRules {
  static emailRules = () => {
    return [
      check("data.email")
        .not()
        .isEmpty()
        .withMessage("Email is empty")
        .isEmail()
        .normalizeEmail()
        .withMessage("Email is invalid")
        .isLength({ min: 5 })
        .withMessage("Length less than 5 characters")
        .isLength({ max: 128 })
        .withMessage("Length more than 128 characters")
        .trim(),
    ]
  }

  static signupRules = () => {
    return [
      check("data.email")
        .not()
        .isEmpty()
        .withMessage("Email is empty")
        .isEmail()
        .normalizeEmail()
        .withMessage("Email is invalid")
        .isLength({ min: 5 })
        .withMessage("Length less than 5 characters")
        .isLength({ max: 128 })
        .withMessage("Length more than 128 characters")
        .trim(),
      check("data.username")
        .not()
        .isEmpty()
        .withMessage("Username is empty")
        .isLength({ min: 6, max: 128 })
        .withMessage("Length less than 3 characters or more then 128")
        .trim(),
      check("data.password")
        .not()
        .isEmpty()
        .withMessage("Password is empty")
        .isLength({ min: 8, max: 128 })
        .withMessage("Length less than 6 characters or more then 128")
        .trim(),
    ]
  }

  static signinRules = () => {
    return [
      check("data.email")
        .not()
        .isEmpty()
        .withMessage("Email is empty")
        .isEmail()
        .normalizeEmail()
        .withMessage("Email is invalid")
        .isLength({ min: 5 })
        .withMessage("Length less than 5 characters")
        .isLength({ max: 128 })
        .withMessage("Length more than 128 characters")
        .trim(),
      check("data.fingerprint")
        .not()
        .isEmpty()
        .withMessage("fingerprint is empty")
        .isLength({ min: 1, max: 128 })
        .withMessage("Length less than 3 characters or more then 128")
        .trim(),
      check("data.password")
        .not()
        .isEmpty()
        .withMessage("Password is empty")
        .isLength({ min: 1, max: 128 })
        .withMessage("Length less than 6 characters or more then 128")
        .trim(),
    ]
  }

  static logoutRules = () => {
    return [
      check("data.token")
        .not()
        .isEmpty()
        .withMessage("token is empty")
        .isLength({ min: 6, max: 1280 })
        .withMessage("Length less than 3 characters or more then 1280")
        .trim(),
    ]
  }

  static refreshRules = () => {
    return [
      check("data.token")
        .not()
        .isEmpty()
        .withMessage("token is empty")
        .isLength({ min: 6, max: 1280 })
        .withMessage("Length less than 6 characters or more then 1280")
        .trim(),
      check("data.fingerprint")
        .not()
        .isEmpty()
        .withMessage("fingerprint is empty")
        .isLength({ min: 6, max: 1280 })
        .withMessage("Length less than 6 characters or more then 1280")
        .trim(),
    ]
  }

  static resetCheckRules = () => {
    return [
      check("data.resetDate")
        .not()
        .isEmpty()
        .withMessage("resetDate is empty")
        .isLength({ min: 6, max: 1280 })
        .withMessage("Length less than 6 characters or more then 1280")
        .trim(),
      check("data.resetId")
        .not()
        .isEmpty()
        .withMessage("resetId is empty")
        .isLength({ min: 6, max: 1280 })
        .withMessage("Length less than 6 characters or more then 1280")
        .trim(),
    ]
  }

  static resetPasswordRules = () => {
    return [
      check("data.resetDate")
        .not()
        .isEmpty()
        .withMessage("resetDate is empty")
        .isLength({ min: 6, max: 1280 })
        .withMessage("Length less than 6 characters or more then 1280")
        .trim(),
      check("data.resetId")
        .not()
        .isEmpty()
        .withMessage("resetId is empty")
        .isLength({ min: 6, max: 1280 })
        .withMessage("Length less than 6 characters or more then 1280")
        .trim(),
      check("data.password")
        .not()
        .isEmpty()
        .withMessage("Password is empty")
        .isLength({ min: 8, max: 128 })
        .withMessage("Length less than 6 characters or more then 128")
        .trim(),
    ]
  }
}

export default AuthRules
