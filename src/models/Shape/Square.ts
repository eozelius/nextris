import Shape from '@/models/Shape'
import { Color, ShapesEnum, shapeCoorType } from '@/models/Shape/types'

class Square extends Shape {
  type: ShapesEnum = ShapesEnum.Square
  color: Color = Color.TEAL
  static coordinates: shapeCoorType = [
    [1, 1],
    [1, 1]
  ]

  constructor () {
    super(Square.coordinates)
  }
}

export default Square
