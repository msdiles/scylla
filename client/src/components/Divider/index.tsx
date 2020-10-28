import React from "react"
import "./divider.scss"

interface IProps {
  setDividerPosition: (a: number) => void
}

const Divider = ({ setDividerPosition }: IProps) => {
  const omMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    target.style.position = "absolute"
    target.style.left = e.clientX + "px"
    target.ondragstart = null
    document.onmousemove = (event) => {
      setDividerPosition(event.clientX)
      target.style.left = event.clientX + "px"
      target.onmouseup = () => {
        document.onmousemove = null
        target.onmouseup = null
      }
    }
  }

  return <div className="home-divider" onMouseDown={omMouseDown}></div>
}

export default Divider
