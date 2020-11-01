import React, { createContext, ReactNode } from "react"
import useCheckNode from "@/hooks/useCheckNode"
import useExpandSearch from "@/hooks/useExpandSearch"

interface IProps {
  children: ReactNode
}

interface IContext {
  checkNode: (ref: HTMLElement | null) => boolean
  expand: (target: "link" | "folder", id: string) => void
  expandLink: string
  expandFolder: string
}

export const AppContext = createContext({} as IContext)

const AppContextProvide = ({ children }: IProps) => {
  const { checkNode } = useCheckNode()
  const { expand, expandLink, expandFolder } = useExpandSearch()
  return (
    <AppContext.Provider
      value={{ checkNode, expand, expandLink, expandFolder }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvide
