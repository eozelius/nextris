'use client'

import { useState, useEffect, useRef } from 'react'

import Score from '@/components/Score'
import Grid, { Direction, gridType } from '@/models/Grid'
import { ShapeType } from '@/models/Shape/types'
import PresentationalGrid from './PresentationalGrid'
import styles from './Grid.module.css'

export default function GridController () {
  const presentationalGridRef = useRef(null);
  const [ gridInstance, setGridInstance ] = useState<Grid | null>(null)
  const [ gridArray, setGridArray ] = useState<gridType | null>(null)
  const [ score, setScore ] = useState<number>(0)

  // leverage useEffect(..., []) to only invoke new Grid() once.
  useEffect(() => {
    // initialize grid
    const g = new Grid()
    setGridInstance(g)
    setGridArray(g.renderGrid())

    // initialize interval to constantly rerender grid every 1000 ms
    // todo: replace this with a rerender whenever new props are received to be more "reacty" :)
    // although that will probably require passing a JSON.stringify'd string instead of a 2D array
    // since JS cannot detect changes in 2d arrays well.
    const interval = setInterval(() => {
      const newGrid = g?.renderGrid() || []
      setGridArray(JSON.parse(JSON.stringify(newGrid)))
      const newScore = g?.getScore()
      setScore(newScore)
    }, 200)

    return () => clearInterval(interval)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (['ArrowLeft', 'KeyA'].includes(e.code)) {
      gridInstance?.moveShape(Direction.LEFT)
    } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
      gridInstance?.moveShape(Direction.RIGHT)
    } else if (e.code === 'ArrowUp') {
      gridInstance?.rotateCurrentShape()
    }

    const updatedGrid: Array<Array<ShapeType | null>> = gridInstance?.renderGrid() || []
    // deep clone updated grid to force rerender, because changes to 2D array will not be tracked.
    setGridArray(JSON.parse(JSON.stringify(updatedGrid)))
  }

  const handleStartGame = (e: React.MouseEvent) => {
    e.preventDefault()
    // @ts-ignore
    presentationalGridRef?.current?.focus()
    gridInstance?.startGame()
  } 

  const handlePauseGame = (e: React.MouseEvent) => {
    e.preventDefault()
    gridInstance?.pauseGame()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Score score={score} />
        
        <button
          onClick={handleStartGame}
          className={styles['start-game-btn']}
        >
          start game
        </button>

        <button
          onClick={handlePauseGame}
          className={styles['start-game-btn']}
        >
          pause
        </button>
      </div>
      
      {gridArray && gridArray.length
        ? <PresentationalGrid
            grid={gridArray}
            handleKeyDown={handleKeyDown}
            focusReference={presentationalGridRef}
          />
        : <p>loading</p>}
    </div>
  )
}