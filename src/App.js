import React, { Component } from 'react'
import './App.css'

import './modules/renderer'
import Canvas from './rendering/canvas/Canvas'

class App extends Component {
  constructor () {
    super()
    this.state = {}
  }

  render() {

    return (
      <div className="game-container">
        <Canvas />
      </div>
    )
  }
}

export default App;
