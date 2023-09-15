import Shape from '@/models/Shape'
import { Color, shapeCoorType, ShapesEnum } from '@/models/Shape/types'

class LeftZShape extends Shape {
  type: ShapesEnum = ShapesEnum.LeftZ
  color: Color = Color.RED
  static coordinates: shapeCoorType = [
    [1, 1, 0],
    [0, 1, 1]
  ]

  constructor () {
    super(LeftZShape.coordinates)
  }
}

export default LeftZShape