import React, { ReactNode } from "react"
import { AuthAccess } from "@/types/enums"
import { useSelector } from "react-redux"
import { RootState } from "@/state/reducers"
import PageLoader from "@/components/PageLoader"
import { useHistory } from "react-router-dom"

interface IProps {
  children: ReactNode
  access: AuthAccess
}

const AuthProvider = ({ children, access, ...props }: IProps) => {
  const history = useHistory()

  const { isLogged, loading, started } = useSelector(
    (state: RootState) => state.auth
  )
  if (loading || !started) {
    return <PageLoader loading={loading} inverted={true} />
  }
  if (access === AuthAccess.OnlyUnAuth && isLogged) {
    history.go(-1)
    return <PageLoader loading={loading} inverted={true} />
  }
  if (access === AuthAccess.OnlyAuth && !isLogged) {
    history.push("/login")
    return <PageLoader loading={loading} inverted={true} />
  }
  return <>{children}</>
}

export default AuthProvider
