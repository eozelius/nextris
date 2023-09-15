import LeftL from '@/models/Shape/LeftL'
import LeftZ from '@/models/Shape/LeftZ'
import RightZ from '@/models/Shape/RightZ'
import Pyramid from '@/models/Shape/Pyramid'
import Line from '@/models/Shape/Line'
import { rotate90Degrees } from '@/models/Shape/utils'

describe('Shape utils', () => {
  describe('rotate90Degress()', () => {
    it('rotates a LeftZ 90 degrees', () => {
      const leftZ = new LeftZ()
      const originalCooordinates = [
        [1, 1, 0],
        [0, 1, 1]
      ]
      const expectedCoordinates = [
        [0, 1],
        [1, 1],
        [1, 0]
      ]

      const response = rotate90Degrees(leftZ)
      leftZ.setCoordinates(response)

      expect(leftZ.coordinates).toEqual(expectedCoordinates)
      expect(response).toEqual(expectedCoordinates)

      // rotate again
      const response2 = rotate90Degrees(leftZ)
      leftZ.setCoordinates(response2)

      expect(leftZ.coordinates).toEqual(originalCooordinates)
      expect(response2).toEqual(originalCooordinates)
    })

    it('rotates a RightZ 90 degrees', () => {
      const rightZ = new RightZ()
      const originalCooordinates = [
        [0, 1, 1],
        [1, 1, 0]
      ]
      const expectedCoordinates = [
        [1, 0],
        [1, 1],
        [0, 1]
      ]

      const response = rotate90Degrees(rightZ)
      rightZ.setCoordinates(response)

      expect(response).toEqual(expectedCoordinates)
      expect(rightZ.coordinates).toEqual(expectedCoordinates)

      // rotate again
      const response2 = rotate90Degrees(rightZ)
      rightZ.setCoordinates(response2)

      expect(rightZ.coordinates).toEqual(originalCooordinates)
      expect(response2).toEqual(originalCooordinates)
    })
    
    it('rotates a LeftL 90 degrees', () => {
      const leftL = new LeftL()
      const expectedCoordinates = [
        [1, 1],
        [1, 0],
        [1, 0]
      ]
      const expected2ndCoordinates = [
        [1, 1 ,1],
        [0, 0, 1]
      ]
      const expected3rdCoordinates = [
        [0, 1],
        [0, 1],
        [1, 1]
      ]
      const expected4thCoordinates = [
        [1, 0 ,0],
        [1, 1, 1]
      ]

      const response = rotate90Degrees(leftL)
      leftL.setCoordinates(response)

      expect(leftL.coordinates).toEqual(expectedCoordinates)
      expect(response).toEqual(expectedCoordinates)

      // rotate a 2nd time
      const response2 = rotate90Degrees(leftL)
      leftL.setCoordinates(response2)

      expect(leftL.coordinates).toEqual(expected2ndCoordinates)
      expect(response2).toEqual(expected2ndCoordinates)

      // rotate a 3rd time
      const response3 = rotate90Degrees(leftL)
      leftL.setCoordinates(response3)

      expect(leftL.coordinates).toEqual(expected3rdCoordinates)
      expect(response3).toEqual(expected3rdCoordinates)
      
      // rotate a 4th time, i.e. back to original
      const response4 = rotate90Degrees(leftL)
      leftL.setCoordinates(response4)

      expect(leftL.coordinates).toEqual(expected4thCoordinates)
      expect(response4).toEqual(expected4thCoordinates)
    })

    it('rotates an Line 90 degrees', async () => {
      const l = new Line()
      const originalCooordinates = [
        [1],
        [1],
        [1],
        [1]
      ]
      const expectedCoordinates = [
        [1, 1, 1, 1]
      ]

      const response = rotate90Degrees(l)
      l.setCoordinates(response)

      expect(l.coordinates).toEqual(expectedCoordinates)
      expect(response).toEqual(expectedCoordinates)

      // rotate again
      const response2 = rotate90Degrees(l)
      l.setCoordinates(response2)

      expect(l.coordinates).toEqual(originalCooordinates)
      expect(response2).toEqual(originalCooordinates)
    })

    it('rotates a Pyramid 90 degrees', async () => {
      const l = new Pyramid()
      const originalCooordinates = [
        [0, 1, 0],
        [1, 1, 1],
      ]
      const expectedCoordinates = [
        [1, 0],
        [1, 1],
        [1, 0]
      ]
      const expected2ndCoordinates = [
        [1, 1, 1],
        [0, 1, 0],
      ]
      const expected3rdCoordinates = [
        [0, 1],
        [1, 1],
        [0, 1]
      ]

      // rotate once
      const response = rotate90Degrees(l)
      l.setCoordinates(response)

      expect(l.coordinates).toEqual(expectedCoordinates)
      expect(response).toEqual(expectedCoordinates)

      // rotate 2nd time
      const response2 = rotate90Degrees(l)
      l.setCoordinates(response2)

      expect(l.coordinates).toEqual(expected2ndCoordinates)
      expect(response2).toEqual(expected2ndCoordinates)

      // rotate 3rd time
      const response3 = rotate90Degrees(l)
      l.setCoordinates(response3)

      expect(l.coordinates).toEqual(expected3rdCoordinates)
      expect(response3).toEqual(expected3rdCoordinates)

      // rotate 4th time, i.e. back to original
      const response4 = rotate90Degrees(l)
      l.setCoordinates(response4)

      expect(l.coordinates).toEqual(originalCooordinates)
      expect(response4).toEqual(originalCooordinates)
    })
  })
})
