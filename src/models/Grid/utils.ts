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
  if (direction === Direction.DOWN) {
    const lastRow = currentShape.coordinates[currentShape.coordinates.length - 1]

    for (let j = 0; j < lastRow.length; j++) {
      if (lastRow[j] === 1) {
        const {x, y} = moveToCoordinates
        // might want to double check that y is within grid bounds.  Technically, this function is
        // dependent on isWithinBounds() passing before running this function.  Not ideal.
        // console.log(`moveToCoor: { x: ${x}, y: ${y} }`)

        const xPlusShapeHeight = x + shapeHeight - 1
        const cellToCheck = grid[xPlusShapeHeight][y]

        if (cellToCheck !== null && cellToCheck?.id !== currentShape.id) {
          return false
        }
      }
    }
  }
  return true
}
