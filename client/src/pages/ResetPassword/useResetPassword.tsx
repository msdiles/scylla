import React, { useState } from "react"

import { useDispatch } from "react-redux"
import { setError } from "@/state/actions/app.actions"
import http from "@/http/http"

const userResetPassword = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const resetPassword = async ({
    resetDate,
    resetId,
    password,
  }: {
    resetDate: string
    resetId: string
    password: string
  }) => {
    try {
      setLoading(true)
      const response = await http("/auth/reset/password", "POST", {
        resetDate,
        resetId,
        password,
      })
      if (response.status > 200) throw new Error("Something went wrong")
      const result = await response.json()
      return result.success
    } catch (e) {
      dispatch(setError(e))
    } finally {
      setLoading(false)
    }
  }

  return { passwordLoading: loading, resetPassword }
}

export default userResetPassword
