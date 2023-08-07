export type coorTuple = {
  x: number,
  y: number
}

/** 2-d array of numbers.
 * example: L Shape = [
 *   [1],
 *   [1, 1, 1]
 * ]
*/
export type shapeCoorType = Array<Array<number>>

function randomColor(): Color {
  const numberToColorMap: {
    [key: number]: Color
  } = {
    0: Color.BLUE,
    1: Color.RED,
    2: Color.PURPLE,
    3: Color.PINK,
    4: Color.GREEN
  }

  const n = Math.floor(Math.random() * 5)
  return numberToColorMap[n]
}

export enum Color {
  BLUE = 'BLUE',
  RED = 'RED',
  PURPLE = 'PURPLE',
  PINK = 'PINK',
  GREEN = 'GREEN'
}

class Shape {
  coordinates: shapeCoorType
  color: Color
  id: number

  constructor(coordinates: shapeCoorType) {
    this.coordinates = coordinates
    this.color = randomColor()
    this.id = Math.floor(Math.random() * 999999)
  }
}

export default Shape
