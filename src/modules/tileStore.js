class TileStore {
  constructor () {
    this.store = undefined
  }

  processTiles (layers) {
    this.store = layers[0].tiles
  }

  atLocation (x, y) {
    if (x >= 0 && y >= 0) {
      return this.store[y][x]
    }
    return []
  }
}

export default TileStore