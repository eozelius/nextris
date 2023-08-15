'use client'

import { useState, useEffect } from 'react'

import Grid, { Direction, gridType } from '@/models/Grid'
import { ShapeType } from '@/models/Shape/types'
import PresentationalGrid from './PresentationalGrid'
import styles from './Grid.module.css'

export default function GridController () {
  const [ gridInstance, setGridInstance ] = useState<Grid | null>(null)
  const [ gridArray, setGridArray ] = useState<gridType | null>(null)

  // leverage useEffect(..., []) to only invoke new Grid() once.
  useEffect(() => {
    // initialize grid
    const g = new Grid()
    setGridInstance(g)
    setGridArray(g.renderGrid())

    // initialize interval to constantly rerender grid every 1000 ms
    const interval = setInterval(() => {
      // g?.moveShape(Direction.DOWN)
      const newGrid = g?.renderGrid() || []
      setGridArray(JSON.parse(JSON.stringify(newGrid)))
    }, 200)

    return () => clearInterval(interval)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (['ArrowLeft', 'KeyA'].includes(e.code)) {
      gridInstance?.moveShape(Direction.LEFT)
    } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
      gridInstance?.moveShape(Direction.RIGHT)
    }

    const updatedGrid: Array<Array<ShapeType | null>> = gridInstance?.renderGrid() || []
    // deep clone updated grid to force rerender, because changes to 2D array will not be tracked.
    setGridArray(JSON.parse(JSON.stringify(updatedGrid)))
  }

  const handleStartGame = (e: React.MouseEvent) => {
    e.preventDefault()
    gridInstance?.startGame()
  } 

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={handleStartGame}
          className={styles['start-game-btn']}
        >
          start game
        </button>

      </div>
      
      {gridArray && gridArray.length
        ? <PresentationalGrid grid={gridArray} handleKeyDown={handleKeyDown} />
        : <p>loading</p>}
    </div>
  )
}