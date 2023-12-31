import Shape from '@/models/Shape'
import { Color, ShapesEnum, shapeCoorType } from '@/models/Shape/types'

class Line extends Shape {
  type: ShapesEnum = ShapesEnum.Line
  color: Color = Color.PURPLE
  static coordinates: shapeCoorType = [
    [1],
    [1],
    [1],
    [1]
  ]

  constructor () {
    super(Line.coordinates)
  }
}

export default Line
