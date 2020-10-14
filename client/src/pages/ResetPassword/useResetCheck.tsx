import React, { useState } from "react"

import { useDispatch } from "react-redux"
import { setError } from "@/state/actions/app.actions"
import http from "@/http/http"

const useCheckLink = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const checkLink = async ({
    resetDate,
    resetId,
  }: {
    resetDate: string
    resetId: string
  }) => {
    try {
      setLoading(true)
      const response = await http("/auth/reset/check", "POST", {
        resetDate,
        resetId,
      })
      if (response.status === 403) return false
      if (response.status > 200 && response.status !== 403)
        throw new Error("Something went wrong")
      const result = await response.json()
      console.log(result)
      return result.success
    } catch (e) {
      dispatch(setError(e))
    } finally {
      setLoading(false)
    }
  }

  return { checkLoading: loading, checkLink }
}

export default useCheckLink
