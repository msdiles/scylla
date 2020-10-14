import React, { useState } from "react"

import { useDispatch } from "react-redux"
import { setError, setMessage } from "@/state/actions/app.actions"
import http from "@/http/http"

const useSignup = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const signup = async (data: any) => {
    try {
      setLoading(true)
      const response = await http("/auth/signup", "POST", data)
      if (response.status > 200) throw new Error("Something went wrong")
      const result = await response.json()
      if (result.success === false) {
        dispatch(setMessage(result.message))
        return false
      } else {
        return true
      }
    } catch (e) {
      dispatch(setError(e))
    } finally {
      setLoading(false)
    }
  }

  return { signupLoading: loading, signup }
}

export default useSignup
