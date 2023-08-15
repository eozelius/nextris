import LeftL from '@/models/Shape/LeftL'
import RightL from '@/models/Shape/RightL'
import Line from '@/models/Shape/Line'
import LeftZ from '@/models/Shape/LeftZ'
import RightZ from '@/models/Shape/RightZ'
import Square from '@/models/Shape/Square'
import Pyramid from '@/models/Shape/Pyramid'
import { ShapeType } from '@/models/Shape/types'

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