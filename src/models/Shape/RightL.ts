import Shape from '@/models/Shape'
import { Color, ShapesEnum, shapeCoorType } from '@/models/Shape/types'

class RightL extends Shape {
  type: ShapesEnum = ShapesEnum.RightL
  color: Color = Color.GREEN
  static coordinates: shapeCoorType = [
    [1, 1, 1],
    [1, 0, 0]
  ]

  constructor () {
    super(RightL.coordinates)
  }
}

export default RightL
