import { Component } from 'react'
import './MapTile.css'

import renderer from '../../modules/renderer'

class MapTile extends Component {
  constructor(props) {
    super(props)

    // console.log('MapTile', props)
    this.state = {
      tile: props.tile,
      position: {
        x: props.x,
        y: props.y
      }
    }
  }

  renderTile() {
    let color = (this.state.tile === 'grass') ? 'green': 'gray'
    renderer.drawRect(this.state.position.x, this.state.position.y, color, 'fill')
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
