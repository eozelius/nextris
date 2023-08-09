import { ShapeType } from "../Shape/types"
import { generateRandomShape } from "../Shape/utils"

export type coorTuple = {
  x: number,
  y: number
}

export enum Direction {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export type gridType = Array<Array<ShapeType | null>>

export default class Grid {
  private grid: gridType
  private currentShape: ShapeType
  private startingCoordinates: coorTuple = { x: 0, y: 4 }
  private currentCoordinates: coorTuple
  
  constructor() {
    /** Initialize Grid.
     * 1. start with 20x10 grid of null
     * 2. get a random shape
     * 3. place the shape at this.startingCoordinate
    */
    this.grid = [
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null]
    ]
    this.currentShape = generateRandomShape()

    const { x, y } = this.startingCoordinates
    this.currentCoordinates = { x, y }
    
    for (let i = 0; i < this.currentShape.coordinates.length; i++){
      const row = this.currentShape.coordinates[i]
      for (let j = 0; j < row.length; j++) {
        // console.log('    >>>> col >>>> ', JSON.stringify(this.grid,null, 4))
        // console.log('[x, y] => ', `[${JSON.stringify(x)}, ${JSON.stringify(y)}]`)
        // console.log('[i, j] => ', `[${JSON.stringify(i)}, ${JSON.stringify(j)}]`)
        // console.log('[coor] => ', `[${JSON.stringify(x + i)}, ${JSON.stringify(y + j)}]`)
        // console.log(`JSON.stringify(currentShape.coordinates[${i}][${j}]) => `, JSON.stringify(this.currentShape.coordinates[i][j], null, 4))

        // a shape can have negitive space
        if (this.currentShape.coordinates[i][j] === 1) {
          this.grid[x + i][y + j] = this.currentShape
        }
      }
    }

    return this
  }

  getCurrentShape () {
    console.log('[Grid class] getCurrentShape() this.currentShape => ', this.currentShape)

    return this.currentShape
  }

  moveShape (direction: Direction) {
    // console.log('[Grid class] moveShape() direction => ', direction)
    // console.log('[Grid class] moveShape() this.currentShape => ', this.currentShape)
    // console.log('[Grid class] moveShape() this.currentCoordinate => ', this.currentCoordinates)

    this.clearShape()

    let newCoors: coorTuple;

    if (direction === Direction.LEFT) {
      newCoors = { x: this.currentCoordinates.x, y: this.currentCoordinates.y - 1 }
    } else {
      newCoors = { x: this.currentCoordinates.x, y: this.currentCoordinates.y + 1 }
    }
    
    this.renderShape(newCoors)

  }

  renderGrid () {
    return this.grid
  }

  private clearShape() {
    const shapeToClear = this.currentShape
    const { x, y } = this.currentCoordinates

    for (let i = 0; i < shapeToClear.coordinates.length; i++){
      const row = shapeToClear.coordinates[i]
      for (let j = 0; j < row.length; j++) {
        this.grid[x + i][y + j] = null
      }
    }
  }

  private renderShape(coordinates: coorTuple) {
    console.log('[ GridClass ] renderShape() coordinates => ', coordinates)

    const { x, y } = coordinates
    this.currentCoordinates = { x, y }

    for (let i = 0; i < this.currentShape.coordinates.length; i++){
      const row = this.currentShape.coordinates[i]
      for (let j = 0; j < row.length; j++) {
        // console.log('    >>>> col >>>> ', JSON.stringify(this.grid,null, 4))
        // console.log('[x, y] => ', `[${JSON.stringify(x)}, ${JSON.stringify(y)}]`)
        // console.log('[i, j] => ', `[${JSON.stringify(i)}, ${JSON.stringify(j)}]`)
        // console.log('[coor] => ', `[${JSON.stringify(x + i)}, ${JSON.stringify(y + j)}]`)
        // console.log(`JSON.stringify(currentShape.coordinates[${i}][${j}]) => `, JSON.stringify(this.currentShape.coordinates[i][j], null, 4))

        // a shape can have negitive space
        if (this.currentShape.coordinates[i][j] === 1) {
          this.grid[x + i][y + j] = this.currentShape
        }
      }
    }
  }
}
