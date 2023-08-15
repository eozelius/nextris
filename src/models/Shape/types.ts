import LeftL from '@/models/Shape/LeftL'
import RightL from '@/models/Shape/RightL'
import Line from '@/models/Shape/Line'
import LeftZ from '@/models/Shape/LeftZ'
import RightZ from '@/models/Shape/RightZ'
import Pyramid from '@/models/Shape/Pyramid'

/** 2-d array of numbers.
 * example: L Shape = [
 *   [1, 0, 0],
 *   [1, 1, 1]
 * ]
*/
export type shapeCoorType = Array<Array<number>>

export enum ShapesEnum {
  LeftL = 'LeftL',
  RightL = 'RightL',
  LeftZ = 'LeftZ',
  RightZ = 'RightZ',
  Line = 'Line',
  Pyramid = 'Pyramid',
  Square = 'Square'
}

export enum Color {
  BLUE = 'BLUE',
  RED = 'RED',
  PURPLE = 'PURPLE',
  PINK = 'PINK',
  GREEN = 'GREEN',
  YELLOW = 'YELLOW',
  TEAL = 'TEAL'
}

export type ShapeType = Line | RightL | LeftL | RightZ | LeftZ | Pyramid
