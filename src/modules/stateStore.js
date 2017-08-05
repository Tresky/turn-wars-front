import stateRenderer from './stateRenderer'

import merge from 'lodash/merge'

import TileStore from './tileStore'

class StateStore {
  constructor () {
    this.state = undefined
    this.selection = undefined

    this.tileStore = new TileStore()
  }

  getState () {
    return this.state
  }

  setState (json) {
    if (json) {
      this.state = merge(json, { _selection: this.selection })
      this._processState()
      this.renderState()
    }
  }

  renderState () {
    if (this.state) {
      stateRenderer.render(this.state)
    }
  }

  selectTile (x, y) {
    this.selection = { x: x, y: y }
    this.state._selection = this.selection
    this.renderState()

    return this.objectsAtLocation(x, y)
  }

  objectsAtLocation (x, y) {
    return {
      tiles: this.tileStore.atLocation(x, y)
    }
  }

  _processState () {
    let layers = [this.state.scenario.board] // temp
    this.tileStore.processTiles(layers)
  }
}

let stateStore = new StateStore()

export default stateStore