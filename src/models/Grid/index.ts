import { ShapeType } from "../Shape/types"
import { generateRandomShape } from "../Shape/utils"

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

  moveShape (direction: Direction) {
    // TODO: not entirely sure I love these 2 helper functions living inside of moveShape().  TBD where they should live.    
    /**
     * @description - iterate through a shape's coordinates and find/return the length of the
     * longest  row
     * @returns [Int] - 1 based number representing the length of the shape's widest row.
     */
    function getShapeLength (shape: ShapeType) {
      const shapeRows = shape.coordinates.map((r) => r.length)
      return Math.max(...(shapeRows))
    }

    function getShapeHeight (shape: ShapeType) {
      return shape.coordinates.length
    }


    const doesNotCollide = ({ moveToCoordinates }: {
      moveToCoordinates: coorTuple
    }): boolean => {
      for (let i = 0; i < this.currentShape.coordinates.length; i++) {
        const row = this.currentShape.coordinates[i]
        for (let j = 0; j < row.length; j++) {
          if (this.currentShape.coordinates[i][j] === 1) {
            const {x, y} = moveToCoordinates
            console.log(`[ Grid ] doesNotCollide() { i: ${i}, j: ${j}}; { x: ${x}, y: ${y} }`)

            const cellToCheck = this.grid[x + i][y + j]

            if (cellToCheck !== null && cellToCheck.id !== this.currentShape.id) {
              console.log(`[ Grid ] doesNotCollide() this.grid[${x+i}][${y+j}] is already occupied!!`)
              return false
            }
            // } else {
            //   console.log(`[ Grid ] doesNotCollide() this.grid[${x+i}][${y+j}] is free continue!!`)
            // }
          }
          // } else {
          //   console.log(`[ Grid ] doesNotCollide() [${i}][${j}] is zero, no need to check`)
          // }
        }
      }
      
      return true
    }

    /**
     * @description - determine if the move would be in grid bounds
     * @returns [Boolean] - whether or not the move would be within grid bounds
     */
    const isWithinBounds = ({
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
        const { x, y } = this.startingCoordinates
        this.currentCoordinates = { x, y }
        this.currentShape = generateRandomShape()
        this.renderShape(this.startingCoordinates)

        return false
      }

      return true
    }
    
    // console.log('[Grid class] moveShape() direction => ', direction)
    // console.log('[Grid class] moveShape() this.currentShape => ', this.currentShape)
    // console.log('[Grid class] moveShape() this.currentCoordinate => ', this.currentCoordinates)

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

    const isLegalCollisionMove = doesNotCollide({
      moveToCoordinates: newCoors
    })

    console.log('[ Grid ] moveShape() isLegalCollisionMove => ', isLegalCollisionMove)

    // OB right
    if (isMoveWithinBounds) {
      this.clearShape()
      this.renderShape(newCoors)
    }
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

  private renderShape(startingCoordinates: coorTuple) {
    // console.log('[ GridClass ] renderShape() startingCoordinates => ', startingCoordinates)

    const { x, y } = startingCoordinates
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
