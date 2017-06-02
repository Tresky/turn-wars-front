import React, { Component } from 'react'
import './Map.css'

import renderer from '../../modules/renderer'

import MapLayer from '../mapLayer/MapLayer'
import Army from '../army/Army'

function renderLayers(layers) {
  return layers.map((layer, index) => {
    return <MapLayer key={`layer-${index}`} layer={layer} />
  })
}

function renderArmies(armies) {
  return armies.map((army, index) => {
    return <Army key={`army-${index}`} army={army} />
  })
}

class Map extends Component {
  constructor(props) {
    super(props)

    console.log('Map', props)
    this.state = {
      armies: props.scenario.armies,
      board: props.scenario.board,
      // state.layers will eventually contain all of
      // the layers objects once they are made in the API
      layers: [props.scenario.board]
    }
  }

  renderGrid() {
    let height = this.state.layers[0].tiles.length
    let width = this.state.layers[0].tiles[0].length
    renderer.drawGrid(width, height, 32, 32, 0, 0)
  }

  componentDidMount() {
    this.renderGrid()
  }
  componentDidUpdate() {
    this.renderGrid()
  }

  render() {


    return (
      <div>
        { renderLayers(this.state.layers) }
        { renderArmies(this.state.armies) }
      </div>
    )
  }
}

export default Map;
