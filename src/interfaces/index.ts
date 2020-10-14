export interface IErrors {
  [key: string]: string
}

export interface IError {
  status?: number
  message?: string
  errors?: [string]
}
