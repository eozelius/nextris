'use client'

import Image from 'next/image'
import classNames from 'classnames/bind'
import { useState, useEffect } from 'react'


import LShape from '@/components/Shapes/L'
import Shape, { coorTuple, Color } from '@/models/Shape'
import blue from '@/images/sprites/blue.png'
import red from '@/images/sprites/red.png'
import green from '@/images/sprites/green.png'
import purple from '@/images/sprites/purple.png'
import pink from '@/images/sprites/pink.png'
import styles from './Grid.module.css'

const lShape = new LShape()

const colorToRender = (color: Color) => {
  console.log('[Grid] colorToRender() color => ', color)

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


export default function Grid () {
  const [ grid, setGrid ] = useState([
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
    const gridClone = JSON.parse(JSON.stringify(grid));

    // todo: add type tuple to represent x,y coor
    const startingPt: coorTuple = { x: 1, y: 2}
    const { x, y } = startingPt;

    console.log('lShape.color => ', lShape.color)
    console.log('lShape.coordinates => ', lShape.coordinates)

    // loop thru shape coordinates
    for (let i = 0; i < lShape.coordinates.length; i++){
      const row = lShape.coordinates[i]
      for (let j = 0; j < row.length; j++) {
        // console.log('[x, y] => ', `[${JSON.stringify(x)}, ${JSON.stringify(y)}]`)
        // console.log('[i, j] => ', `[${JSON.stringify(i)}, ${JSON.stringify(j)}]`)
        // console.log('[coor] => ', `[${JSON.stringify(x + i)}, ${JSON.stringify(y + j)}]`)

        gridClone[x + i][y + j] = lShape
        // console.log('JSON.stringify(gridClone) => ', JSON.stringify(gridClone[x][y], null, 4))

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