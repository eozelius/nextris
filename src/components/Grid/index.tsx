'use client'

import Image from 'next/image'
import classNames from 'classnames/bind'
import { useState, useEffect } from 'react'

import Grid from '@/models/Grid'
import blue from '@/images/sprites/blue.png'
import red from '@/images/sprites/red.png'
import green from '@/images/sprites/green.png'
import purple from '@/images/sprites/purple.png'
import pink from '@/images/sprites/pink.png'
import styles from './Grid.module.css'
import { Color, ShapeType } from '@/models/Shape/types'

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

export default function GridComponent () {
  // clean up
  // document.addEventListener('keydown', (e: KeyboardEvent) => {
  //   if (['ArrowLeft', 'KeyA'].includes(e.code)) {
  //     grid.moveShape(Direction.LEFT)
  //   } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
  //     grid.moveShape(Direction.RIGHT)
  //   }
  // })
  
  const [ grid, setGrid ] = useState<Grid | null>(null)

  // wrap in a one-time useEffect to prevent multiple instantiations of Grid.
  // Might be about to move this to another util/Singleton etc...
  useEffect(() => {
    const g = new Grid();
    setGrid(g)
  }, [])

  const renderCell = (cell: ShapeType | null) => {
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
      {grid?.renderGrid().map((row, i) => (
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