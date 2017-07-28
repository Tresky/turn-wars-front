import React, { Component } from 'react'
import './App.css'

import './modules/renderer'
import './modules/socket'
import Game from './rendering/game/Game'

class App extends Component {
  constructor () {
    super()

    this.state = {
      // splash -> mainMenu -> matchList -> matchLobby -> ingame
      currentState: 'ingame' 
    }
  }

  render() {

    return (
      <div className="turn-wars-wrapper">
        { (this.state.currentState === 'ingame') ? <Game /> : '' }
      </div>
    )
  }
}

export default App;
