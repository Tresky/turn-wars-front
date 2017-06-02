import { Component } from 'react'
import './MapTile.css'

import renderer from '../../modules/renderer'

class MapTile extends Component {
  constructor(props) {
    super(props)

    console.log('MapTile', props)
    this.state = {
      tile: props.tile,
      position: {
        x: props.x,
        y: props.y
      }
    }
  }

  renderTile() {
    let tileWidth = 32
    let tileHeight = 32

    let color = (this.state.tile === 'grass') ? 'green': 'gray'
    renderer.drawFillRect(this.state.position.x * tileWidth, this.state.position.y * tileWidth, tileWidth, tileHeight, color)
  }

  componentDidMount() {
    this.renderTile()
  }
  componentDidUpdate() {
    this.renderTile()
  }

  render() {
    return null
  }
}

export default MapTile;
