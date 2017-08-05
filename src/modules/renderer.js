import CanvasTransform from '../helpers/canvasTransform'

/**
 * Class: Renderer
 * A singleton class that allows the global scope to render
 * to a specified canvas object.
 */
class Renderer {
  constructor (id) {
    console.log('Instantiating Renderer')
    if (id) {
      this.findCanvas(id)
    }

    this.tileWidth = 96
    this.tileHeight = 96

    this.offset = { x: 0, y: 0 }

    this.transform = new CanvasTransform()
  }

  findCanvas (id) {
    console.log('Searching for Canvas')
    this.canvas = document.getElementById(id)

    this.ctx = null
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d')
      console.log('Canvas Context Acquired')
    }

    return this.canvas
  }

  drawStrokeRect (x, y, width, height, color) {
    if (!this.ctx) { return }
    this.ctx.strokeStyle = color
    this.ctx.strokeRect(x, y, width, height)
  }

  drawFillRect (x, y, width, height, color) {
    if (!this.ctx) { return }
    this.ctx.fillStyle = color
    this.ctx.fillRect(x, y, width, height)
  }

  drawRect (x, y, color, fillOrStroke) {
    if (fillOrStroke === 'stroke') {
      this.drawStrokeRect(x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight, color)
    } else if (fillOrStroke === 'fill') {
      this.drawFillRect(x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight, color)
    }
  }

  drawLine (x1, y1, x2, y2, color) {
    if (!this.ctx) { return }
    if (!color) {
      color = 'black'
    }
    this.ctx.strokeStyle = color

    this.ctx.beginPath()
    this.ctx.moveTo(x1 * this.tileWidth, y1 * this.tileHeight)
    this.ctx.lineTo(x2 * this.tileWidth, y2 * this.tileHeight)
    this.ctx.stroke()
  }

  drawGrid (width, height) {
    for (let row = 0; row < height; row++) {
      this.drawLine(0, row, width, row, 'black')
    }
    for (let col = 0; col < height; col++) {
      this.drawLine(col, 0, col, height, 'black')
    }
  }

  clear () {
    if (this.canvas) {
      // Save the current transformation matrix
      this.ctx.save()

      // Reset the transformation matrix and clear
      this.ctx.setTransform(1, 0, 0, 1, 0, 0)
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      // Restore the previous transformation matrix
      this.ctx.restore()
    }
  }

  getTransform (clone) {
    return (clone) ? new CanvasTransform(this.transform.m) : this.transform.m
  }

  getOffset () {
    return this.offset
  }

  setOffset (xOffset, yOffset) {
    this.transform.translate(xOffset, yOffset)

    let m = this.transform.m
    this.ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5])
    this.offset = { x: xOffset, y: yOffset }
  }

  convertCanvasCoordsToTileCoords (x, y) {
    return {
      x: parseInt(x / this.tileWidth, 10),
      y: parseInt(y / this.tileHeight, 10)
    }
  }
}

let renderer = new Renderer()

export default renderer
