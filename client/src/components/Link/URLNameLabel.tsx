import React, { useEffect, useState } from "react"
import { Label } from "semantic-ui-react"
import Popup from "semantic-ui-react/dist/commonjs/modules/Popup"
import { color } from "@/types/types"
import colors from "@/utils/colors"

interface IProps {
  expand: boolean
  color: color
  name: string
  changeColor: (newColor: color) => void
}

const URLNameLabel = ({ expand, color, name, changeColor }: IProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  useEffect(() => {
    if (!expand) {
      setIsPopupOpen(false)
    }
  })

  const setColor = (color: color) => {
    changeColor(color)
    setIsPopupOpen(false)
  }
  return (
    <Popup
      trigger={
        <Label
          className={expand ? "link__name link__name_opened" : "link__name"}
          color={color}
        >
          {name}
        </Label>
      }
      content={
        <div className="link__color-picker">
          {colors.map((c) => (
            <Label
              onClick={() => setColor(c)}
              circular
              color={c}
              empty
              key={c}
              className="link__color-item"
            />
          ))}
        </div>
      }
      on={"click"}
      onOpen={() => setIsPopupOpen(true)}
      onClose={() => setIsPopupOpen(false)}
      position={"top center"}
      open={isPopupOpen}
    />
  )
}

export default URLNameLabel
