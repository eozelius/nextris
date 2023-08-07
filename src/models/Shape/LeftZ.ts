import Shape, { shapeCoorType } from '@/models/Shape'

class LeftZShape extends Shape {
  static coordinates: shapeCoorType = [
    [1, 1],
    [0, 1, 1]
  ]

  constructor () {
    super(LeftZShape.coordinates)
  }
}

export default LeftZShape