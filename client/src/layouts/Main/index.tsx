import React, { ReactNode } from "react"
import Navbar from "@/components/Navbar"

interface IProps {
  children: ReactNode
}

const MainLayout = ({ children }: IProps) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  )
}

export default MainLayout
