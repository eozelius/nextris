import Shape from '@/models/Shape'
import { Color, ShapesEnum, shapeCoorType } from '@/models/Shape/types'

class Pyramid extends Shape {
  type: ShapesEnum = ShapesEnum.Pyramid
  color: Color = Color.PINK
  static coordinates: shapeCoorType = [
    [0, 1],
    [1, 1, 1]
  ]

  constructor () {
    super(Pyramid.coordinates)
  }
}

export default Pyramid
