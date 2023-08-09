import Shape from '@/models/Shape'
import { shapeCoorType } from '@/models/Shape/types'

class LeftZShape extends Shape {
  type: string = 'LeftZ'
  static coordinates: shapeCoorType = [
    [1, 1],
    [0, 1, 1]
  ]

  constructor () {
    super(LeftZShape.coordinates)
  }
}

export default LeftZShape