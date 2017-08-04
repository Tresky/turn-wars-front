export default class CanvasTransform {
  constructor (matrix) {
    this.reset(matrix)
  }

  reset (matrix) {
    // Be sure to clone the matrix to avoid reference edits
    this.m = (matrix) ? Object.assign([], matrix) : [1, 0, 0, 1, 0, 0]
    return this
  }

  multiply (matrix) {
    this.m[0] = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1]
    this.m[1] = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1]
    this.m[2] = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3]
    this.m[3] = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3]
    this.m[4] = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4]
    this.m[5] = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5]
    return this
  }

  invert () {
    let d = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2])
    this.m[0] = this.m[3] * d
    this.m[1] = -this.m[1] * d
    this.m[2] = -this.m[2] * d
    this.m[3] = this.m[0] * d
    this.m[4] = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4])
    this.m[5] = d * (this.m[1] * this.m[4] - this.m[0] * this.m[5])
    return this
  }

  rotate (rad) {
    let c = Math.cos(rad)
    let s = Math.sin(rad)
    this.m[0] = this.m[0] * c + this.m[2] * s
    this.m[1] = this.m[1] * c + this.m[3] * s
    this.m[2] = this.m[0] * -s + this.m[2] * c
    this.m[3] = this.m[1] * -s + this.m[3] * c
    return this
  }

  translate (x, y) {
    this.m[4] += this.m[0] * x + this.m[2] * y
    this.m[5] += this.m[1] * x + this.m[3] * y
    return this
  }

  scale (sx, sy) {
    this.m[0] *= sx
    this.m[1] *= sx
    this.m[2] *= sy
    this.m[3] *= sy
    return this
  }

  transformPoint (x, y) {
    return {
      x: x * this.m[0] + y * this.m[2] + this.m[4],
      y: x * this.m[1] + y * this.m[3] + this.m[5]
    }
  }
}