import Shape from '@/models/Shape'
import { shapeCoorType } from '@/models/Shape/types'

class RightZShape extends Shape {
  type: string = 'RightZ'
  static coordinates: shapeCoorType = [
    [0, 1, 1],
    [1, 1]
  ]

  constructor () {
    super(RightZShape.coordinates)
  }
}

export default RightZShape
