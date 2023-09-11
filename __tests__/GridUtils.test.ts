import { Direction, gridType } from '@/models/Grid'
import { doesNotCollide, getShapeHeight } from '@/models/Grid/utils'
import Square from '@/models/Shape/Square'
import LeftL from '@/models/Shape/LeftL'
import LeftZ from '@/models/Shape/LeftZ'
import RightZ from '@/models/Shape/RightZ'

describe('Grid utils', () => {
  describe('collision detection with other shapes', () => {
    it('[positive] returns "true" when a DOWN collision is NOT detected', () => {
      const existingSq = new Square()
      const currentShape = new Square()
      const direction = Direction.DOWN
      const testGrid: gridType = [
        [null, null],
        [null, null],
        [existingSq, existingSq],
        [existingSq, existingSq],
      ]
      const moveToCoordinates = { x: 0, y: 0 }
      const shapeHeight = getShapeHeight(currentShape)

      const response = doesNotCollide({
        currentShape,
        direction,
        grid: testGrid,
        moveToCoordinates,
        shapeHeight
      })

      expect(response).toEqual(true)
    })

    it('[negitive] returns "false" when a DOWN collision IS detected', () => {
      const existingSq = new Square()
      const currentShape = new Square()
      const direction = Direction.DOWN
      const testGrid: gridType = [
        [null, null],
        [existingSq, existingSq],
        [existingSq, existingSq],
      ]
      const moveToCoordinates = { x: 0, y: 0 }
      const shapeHeight = getShapeHeight(currentShape)

      const response = doesNotCollide({
        currentShape,
        direction,
        grid: testGrid,
        moveToCoordinates,
        shapeHeight
      })

      expect(response).toEqual(false)
    })

    it('[positive] returns "true" when a DOWN collision is NOT detected', () => {
      const LLLL = new LeftL()
      const currentShape = new LeftZ()
      const direction = Direction.DOWN
      const testGrid: gridType = [
        // Current State         Attempting to place - valid
        [null, null, null],   // [****, ****, null]
        [LLLL, null, null],   // [LLLL, ****, ****]
        [LLLL, LLLL, LLLL]    // [LLLL, LLLL, LLLL]
      ]
      const moveToCoordinates = { x: 0, y: 0 }
      const shapeHeight = getShapeHeight(currentShape)

      const response = doesNotCollide({
        currentShape,
        direction,
        grid: testGrid,
        moveToCoordinates,
        shapeHeight
      })

      expect(response).toEqual(true)
    })

    it('[negitive] returns "false" when a DOWN collision from the TOP row IS detected.', () => {
      const SSSS = new Square() // existing square
      const currentShape = new RightZ()
      const direction = Direction.DOWN
      const moveToCoordinates = { x: 1, y: 0 }
      const shapeHeight = getShapeHeight(currentShape)
      const testGrid: gridType = [
        // Current State             Attempting to place
        [null, null, null, null], // [null, null, null, null]
        [null, null, SSSS, SSSS], // [null, ****, S*S*, SSSS]  // 3rd col is not legal
        [null, null, SSSS, SSSS]  // [****, ****, SSSS, SSSS] 
      ]

      const response = doesNotCollide({
        currentShape,
        direction,
        grid: testGrid,
        moveToCoordinates,
        shapeHeight
      })

      expect(response).toEqual(false)
    })
  })
})
  