import React, { Component } from 'react'
import './Canvas.css'

class Canvas extends Component {
  componentDidMount() {
    let canvas = document.getElementById("game-canvas");

    // Set the size of the canvas
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    this.updateCanvas()
  }

  componentDidUpdate() {
    this.updateCanvas()
  }

  updateCanvas() {
    // Draw some stuff for now
    const ctx = this.refs.canvas.getContext('2d')
    ctx.fillStyle = 'green'
    ctx.fillRect(10, 10, 100, 100)
  }

  render() {
    return (
      <canvas ref="canvas" id="game-canvas"></canvas>
    )
  }
}

export default Canvas;
