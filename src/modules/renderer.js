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
}

let renderer = new Renderer()

export default renderer
