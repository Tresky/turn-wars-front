import React, { Component } from 'react'
import './Canvas.css'

import includes from 'lodash/includes'

import renderer from '../../modules/renderer'
import stateRenderer from '../../modules/stateRenderer'

import CanvasTransform from '../../helpers/canvasTransform'

class Canvas extends Component {
  constructor() {
    super()
    this.state = {
      data: null
    }

    // Boolean array that holds the scrolls state of each direction.
    // A true value means the canvas should scroll in that direction;
    // utilized in the this.update() method to set the renderer offset.
    this.translateDir = {
      left: false,
      right: false,
      up: false,
      down: false,

      /**
       * Using a key code from a key event as a target, set the value
       * in the translateDir boolean array appropriately.
       * @param {String} keyCode Direction to target
       * @param {Boolean} value Value to set to the target
       */
      setDirection(keyCode, value) {
        this.left  = (keyCode === 'ArrowLeft')  ? value : this.left,
        this.right = (keyCode === 'ArrowRight') ? value : this.right,
        this.up    = (keyCode === 'ArrowUp')    ? value : this.up,
        this.down  = (keyCode === 'ArrowDown')  ? value : this.down
      }
    }

    this.updateInterval = 20
    this.updateIntervalId = null

    // Event listeners for changing the translation states.
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  /**
   * If an arrow key is pressed down, the translation array will be
   * given a truthy value to signal movement.
   * @param {Object} evt Event object from the `keydown` event.
   */
  handleKeyDown(evt) {
    if (includes(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'], evt.code)) {
      evt.preventDefault()
      evt.stopPropagation()

      this.translateDir.setDirection(evt.code, true)
    }
  }

  /**
   * If an arrow key is let up, the translation array will be
   * given a falsey value to signal movement ceasing.
   * @param {Object} evt Event object from the `keyup` event.
   */
  handleKeyUp(evt) {
    if (includes(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'], evt.code)) {
      evt.preventDefault()
      evt.stopPropagation()

      this.translateDir.setDirection(evt.code, false)
    }
  }

  /**
   * Using the translation array stored in the component, an
   * X and Y offset is determine and the renderer is told how
   * much to translate the canvas.
   */
  handleScroll() {
    let step = 10

    // Addition and subtraction are used (as opposed to using
    // equals) to allow for two opposing keys (left and right)
    // to cancel one another out rather than one dominating
    // the other.

    let offset = { x: 0, y: 0 }
    if (this.translateDir.left) {
      offset.x += step
    }
    if (this.translateDir.right) {
      offset.x -= step
    }
    if (this.translateDir.up) {
      offset.y += step
    }
    if (this.translateDir.down) {
      offset.y -= step
    }

    stateRenderer.setOffset(offset.x, offset.y)
  }

  /**
   * Handle updating various aspects in the Canvas component.
   * Namely, the scrolling offset. This function will be called
   * using setInterval() to make sure it is updating smoothly.
   */
  update() {
    // Set offset
    this.handleScroll()
  }

  /**
   * Bind all event listeners and kick off the update interval.
   */
  componentWillMount() {
    this.updateIntervalId = setInterval(this.update.bind(this), this.updateInterval)

    document.addEventListener('keydown', this.handleKeyDown, false)
    document.addEventListener('keyup', this.handleKeyUp, false)
  }

  /**
   * Remove all event listeners and cancel the update interval.
   */
  componentWillUnmount() {
    if (this.updateIntervalId) {
      clearInterval(this.updateIntervalId)
    }
    document.removeEventListener('keydown')
    document.removeEventListener('keyup')
  }

  /**
   * Initialize the renderer singleton by allowing it to find
   * the newly created canvas element. This has to be done on
   * the way back up the recursive descent because the canvas
   * technically doesn't exist until right before this function
   * is called.
   * 
   * Due to this, we force a redraw at the end of this function
   * give each child element another chance to draw itself.
   */
  componentDidMount() {
    let canvas = document.getElementById("game-canvas")

    // Set the size of the canvas
    canvas.width = document.body.clientWidth * 0.75
    canvas.height = document.body.clientHeight

    canvas.onclick = (evt) => {
      let pos = getCanvasCursorPosition(canvas, evt)
      let tilePos = renderer.convertCanvasCoordsToTileCoords(pos.x, pos.y)

      console.log('TilePos', tilePos)
    }

    console.log('Renderer', renderer)
    console.log('Example', this.state.data)
    renderer.findCanvas('game-canvas')

    stateRenderer.setState(this.state.data)
  }

  /**
   * Render the initial DOM elements.
   */
  render() {
    return (
      <canvas id="game-canvas"></canvas>
    )
  }
}

/**
 * Converts mouse click coordinates from a click event into where the
 * click was on the transformed canvas object.
 * @param {element} canvas Canvas object to compare against
 * @param {object} evt Mouse click event
 * @return {object} X and Y position of the mouse click relative to the canvas
 */
function getCanvasCursorPosition (canvas, evt) {
  let rect = canvas.getBoundingClientRect()
  let x = evt.clientX - rect.left
  let y = evt.clientY - rect.top
  return renderer.getTransform(true).invert().transformPoint(x, y)
}

export default Canvas;
