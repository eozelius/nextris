import LeftL from '@/models/Shape/LeftL'
import RightL from '@/models/Shape/RightL'
import Line from '@/models/Shape/Line'
import LeftZ from '@/models/Shape/LeftZ'
import RightZ from '@/models/Shape/RightZ'
import Square from '@/models/Shape/Square'
import Pyramid from '@/models/Shape/Pyramid'
import { ShapeType, ShapesEnum, shapeCoorType } from '@/models/Shape/types'

type randomShapeMapType = {
  [key: number]:
    typeof Line |
    typeof RightL |
    typeof LeftL |
    typeof RightZ |
    typeof LeftZ |
    typeof Pyramid |
    typeof Square
}

export const generateRandomShape = (): ShapeType => {
  const numberToShapeMap: randomShapeMapType = {
    0: Line,
    1: LeftL,
    2: RightL,
    3: LeftZ,
    4: RightZ,
    5: Pyramid,
    6: Square
  }

  const n = Math.floor(Math.random() * 7)
  const randomShape = numberToShapeMap[n]
  const instantiatedRandomShape = new randomShape()
  return instantiatedRandomShape
}

export const rotate90Degrees = (shape: ShapeType): shapeCoorType => {
  if (!shape) {
    throw new Error('[rotate90Degress()] invalid shape! => ', shape)
  }
  // square
  if (shape.type === ShapesEnum.Square) {
    return shape.coordinates
  }

  // all other shapes
  const newShapeCoordinates: shapeCoorType = []
  for (let j = 0; j < shape.coordinates[0].length; j++) {
    const newZRow = []
    for (let i = shape.coordinates.length - 1; i >= 0; i--) {
      // console.log(`{ i: ${i}, j: ${j} } => `, shape.coordinates[i][j])
      
      newZRow.push(shape.coordinates[i][j])
    }

    newShapeCoordinates.push(newZRow)
  }

  return newShapeCoordinates
}