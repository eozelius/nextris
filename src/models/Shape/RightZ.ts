import Shape from '@/models/Shape'
import { Color, ShapesEnum, shapeCoorType } from '@/models/Shape/types'

class RightZShape extends Shape {
  type: ShapesEnum = ShapesEnum.RightZ
  color: Color = Color.YELLOW
  static coordinates: shapeCoorType = [
    [0, 1, 1],
    [1, 1, 0]
  ]

  constructor () {
    super(RightZShape.coordinates)
  }
}

export default RightZShape
