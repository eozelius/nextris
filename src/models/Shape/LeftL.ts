import Shape from '@/models/Shape'
import { Color, shapeCoorType, ShapesEnum } from '@/models/Shape/types'

class LeftL extends Shape {
  type: ShapesEnum = ShapesEnum.LeftL
  color: Color = Color.BLUE
  static coordinates: shapeCoorType = [
    [1, 0, 0],
    [1, 1, 1]
  ]

  constructor () {
    super(LeftL.coordinates)
  }
}

export default LeftL
