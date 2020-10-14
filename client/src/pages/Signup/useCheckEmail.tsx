import React, { useCallback, useState } from "react"
import http from "../../http/http"
import { setError } from "@/state/actions/app.actions"
import { useDispatch } from "react-redux"

const useCheckEmail = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const checkEmail = useCallback(async (email: string) => {
    try {
      setLoading(true)
      const response = await http("/auth/email-check", "POST", {
        email,
      })
      if (response.status > 200) throw new Error("Something went wrong")
      const result = await response.json()
      return !result.isUserExist
    } catch (e) {
      dispatch(setError(e))
    } finally {
      setLoading(false)
    }
  }, [])

  return { emailLoading: loading, checkEmail }
}

export default useCheckEmail
