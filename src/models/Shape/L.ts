import Shape, { shapeCoorType } from '@/models/Shape'

class LShape extends Shape {
  static coordinates: shapeCoorType = [
    [1],
    [1, 1, 1]
  ]

  constructor () {
    super(LShape.coordinates)
  }
}

export default LShape