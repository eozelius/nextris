import { Direction, gridType } from '@/models/Grid'
import { doesNotCollide, getShapeHeight, isALineCompleted } from '@/models/Grid/utils'
import Square from '@/models/Shape/Square'
import LeftL from '@/models/Shape/LeftL'
import LeftZ from '@/models/Shape/LeftZ'
import RightZ from '@/models/Shape/RightZ'
import Pyramid from '@/models/Shape/Pyramid'

describe('Grid utils', () => {
  describe('function downNotCollide() collision detection Direction.DOWN', () => {
    it('[positive] returns "true" when a DOWN collision is NOT detected', () => {
      const existingSq = new Square()
      const currentShape = new Square()
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
        grid: testGrid,
        moveToCoordinates,
        shapeHeight
      })

      expect(response).toEqual(true)
    })

    it('[negitive] returns "false" when a DOWN collision IS detected', () => {
      const existingSq = new Square()
      const currentShape = new Square()
      const testGrid: gridType = [
        [null, null],
        [existingSq, existingSq],
        [existingSq, existingSq],
      ]
      const moveToCoordinates = { x: 0, y: 0 }
      const shapeHeight = getShapeHeight(currentShape)

      const response = doesNotCollide({
        currentShape,
        grid: testGrid,
        moveToCoordinates,
        shapeHeight
      })

      expect(response).toEqual(false)
    })

    it('[positive] returns "true" when a DOWN collision is NOT detected', () => {
      const LLLL = new LeftL()
      const currentShape = new LeftZ()
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
        grid: testGrid,
        moveToCoordinates,
        shapeHeight
      })

      expect(response).toEqual(true)
    })

    it('[negitive] returns "false" when a DOWN collision from the TOP row IS detected.', () => {
      const SSSS = new Square() // existing square
      const currentShape = new RightZ()
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
        grid: testGrid,
        moveToCoordinates,
        shapeHeight
      })

      expect(response).toEqual(false)
    })

    it('[positive] returns "true when a DOWN collision from a pyramid shape IS detected', () => {
      const LLLL = new LeftL()
      const RZRZ = new RightZ()
      const PYPY = new Pyramid()

      const currentShape = new Pyramid()
      const direction = Direction.DOWN
      const moveToCoordinates = { x: 3, y: 3 }
      const shapeHeight = getShapeHeight(currentShape)

      const testGrid: gridType = [
        // Current State                              Attempting to place
        [null, null, null, null, null, null, null],  // [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],  // [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],  // [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],  // [null, null, null, ^^^^, ****, null, null],
        [null, null, PYPY, null, null, null, null],  // [null, null, PYPY, ****, ****, ****, null],
        [LLLL, PYPY, PYPY, PYPY, RZRZ, RZRZ, null],  // [LLLL, PYPY, PYPY, PYPY, RZRZ, RZRZ, null],
        [LLLL, LLLL, LLLL, RZRZ, RZRZ, null, null],  // [LLLL, LLLL, LLLL, RZRZ, RZRZ, null, null],
      ]

      const response = doesNotCollide({
        currentShape,
        grid: testGrid,
        moveToCoordinates,
        shapeHeight
      })

      expect(response).toEqual(true)
    })

    it('[negitive] returns "true when a DOWN collision from a pyramid shape IS detected', () => {
      const LLLL = new LeftL()
      const RZRZ = new RightZ()
      const PYPY = new Pyramid()

      const currentShape = new Pyramid()
      const direction = Direction.DOWN
      const moveToCoordinates = { x: 4, y: 3 }
      const shapeHeight = getShapeHeight(currentShape)

      const testGrid: gridType = [
        // Current State                              Attempting to place
        [null, null, null, null, null, null, null],  // [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],  // [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],  // [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],  // [null, null, null, null, null, null, null],
        [null, null, PYPY, null, null, null, null],  // [null, null, PYPY, ^^^^, ****, ****, null],
        [LLLL, PYPY, PYPY, PYPY, RZRZ, RZRZ, null],  // [LLLL, PYPY, PYPY, PY**, RZ**, RZ**, null],
        [LLLL, LLLL, LLLL, RZRZ, RZRZ, null, null],  // [LLLL, LLLL, LLLL, RZRZ, RZRZ, null, null],
      ]

      const response = doesNotCollide({
        currentShape,
        grid: testGrid,
        moveToCoordinates,
        shapeHeight
      })

      expect(response).toEqual(false)
    })
  })

  describe('function downNotCollide() collision detection Direction.LEFT', () => {
    it('[positive] return true when a LEFT collision is NOT detected', async () => {
      const SQSQ = new Square()
      const currentShape = new Square()
      const direction = Direction.LEFT
      const testGrid: gridType = [
        // Current State                     Attempting to place
        [null, null, null, null, null],   // [null, null, null, null, null],
        [null, null, null, null, null],   // [null, null, null, null, null],
        [SQSQ, SQSQ, null, null, null],   // [SQSQ, SQSQ, ^^^^, ****, null],
        [SQSQ, SQSQ, null, null, null],   // [SQSQ, SQSQ, ****, ****, null],
      ]
      const moveToCoordinates = { x: 2, y: 2 }
      const shapeHeight = getShapeHeight(currentShape)

      const response = doesNotCollide({
        currentShape,
        grid: testGrid,
        moveToCoordinates,
        shapeHeight
      })

      expect(response).toEqual(true)
    })

    it('[negitive] return false when a LEFT collision IS detected', async () => {
      const SQSQ = new Square()
      const currentShape = new Square()
      const direction = Direction.LEFT
      const testGrid: gridType = [
        // Current State                     Attempting to place and move left
        [null, null, null, null, null],   // [null, null, null, null, null],
        [null, null, null, null, null],   // [null, null, null, null, null],
        [SQSQ, SQSQ, null, null, null],   // [SQSQ, SQ^^, ^^^^, null, null],
        [SQSQ, SQSQ, null, null, null],   // [SQSQ, SQ**, ****, null, null],
      ]
      const moveToCoordinates = { x: 2, y: 1 }
      const shapeHeight = getShapeHeight(currentShape)

      const response = doesNotCollide({
        currentShape,
        grid: testGrid,
        moveToCoordinates,
        shapeHeight
      })

      expect(response).toEqual(false)
    })
  })

  describe('function downNotCollide() collision detection Direction.RIGHT', () => {
    it('[positive] return true when a LEFT collision is NOT detected', async () => {
      const RZRZ = new RightZ()
      const currentShape = new Square()
      const direction = Direction.LEFT
      const testGrid: gridType = [
        // Current State                     Attempting to place
        [null, null, null, null, null],   // [null, null, null, null, null]
        [null, null, null, null, null],   // [null, null, null, null, null]
        [null, null, null, RZRZ, RZRZ],   // [^^^^, ****, null, RZRZ, RZRZ]
        [null, null, RZRZ, RZRZ, null],   // [****, ****, RZRZ, RZRZ, null]
      ]
      const moveToCoordinates = { x: 2, y: 0 }
      const shapeHeight = getShapeHeight(currentShape)

      const response = doesNotCollide({
        currentShape,
        grid: testGrid,
        moveToCoordinates,
        shapeHeight
      })

      expect(response).toEqual(true)
    })

    it('[negitive] return false when a RIGHT collision IS detected', async () => {
      const RZRZ = new RightZ()
      const currentShape = new Square()
      const direction = Direction.LEFT
      const testGrid: gridType = [
        // Current State                     Attempting to place
        [null, null, null, null, null],   // [null, null, null, null, null]
        [null, null, null, null, null],   // [null, null, null, null, null]
        [null, null, null, RZRZ, RZRZ],   // [null, ^^^^, ****, RZRZ, RZRZ]
        [null, null, RZRZ, RZRZ, null],   // [null, ****, RZ**, RZRZ, null]
      ]
      const moveToCoordinates = { x: 2, y: 1 }
      const shapeHeight = getShapeHeight(currentShape)

      const response = doesNotCollide({
        currentShape,
        grid: testGrid,
        moveToCoordinates,
        shapeHeight
      })

      expect(response).toEqual(false)
    })
  })

  describe('function isALineCompleted()', () => {
    it('[positive] returns true when a row is complete', () => {
      const SQSQ = new Square()
      const PYPY = new Pyramid()

      const grid: gridType = [
        [null, null, null, null, null],
        [null, null, null, null, null],
        [SQSQ, SQSQ, null, PYPY, null],
        [SQSQ, SQSQ, PYPY, PYPY, PYPY], // completed row
      ]

      const response = isALineCompleted(grid)

      expect(response.completed).toEqual(true)
      expect(response.rows).toEqual([3])
    })

    it('[negitive] returns false when a row has NOT been completed', () => {
      const SQSQ = new Square()
      const PYPY = new Pyramid()

      const grid: gridType = [
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [SQSQ, SQSQ, null, null, PYPY, null],
        [SQSQ, SQSQ, null, PYPY, PYPY, PYPY],
      ]

      const response = isALineCompleted(grid)

      expect(response.completed).toEqual(false)
      expect(response.rows).not.toBeDefined()
    })

    it('[positive] returns true when MULTIPE rows have been completed', () => {
      const SQSQ = new Square()
      const PYPY = new Pyramid()
      const LLLL = new LeftL()
      const LZLZ = new LeftZ()

      const grid: gridType = [
        [LLLL, null, LZLZ, LZLZ, null],
        [LLLL, LLLL, LLLL, LZLZ, LZLZ], // completed row
        [SQSQ, SQSQ, null, PYPY, null],
        [SQSQ, SQSQ, PYPY, PYPY, PYPY], // completed row
      ]

      const response = isALineCompleted(grid)

      expect(response.completed).toEqual(true)
      expect(response.rows).toEqual([1, 3])
    })
  })
})
