import React, { useState } from "react"

import { useDispatch } from "react-redux"
import { setError } from "@/state/actions/app.actions"
import http from "@/http/http"

const useSendLink = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const sendLink = async (email: string) => {
    try {
      setLoading(true)
      const response = await http("/auth/reset/get", "POST", email)
      if (response.status > 202) throw new Error("Something went wrong")
      const result = await response.json()
      console.log(result)
      return result.isUserExist
    } catch (e) {
      dispatch(setError(e))
    } finally {
      setLoading(false)
    }
  }

  return { emailLoading: loading, sendLink }
}

export default useSendLink
