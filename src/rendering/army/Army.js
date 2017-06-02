import React, { Component } from 'react'
import './Army.css'

import Building from '../building/Building'

function renderBuildings(buildings) {
  return buildings.map((building, index) => {
    return <Building key={index} building={building} />
  })
}

class Army extends Component {
  constructor(props) {
    super(props)

    console.log('Army', props)
    this.state = {
      buildableUnits: this.props.army.name,
      buildings: this.props.army.buildings,
      buildingData: this.props.army.building_data,
      units: this.props.army.units,
      unitData: this.props.army.unit_data
    }
  }

  componentDidMount() {}
  componentDidUpdate() {}

  render() {
    return (
      <div>
        { renderBuildings(this.state.buildings) }
      </div>
    )
  }
}

export default Army;
