import LShape from '@/models/Shape/L'
import LineShape from '@/models/Shape/Line'
import LeftZ from '@/models/Shape/LeftZ'
import RightZ from '@/models/Shape/RightZ'

/** 2-d array of numbers.
 * example: L Shape = [
 *   [1],
 *   [1, 1, 1]
 * ]
*/
export type shapeCoorType = Array<Array<number>>

export enum Color {
  BLUE = 'BLUE',
  RED = 'RED',
  PURPLE = 'PURPLE',
  PINK = 'PINK',
  GREEN = 'GREEN'
}

export type ShapeType = LineShape | LShape | RightZ | LeftZ
