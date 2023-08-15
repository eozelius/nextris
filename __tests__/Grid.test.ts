import Grid, { Direction } from '@/models/Grid'

describe('Grid Class', () => {
  describe('collision detection with other shapes', () => {
    it('detects a collision', () => {
      const g = new Grid()
      g.startGame()
      const grid = g.renderGrid()

      g.moveShape(Direction.LEFT)

      // console.log('[ Test ] it() grid => ', grid)
    })
  })
})
  