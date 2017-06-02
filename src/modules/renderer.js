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
  }

  findCanvas (id) {
    console.log('Searching for Canvas')
    this.canvas = document.getElementById(id)

    this.ctx = null
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d')
      console.log('Canvas Context Acquired')
    }
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

  drawRect (x, y, width, height, color, fillOrStroke) {
    if (fillOrStroke === 'stroke') {
      this.drawStrokeRect(x, y, width, height, color)
    } else if (fillOrStroke === 'fill') {
      this.drawFillRect(x, y, width, height, color)
    }
  }

  drawLine(x1, y1, x2, y2, color) {
    if (!this.ctx) { return }
    if (!color) {
      color = 'black'
    }
    this.ctx.strokeStyle = color

    this.ctx.beginPath()
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.stroke()
  }

  drawGrid(width, height, tileWidth, tileHeight, offsetX, offsetY) {
    for (let row = 0; row < height; row++) {
      this.drawLine(0, row * tileHeight, width * tileWidth, row * tileHeight, 'black')
    }
    for (let col = 0; col < height; col++) {
      this.drawLine(col * tileWidth, 0, col * tileHeight, height * tileWidth, 'black')
    }
  }
}

let renderer = new Renderer()

export default renderer
