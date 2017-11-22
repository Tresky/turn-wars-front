import stateRenderer from './stateRenderer'

import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'

import TileStore from './tileStore'
import ArmyStore from './armyStore'

class StateStore {
  constructor () {
    this.state = undefined
    this.selection = undefined

    this.tileStore = new TileStore()
    this.armyStore = new ArmyStore()
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
    const objectsAtLocation = this.objectsAtLocation(x, y)

    this.selection = { x: x, y: y }
    this.state._selection = {
      coords: this.selection,
      objects: objectsAtLocation
    }

    this.renderState()

    return cloneDeep(this.state._selection)
  }

  objectsAtLocation (x, y) {
    return merge({
      tiles: this.tileStore.atLocation(x, y)
    }, this.armyStore.atLocation(x, y))
  }

  _processState () {
    let layers = [this.state.scenario.board] // temp
    this.tileStore.processTiles(layers)
    this.armyStore.processArmies(this.state.scenario.armies)
  }
}

let stateStore = new StateStore()

export default stateStore