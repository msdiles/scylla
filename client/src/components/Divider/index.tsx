import React, { useEffect, useState } from "react"
import "./divider.scss"

interface IProps {
  setDividerPosition: (a: number) => void
}

const Divider = ({ setDividerPosition }: IProps) => {
  const [position, setPosition] = useState(0)

  const omMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    target.style.position = "absolute"
    target.style.left = e.clientX + "px"
    target.ondragstart = null
    document.onmousemove = (event) => {
      if (event.clientX > 600 && event.clientX < 1200) {
        setPosition(event.clientX)
        target.style.left = event.clientX + "px"
      }
      document.onmouseup = () => {
        document.onmousemove = null
        target.onmouseup = null
      }
    }
  }

  useEffect(() => {
    setDividerPosition(position)
  }, [position])

  return <div className="home-divider" onMouseDown={omMouseDown}></div>
}

export default Divider
