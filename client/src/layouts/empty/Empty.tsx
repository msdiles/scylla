import React from "react"
import "./empty.scss"

const EmptyLayout: React.FC = ({ children }) => {
  return (
    <div className="empty-layout">
      <div>{children}</div>
    </div>
  )
}

export default EmptyLayout
