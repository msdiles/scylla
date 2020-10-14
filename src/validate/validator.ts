import { IErrors } from "../interfaces"

import { Response, Request, NextFunction } from "express"
import { validationResult } from "express-validator"
import { HTTPException } from "../interfaces/HTTPExtensions"

class Validator {
  static validate = (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req)
      if (errors.isEmpty()) {
        return next()
      }

      const extractedErrors: IErrors[] = []
      errors
        .array()
        .map((err) => extractedErrors.push({ [err.param]: err.msg }))
      throw new HTTPException(422, "Invalid format", extractedErrors)
    } catch (e) {
      next(e)
    }
  }
}

export default Validator
