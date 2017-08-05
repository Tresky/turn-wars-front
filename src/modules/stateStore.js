import stateRenderer from './stateRenderer'

class StateStore {
  constructor () {
    this.state = undefined
  }

  getState () {
    return this.state
  }

  setState (json) {
    if (json) {
      this.state = json
      this.renderState()
    }
  }

  renderState () {
    if (this.state) {
      stateRenderer.render(this.state)
    }
  }
}

let stateStore = new StateStore()

export default stateStore