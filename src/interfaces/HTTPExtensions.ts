import { IErrors } from "./index"

export class HTTPException extends Error {
  public status: number
  public message: string
  public errors?: [any] | IErrors[]
  constructor(status: number, message: string, errors?: [any] | IErrors[]) {
    super(message)
    this.message = message
    this.status = status
    this.errors = errors
  }
}
