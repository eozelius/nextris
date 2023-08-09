'use client'

import Image from 'next/image'
import classNames from 'classnames/bind'

import blue from '@/images/sprites/blue.png'
import red from '@/images/sprites/red.png'
import green from '@/images/sprites/green.png'
import purple from '@/images/sprites/purple.png'
import pink from '@/images/sprites/pink.png'
import styles from './Grid.module.css'
import { Color, ShapeType } from '@/models/Shape/types'
import { gridType } from '@/models/Grid'

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

type GridPresentationalProps = {
  grid: gridType
}

export default function GridPresentational ({ grid }: GridPresentationalProps) {
  // console.log('<PresnetationalGrid /> grid => ', JSON.stringify(grid, null, 4))
  
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