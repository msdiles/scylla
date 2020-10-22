import { Color } from "../types/types"
import random from "./rangom"
const colors: Color[] = [
  "red",
  "orange",
  "yellow",
  "olive",
  "green",
  "teal",
  "blue",
  "violet",
  "purple",
  "pink",
  "brown",
  "grey",
  "black",
]

export function getRandomColor() {
  return colors[random(0, colors.length - 1)]
}

export default colors
