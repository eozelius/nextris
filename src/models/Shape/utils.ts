import LShape from '@/models/Shape/L'
import LineShape from '@/models/Shape/Line'
import LeftZ from '@/models/Shape/LeftZ'
import RightZ from '@/models/Shape/RightZ'
import { ShapeType } from '@/models/Shape/types'

export const generateRandomShape = (): ShapeType => {
  const numberToShapeMap: { [key: number]: typeof LShape | typeof LineShape } = {
    0: LShape,
    1: LineShape,
    2: LeftZ,
    3: RightZ
  }

  const n = Math.floor(Math.random() * 1)
  const randomShape = numberToShapeMap[n]
  const instantiatedRandomShape = new randomShape()
  return instantiatedRandomShape
}