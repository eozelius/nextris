import { Direction, coorTuple, gridType } from "."
import { ShapeType } from "@/models/Shape/types"

/**
 * @description - determine if the move would be in grid bounds
 * @returns [Boolean] - whether or not the move would be within grid bounds
 */
export const isWithinBounds = ({
  shapeWidth,
  shapeHeight,
  gridWidth,
  gridLength,
  moveToCoordinates
}: {
  shapeWidth: number,
  shapeHeight: number,
  gridWidth: number,
  gridLength: number,
  moveToCoordinates: coorTuple
}): boolean => {
  // OB LEFT
  if (moveToCoordinates.y < 0) {
    return false
  }

  // OB RIGHT
  if (moveToCoordinates.y + shapeWidth > gridWidth) {
    return false
  }

  // OB DOWN
  if (moveToCoordinates.x + shapeHeight > gridLength) {
    return false
  }

  return true
}

/**
 * @description - determine if the move does not collide with another existing shape
 * @returns [Boolean] - whether the move is legal, i.e. does not collide with another shape
 */
export const doesNotCollide = ({
  currentShape,
  direction,
  grid,
  moveToCoordinates,
  shapeHeight
}: {
  currentShape: ShapeType,
  direction: Direction,
  grid: gridType,
  moveToCoordinates: coorTuple,
  shapeHeight: number
}): boolean => {

  // const shapeLength = getShapeLength(currentShape)

  // console.log('currentShape => ', currentShape)
  // console.log('direction => ', direction)
  // console.log('grid => ', grid)
  // console.log('[doesNotCollide] moveToCoordinates => ', moveToCoordinates)

  // Collision DOWN
  if (direction === Direction.DOWN) {
    // const lastRow = currentShape.coordinates[currentShape.coordinates.length - 1]
    const {x, y} = moveToCoordinates

    console.log('    <<<< COLLISION DETCTECTION >>>> => ')
    // initialize i at 1, because we need  to check the row directly below, i.e. x + 1
    for (let i = 0; i < shapeHeight; i++) {

      console.log('i => ', i)
      // console.log('currentShape.coordinates[i] => ', currentShape.coordinates[i])
      
      for (let j = 0; j < currentShape.coordinates[i].length; j++) {
        if (currentShape.coordinates[i][j] === 1) {
          console.log(`[ doesNotCollide ] => { x: ${x}, y: ${y} }, { i: ${i}, j: ${j} }; = { (x + i): ${x + i}, (y + j): ${y + j} }`)

          const cellToCheck = grid[x + i][y + j]


          // if it is the last row, then do x + shapeHeight + 1.
          // if it is not the last row, then do + 1

          console.log(`[ doesNotCollide ] cellToCheck => ${cellToCheck}`)



          // console.log(`[doesNotCollide()] j: ${j}; lastRow[${j}]: ${lastRow[j]}`)

          // might want to double check that y is within grid bounds.  Technically, this function is
          // dependent on isWithinBounds() passing before running this function.  Not ideal.
          // console.log(`moveToCoor: { x: ${x}, y: ${y} }`)

          // const xPlusShapeHeight = x + shapeHeight - 1
          // const cellToCheck = grid[xPlusShapeHeight][y + j]
          // console.log(`[doesNotCollide()] moveToCoordinates { x: ${x}, y: ${y} };  checking: { x: ${xPlusShapeHeight}, y: ${y + j} }`)
          // console.log('[doesNotCollide()] cellToCheck => ', cellToCheck)

          if (cellToCheck !== null && cellToCheck?.id !== currentShape.id) {
            // console.log('[doesNotCollide()] COLLISION detected!!!!!!')
            // alert(1)
            return false
          }
        } else {
          console.log(`{ i: ${i}, j: ${j} } is negitive space`)
        }
      }
    }
  }
  return true
}

/**
 * @description - iterate through a shape's coordinates and find/return the length of the longest row
 * @returns [Int] - 1 based number representing the length of the shape's widest row.
 */
export function getShapeLength (shape: ShapeType) {
  const shapeRows = shape.coordinates.map((r) => r.length)
  return Math.max(...(shapeRows))
}

/**
 * @description - determine a shapes height
 * @returns [Int] - 1 based number representing the height of the shape's tallest column.
 */
export function getShapeHeight (shape: ShapeType) {
  return shape.coordinates.length
}
