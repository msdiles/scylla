import { HTTPException } from "../interfaces/HTTPExtensions"
import { Response, Request, NextFunction } from "express"
import { IError } from "../interfaces"

export function errorMiddleware(
  error: IError | HTTPException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = error.status || 500
  const message = !(error instanceof HTTPException)
    ? "Something went wrong"
    : error.message || "Something went wrong"
  const serverMessage = error.message || "Something went wrong"
  const errors = error.errors
  console.error({ status, serverMessage, errors })

  res.status(status).send({ status, message })
}
