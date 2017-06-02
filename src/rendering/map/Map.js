import React, { Component } from 'react'
import './Map.css'

import MapLayer from '../mapLayer/MapLayer'

function renderLayers(layers) {
  return layers.map((layer, index) => {
    return <MapLayer key={index} layer={layer}/>
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

  componentDidMount() {}
  componentDidUpdate() {}

  render() {
    return (
      <div>
        { renderLayers(this.state.layers) }
      </div>
    )
  }
}

export default Map;
