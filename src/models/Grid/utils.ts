import { coorTuple } from "."

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
  // console.log('[ GridClass ] isWithinBoudns() gridLength => ', gridLength)
  // console.log('[ GridClass ] isWithinBoudns() shapeWidth => ', width)
  // console.log('[ GridClass ] isWithinBoudns() currentCoordinates => ', currentCoordinates)
  // console.log('[ GridClass ] isWithinBoudns() moveToCoordinates => ', moveToCoordinates)
  
  // const gridWidth = this.grid[0].length
  // console.log('[ GridClass ] isWithinBoudns() this.grid.length => ', JSON.stringify(gridWidth ,null,4))

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