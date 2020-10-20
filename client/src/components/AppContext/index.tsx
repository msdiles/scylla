import React, { createContext, ReactNode } from "react"
import useCheckNode from "@/hooks/useCheckNode"

interface IProps {
  children: ReactNode
}

interface IContext {
  checkNode: (ref: HTMLElement | null) => boolean
}

export const AppContext = createContext({} as IContext)

const AppContextProvide = ({ children }: IProps) => {
  const { checkNode } = useCheckNode()

  return (
    <AppContext.Provider value={{ checkNode }}>{children}</AppContext.Provider>
  )
}

export default AppContextProvide
