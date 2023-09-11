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
  const {x, y} = moveToCoordinates

  console.log('    <<<< COLLISION DETCTECTION >>>> ')
  for (let i = 0; i < shapeHeight; i++) {
    for (let j = 0; j < currentShape.coordinates[i].length; j++) {
      if (currentShape.coordinates[i][j] === 1) {
        console.log(`[ doesNotCollide ] => { x: ${x}, y: ${y} }, { i: ${i}, j: ${j} }; = { (x + i): ${x + i}, (y + j): ${y + j} }`)

        // might want to double check that y is within grid bounds.  Technically, this function is
        // dependent on isWithinBounds() passing before running this function.  Not ideal.
        // console.log(`moveToCoor: { x: ${x}, y: ${y} }`)
        const cellToCheck = grid[x + i][y + j]

        if (cellToCheck !== null && cellToCheck?.id !== currentShape.id) {
          // console.warn('[doesNotCollide()] COLLISION DOWN detected!!!!!!')
          // alert(1)
          return false
        }
      } else {
        console.log(`{ i: ${i}, j: ${j} } is negitive space`)
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
