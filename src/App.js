import React, { Component } from 'react'
import './App.css'

import './modules/renderer'
import './modules/socket'
import Game from './rendering/game/Game'
import ActiveLobby from './containers/ActiveLobby.js'

const App = ({currentState}) => (
  <div className="turn-wars-wrapper">
    { (currentState === 'ingame') ? <Game /> : '' }
    { (currentState === 'lobby') ? <ActiveLobby /> : '' }
  </div>
)

export default App;
