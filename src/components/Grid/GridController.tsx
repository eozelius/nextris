'use client'

import { useState, useEffect } from 'react'

import Grid, { Direction, gridType } from '@/models/Grid'
import { ShapeType } from '@/models/Shape/types'
import PresentationalGrid from './PresentationalGrid'

export default function GridComponent () {
  const [ gridInstance, setGridInstance ] = useState<Grid | null>(null)
  const [ gridArray, setGridArray ] = useState<gridType | null>(null)

  // leverage useEffect(..., []) to only invoke new Grid() once.
  useEffect(() => {
    const g = new Grid()
    setGridInstance(g)
    setGridArray(g.renderGrid())
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

  return (
    gridArray && gridArray.length
      ? <PresentationalGrid grid={gridArray} handleKeyDown={handleKeyDown} />
      : <p>loading</p>
  )
}