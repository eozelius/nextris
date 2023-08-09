import { Color, shapeCoorType } from "./types"

function randomColor(): Color {
  const numberToColorMap: {
    [key: number]: Color
  } = {
    0: Color.BLUE,
    1: Color.RED,
    2: Color.PURPLE,
    3: Color.PINK,
    4: Color.GREEN
  }

  const n = Math.floor(Math.random() * 5)
  return numberToColorMap[n]
}

class Shape {
  coordinates: shapeCoorType
  color: Color
  id: number

  constructor(coordinates: shapeCoorType) {
    this.coordinates = coordinates
    this.color = randomColor()
    this.id = Math.floor(Math.random() * 999999)
  }
}

export default Shape
