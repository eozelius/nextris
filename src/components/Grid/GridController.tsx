'use client'

import { useState } from 'react'

import Grid, { Direction, gridType } from '@/models/Grid'
import { ShapeType } from '@/models/Shape/types'
import PresentationalGrid from './PresentationalGrid'



export default function GridComponent () {
  // clean up
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (['ArrowLeft', 'KeyA'].includes(e.code)) {
      gridInstance?.moveShape(Direction.LEFT)
    } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
      gridInstance?.moveShape(Direction.RIGHT)
    }

    const updatedGrid: Array<Array<ShapeType | null>> = gridInstance?.renderGrid()
    // deep clone updated grid to force rerender, because changes to 2D array will not be tracked.
    setGridArray(JSON.parse(JSON.stringify(updatedGrid)))
  })
  
  // const [ grid, setGrid ] = useState<Grid | null>(null)
  const [ gridInstance ] = useState<Grid>(
    new Grid()
  )
    
  const [ gridArray, setGridArray ] = useState<gridType>(
    gridInstance.renderGrid()
  )

  return (
    gridArray
      ? <PresentationalGrid grid={gridArray} />
      : <p>loading</p>
  )
}