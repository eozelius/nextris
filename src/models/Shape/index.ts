import { shapeCoorType } from "./types"

class Shape {
  coordinates: shapeCoorType
  id: number

  constructor(coordinates: shapeCoorType) {
    this.coordinates = coordinates
    this.id = Math.floor(Math.random() * 999999)
  }

  // todo: error check
  setCoordinates (coordinates: shapeCoorType) {
    this.coordinates = coordinates
  }
}

export default Shape
