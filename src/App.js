import React, { Component } from 'react'
import './App.css'

import './modules/renderer'
import './modules/socket'
import Game from './rendering/game/Game'
import ActiveLobby from './containers/ActiveLobby.js'

class App extends Component {
  constructor () {
    super()

    this.state = {
      // splash -> mainMenu -> matchList -> matchLobby -> ingame
      currentState: 'lobby' 
    }
  }

  render() {

    return (
      <div className="turn-wars-wrapper">
        { (this.state.currentState === 'ingame') ? <Game /> : '' }
        { (this.state.currentState === 'lobby') ? <ActiveLobby /> : '' }
      </div>
    )
  }
}

export default App;
