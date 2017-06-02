import React, { Component } from 'react'
import './Canvas.css'

import renderer from '../../modules/renderer'
import example from '../../examples/example1.json';

import Map from '../map/Map'

class Canvas extends Component {
  constructor() {
    super()
    this.state = {
      data: example
    }
  }

  componentDidMount() {
    let canvas = document.getElementById("game-canvas");

    // Set the size of the canvas
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    console.log('Renderer', renderer)
    console.log('Example', this.state.data)
    renderer.findCanvas('game-canvas')

    this.setState(this.state)
  }

  componentDidUpdate() {}

  render() {
    return (
      <canvas ref="canvas" id="game-canvas">
        <Map scenario={this.state.data.scenario} />
      </canvas>
    )
  }
}

export default Canvas;
