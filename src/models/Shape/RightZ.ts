import Shape, { shapeCoorType } from '@/models/Shape'

class RightZShape extends Shape {
  static coordinates: shapeCoorType = [
    [0, 1, 1],
    [1, 1, 0]
  ]

  constructor () {
    super(RightZShape.coordinates)
  }
}

export default RightZShape
