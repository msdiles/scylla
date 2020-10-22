import React, { useEffect, useState } from "react"
import { Label } from "semantic-ui-react"
import Popup from "semantic-ui-react/dist/commonjs/modules/Popup"
import { Color } from "@/types/types"
import colors from "@/utils/colors"
import { ILink } from "@/types/interfaces"

interface IProps {
  link: ILink
  expand: boolean
  changeColor: (newColor: Color) => void
}

const URLNameLabel = ({ expand, link, changeColor }: IProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  useEffect(() => {
    if (!expand) {
      setIsPopupOpen(false)
    }
  })

  const setColor = (color: Color) => {
    changeColor(color)
    setIsPopupOpen(false)
  }
  return (
    <Popup
      trigger={
        <Label
          className={expand ? "link__name link__name_opened" : "link__name"}
          color={link.color}
        >
          {link.name}
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
