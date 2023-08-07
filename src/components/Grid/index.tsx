'use client'

import Image from 'next/image'
import classNames from 'classnames/bind'
import { useState, useEffect } from 'react'

import LShape from '@/models/Shape/L'
import LineShape from '@/models/Shape/Line'
import LeftZ from '@/models/Shape/LeftZ'
import RightZ from '@/models/Shape/RightZ'
import Shape, { coorTuple, Color } from '@/models/Shape'
import blue from '@/images/sprites/blue.png'
import red from '@/images/sprites/red.png'
import green from '@/images/sprites/green.png'
import purple from '@/images/sprites/purple.png'
import pink from '@/images/sprites/pink.png'
import styles from './Grid.module.css'

// const lShape = new LShape()

enum Direction {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

const colorToRender = (color: Color) => {
  let src;

  switch (color) {
    case Color.BLUE:
      src = blue
      break
    case Color.RED:
      src = red
      break
    case Color.PURPLE:
      src = purple
      break
    case Color.GREEN:
      src = green
      break
    case Color.PINK:
      src = pink
      break
    default:
      throw new Error('Invalid color')
  }

  return (
    <Image
      src={src}
      alt={`${color} cell`}
      width={46}
      height={46}
    />
  )
}

// clena up
document.addEventListener('keydown', (e: KeyboardEvent) => {
  if (['ArrowLeft', 'KeyA'].includes(e.code)) {
    moveShape(Direction.LEFT)
  } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
    moveShape(Direction.RIGHT)
  }
})

const moveShape = (direction: Direction) => {
  console.log('direction => ', direction)
}

// return a random shape
const getRandomShape = () => {
  const numberToShapeMap: { [key: number]: typeof LShape | typeof LineShape } = {
    0: LShape,
    1: LineShape,
    2: LeftZ,
    3: RightZ
  }

  const n = Math.floor(Math.random() * 1)
  const randomShape = numberToShapeMap[n]
  const instantiatedRandomShape = new randomShape()
  return instantiatedRandomShape
}

export default function Grid () {
  const [ currentShape, setCurrentShape ] = useState<Shape>(getRandomShape());
  
  const [ grid, setGrid ] = useState<Array<Array<number | null>>>([
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
  ])

  useEffect(() => {
    // clone state.grid
    const gridClone = JSON.parse(JSON.stringify(grid));

    // todo: add type tuple to represent x,y coor
    const startingPt: coorTuple = { x: 0, y: 4}
    const { x, y } = startingPt;

    // loop thru shape coordinates
    for (let i = 0; i < currentShape.coordinates.length; i++){
      const row = currentShape.coordinates[i]
      for (let j = 0; j < row.length; j++) {
        // console.log('[x, y] => ', `[${JSON.stringify(x)}, ${JSON.stringify(y)}]`)
        // console.log('[i, j] => ', `[${JSON.stringify(i)}, ${JSON.stringify(j)}]`)
        // console.log('[coor] => ', `[${JSON.stringify(x + i)}, ${JSON.stringify(y + j)}]`)
        // console.log('JSON.stringify(currentShape.coordinates[i][j]) => ', JSON.stringify(currentShape.coordinates[i][j], null, 4))

        // a shape can have negitive space
        if (currentShape.coordinates[i][j]) {
          gridClone[x + i][y + j] = currentShape
        }

        setGrid(gridClone)
      }
    }
  }, [])

  const renderCell = (cell: Shape | null) => {
    if (cell === null) {
      return <div className={styles.cell}></div>
    } else {
      // console.log('[Grid] rednerCell() cell => ', typeof cell)
      const cx = classNames.bind(styles)
      const className = cx({
        color: cell.color,
        cell: true
      })

      return (
        <div className={className} data-testid={cell.id}>
          {colorToRender(cell.color)}
        </div>
      )
    }
  }

  return (
    <div className={styles['grid-container']}>
      {grid.map((row, i) => (
        <ol key={i}>
          {row.map((col, j) => {
            return (
              <li key={j}>
                { renderCell(col) }
              </li>
            )
          })}
        </ol>
      ))}
    </div>
  )
}