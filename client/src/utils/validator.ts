import * as emailCheck from "validator/lib/isEmail"

export const isEmail = (value: string) => emailCheck.default(value)
export const mustHaveUppercase = (value: string) => /[A-Z]/.test(value)
export const mustHaveLowercase = (value: string) => /[a-z]/.test(value)
export const mustHaveDigit = (value: string) => /[\d]/.test(value)
export const mustHaveOnlyLettersAndDigits = (value: string) =>
  !/(?![A-Za-z0-9])./.test(value)
