import Shape, { shapeCoorType } from '@/models/Shape'

class LineShape extends Shape {
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
