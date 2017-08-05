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
    this.offset = { x: 0, y: 0 }
    this.selection = undefined
  }

  _renderSelection (selection) {
    if (selection) {
      renderer.drawRect(selection.x, selection.y, 'yellow', 'stroke')
    }
  }

  render (state) {
    console.log('Rendering Game State', state)
    renderer.clear()

    // Render layers
    let layers = [state.scenario.board] // temporary methodology
    for (let layer of layers) {
      for (let row = 0; row < layer.tiles.length; row++) {
        for (let col = 0; col < layer.tiles[row].length; col++) {
          let color = tileColor(layer.tiles[row][col])
          renderer.drawRect(col, row, color, 'fill')
        }
      }
    }

    // Render armies
    let armies = state.scenario.armies
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

    this._renderSelection(state._selection)
  }
}

let stateRenderer = new StateRenderer()

export default stateRenderer