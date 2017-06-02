import React, { Component } from 'react'
import './MapLayer.css'

import MapTile from '../mapTile/MapTile'

function renderTiles(tiles) {
  return tiles.map((row, y) => {
    return row.map((tile, x) => {
      return <MapTile tile={tile} x={x} y={y} />
    })
  })
}

class MapLayer extends Component {
  constructor(props) {
    super(props)

    console.log('MapLayer', props)
    this.state = {
      tiles: props.layer.tiles,
    }
  }

  componentDidMount() {}
  componentDidUpdate() {}

  render() {
    return (
      <div>
        { renderTiles(this.state.tiles) }
      </div>
    )
  }
}

export default MapLayer;
