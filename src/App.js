import React, { Component } from 'react'
import './App.css'

import Canvas from './canvas/Canvas'

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
