import Shape from '@/models/Shape'
import { shapeCoorType } from '@/models/Shape/types'

class LineShape extends Shape {
  type: string = 'Line'
  static coordinates: shapeCoorType = [
    [1],
    [1],
    [1],
    [1]
  ]

  constructor () {
    super(LineShape.coordinates)
  }
}

export default LineShape
