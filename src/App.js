import React, { Component } from 'react'
import './App.css'

import './modules/renderer'
import './modules/stateRenderer'
import Canvas from './rendering/canvas/Canvas'

class App extends Component {
  render() {

    return (
      <div className="game-container">
        <Canvas />
      </div>
    )
  }
}

export default App;
