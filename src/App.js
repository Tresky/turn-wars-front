import React, { Component } from 'react'
import './App.css'

import './modules/renderer'
import stateRenderer from './modules/stateRenderer'
import Game from './rendering/game/Game'

class App extends Component {
  render() {

    return (
      <div className="turn-wars-wrapper">
        { (this.state.currentState === 'ingame') ? <Game /> : '' }
      </div>
    )
  }
}

export default App;
