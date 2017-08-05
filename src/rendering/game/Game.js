import React, { Component } from 'react'
import './Game.css'

import Canvas from '../canvas/Canvas'
import Interface from '../interface/Interface'

class Game extends Component {
  /**
   * Render the initial DOM elements.
   */
  render() {
    return (
      <div id="game-container">
        <Canvas />
        <Interface />
      </div>
    )
  }
}

export default Game;
