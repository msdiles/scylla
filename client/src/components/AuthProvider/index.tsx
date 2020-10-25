import React, { ReactNode, useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { AuthAccess } from "@/types/enums"
import { RootState } from "@/state/reducers"
import PageLoader from "@/components/PageLoader"

interface IProps {
  children: ReactNode
  access: AuthAccess
}

const AuthProvider = ({ children, access, ...props }: IProps) => {
  const history = useHistory()
  const { isLogged, loading, started } = useSelector(
    (state: RootState) => state.auth
  )

  useEffect(() => {
    if (!loading || started) {
      if (access === AuthAccess.OnlyUnAuth && isLogged) history.goBack()
      if (access === AuthAccess.OnlyAuth && !isLogged) history.push("/login")
    }
  }, [loading])

  if (loading || !started) {
    return <PageLoader loading={loading} inverted={true} />
  }
  if (access === AuthAccess.OnlyUnAuth && isLogged) {
    return <PageLoader loading={loading} inverted={true} />
  }
  if (access === AuthAccess.OnlyAuth && !isLogged) {
    return <PageLoader loading={loading} inverted={true} />
  }
  return <>{children}</>
}

export default AuthProvider
