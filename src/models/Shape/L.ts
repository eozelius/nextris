import Shape from '@/models/Shape'
import { shapeCoorType } from '@/models/Shape/types'

class LShape extends Shape {
  type: string = 'L'
  static coordinates: shapeCoorType = [
    [1, 0, 0],
    [1, 1, 1]
  ]

  constructor () {
    super(LShape.coordinates)
  }
}

export default LShape