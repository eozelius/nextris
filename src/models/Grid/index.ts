import { isWithinBounds, doesNotCollide, getShapeLength, getShapeHeight, isALineCompleted } from './utils'
import { ShapeType } from "@/models/Shape/types"
import { generateRandomShape } from "@/models/Shape/utils"

export type coorTuple = {
  x: number,
  y: number
}

export enum Direction {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  DOWN ='DOWN'
}

export type gridType = Array<Array<ShapeType | null>>

export default class Grid {
  private grid: gridType
  private currentShape: ShapeType
  private startingCoordinates: coorTuple = { x: 0, y: 4 }
  private currentCoordinates: coorTuple = { x: 0, y: 4 }

  // typeof Interval
  private gameLoop: any
  
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
      // [null, null, null, null, null, null, null, null, null, null],
      // [null, null, null, null, null, null, null, null, null, null],
      // [null, null, null, null, null, null, null, null, null, null],
      // [null, null, null, null, null, null, null, null, null, null],
      // [null, null, null, null, null, null, null, null, null, null],
      // [null, null, null, null, null, null, null, null, null, null],
      // [null, null, null, null, null, null, null, null, null, null],
      // [null, null, null, null, null, null, null, null, null, null],
      // [null, null, null, null, null, null, null, null, null, null],
      // [null, null, null, null, null, null, null, null, null, null],
      // [null, null, null, null, null, null, null, null, null, null],
      // [null, null, null, null, null, null, null, null, null, null],
      // [null, null, null, null, null, null, null, null, null, null]
    ]
    this.currentShape = generateRandomShape()
  }

  startGame(){
    const { x, y } = this.startingCoordinates
    this.currentCoordinates = { x, y }

    this.renderShape(this.startingCoordinates)

    this.gameLoop = setInterval(() => {
      this.moveShape(Direction.DOWN)

    }, 1000)
  }

  pauseGame() {
    clearInterval(this.gameLoop)
  }

  private resetAndRenderNewShape() {
    const isALineComplete = isALineCompleted(this.grid)
    console.log('isALineCompleteResponse =>', isALineComplete)

    const { x, y } = this.startingCoordinates
    this.currentCoordinates = { x, y }
    this.currentShape = generateRandomShape()
    this.renderShape(this.startingCoordinates)
  }

  moveShape (direction: Direction) {
    let newCoors: coorTuple;

    if (direction === Direction.LEFT) {
      newCoors = { x: this.currentCoordinates.x, y: this.currentCoordinates.y - 1 }
    } else if (direction === Direction.RIGHT) {
      newCoors = { x: this.currentCoordinates.x, y: this.currentCoordinates.y + 1 }
    } else if (direction === Direction.DOWN) {
      newCoors = { x: this.currentCoordinates.x + 1, y: this.currentCoordinates.y }
    } else {
      throw new Error('Unrecognized direction => ', direction)
    }

    const gridLength = this.grid.length
    const shapeWidth = getShapeLength(this.currentShape)
    const shapeHeight = getShapeHeight(this.currentShape)
    const gridWidth = this.grid[0].length

    const isMoveWithinBounds = isWithinBounds({
      shapeWidth,
      shapeHeight,
      gridWidth,
      gridLength,
      moveToCoordinates: newCoors 
    })

    if (!isMoveWithinBounds) {
      // If OB down, start a new shape at the top.  If OB left/right, just keep going.
      if (direction === Direction.DOWN) {
        this.resetAndRenderNewShape()
      }
      return
    }
    
    const isLegalCollisionMove = doesNotCollide({
      currentShape: this.currentShape,
      direction,
      grid: JSON.parse(JSON.stringify(this.renderGrid())), // Clone grid, just to be safe.
      moveToCoordinates: newCoors,
      shapeHeight
    })
    
    // Colllision DOWN detected, reset
    if (!isLegalCollisionMove && direction === Direction.DOWN) {
      this.resetAndRenderNewShape()
      return
    // Collision L/R detected, do not allow move but continue
    } else if (!isLegalCollisionMove && [Direction.LEFT, Direction.RIGHT].includes(direction)) {
      console.log('collision L/R detected')
      return
    }

    if (isMoveWithinBounds && isLegalCollisionMove) {
      this.clearShape()
      this.renderShape(newCoors)
    }
  }

  renderGrid () {
    // clone and Return a JS 2D array
    return JSON.parse(JSON.stringify(this.grid))
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
    const { x, y } = coordinates
    this.currentCoordinates = { x, y }

    for (let i = 0; i < this.currentShape.coordinates.length; i++){
      const row = this.currentShape.coordinates[i]
      for (let j = 0; j < row.length; j++) {
        if (this.grid[x + i][y + j] !== null && this.currentShape.coordinates[i][j] === 1) {
          console.error(`[ Grid ] renderShape() attempting to draw a shape in a non empty square; => { ${x + i}, ${y + j} }`)
          alert('[ Grid ] renderShape() attempting to draw a shape in a non empty square.')
          clearInterval(this.gameLoop)
          throw new Error('[ Grid ] renderShape() attempting to draw a shape in a non empty square.')
        }

        // a shape can have negitive space, so necessary to check that.
        if (this.currentShape.coordinates[i][j] === 1) {
          this.grid[x + i][y + j] = this.currentShape
        }
      }
    }
  }
}
