'use client'

import { useState, useEffect } from 'react'

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

      const updatedGrid: Array<Array<ShapeType | null>> = gridInstance?.renderGrid()

      console.log('[<Grid />] keydonw() updatedGrid => ', updatedGrid)
      
      setGridArray(updatedGrid)
    }
  })
  
  // const [ grid, setGrid ] = useState<Grid | null>(null)
  const [ gridInstance ] = useState<Grid>(
    new Grid()
  )
    
  const [ gridArray, setGridArray ] = useState<gridType>(
    gridInstance.renderGrid()
  )

  // wrap in a one-time useEffect to prevent multiple instantiations of Grid.
  // Might be about to move this to another util/Singleton etc...
  // useEffect(() => {
  //   const g = new Grid();
  //   setGrid(g)
  // }, [])

  return (
    gridArray
      ? <PresentationalGrid grid={gridArray} />
      : <p>loading</p>
  )
}