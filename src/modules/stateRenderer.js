import renderer from './renderer'

function tileColor (tile) {
  switch (tile) {
    case 'grass': return 'green'
    case 'rocks': return 'gray'
    default: return 'yellow'
  }
}

function unitColor (unit) {
  switch (unit) {
    case 'footman': return 'blue'
    default: return 'yellow'
  }
}

function buildingColor (bldg) {
  switch (bldg) {
    case 'castle': return 'red'
    default: return 'yellow'
  }
}

class StateRenderer {
  constructor () {
    this.state = null
    this.offset = { x: 0, y: 0 }
  }

  getState () {
    return this.state
  }

  setState (json) {
    if (json) {
      this.state = json

      this.render()
    }
  }

  setOffset (xOffset, yOffset) {
    // If the offset hasn't changed, don't worry about redrawing.
    if (this.offset.x === xOffset && this.offset.y === yOffset) {
      return
    }

    renderer.setOffset(xOffset, yOffset)
    this.render()
  }

  render () {
    console.log('Rendering Game State', this.state)
    renderer.clear()

    // Render layers
    let layers = [this.state.scenario.board] // temporary methodology
    for (let layer of layers) {
      console.log(layer)
      for (let row = 0; row < layer.tiles.length; row++) {
        for (let col = 0; col < layer.tiles[row].length; col++) {
          let color = tileColor(layer.tiles[row][col])
          renderer.drawRect(col, row, color, 'fill')
        }
      }

    }

    // Render armies
    let armies = this.state.scenario.armies
    for (let army of armies) {
      let units = army.units
      for (let unit of units) {
        let color = unitColor(unit.name)
        renderer.drawRect(unit.coordinate.x, unit.coordinate.y, color, 'fill')
      }

      let buildings = army.buildings
      for (let bldg of buildings) {
        let color = buildingColor(bldg.name)
        renderer.drawRect(bldg.coordinate.x, bldg.coordinate.y, color, 'fill')
      }
    }

    renderer.drawGrid(layers[0].tiles[0].length, layers[0].tiles.length)
  }
}

let stateRenderer = new StateRenderer()

export default stateRenderer