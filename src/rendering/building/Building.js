import { Component } from 'react'
import './Building.css'

import renderer from '../../modules/renderer'

class Building extends Component {
  constructor(props) {
    super(props)

    console.log('Building', props)
    this.state = {
      name: this.props.building.name,
      buildableUnits: this.props.building.buildable_units,
      coordinate: this.props.building.coordinate
    }
  }

  renderBuilding() {
    let color = null
    if (this.state.name === 'castle') {
      color = 'rgba(255, 0, 0, 0.6)'
    }

    renderer.drawRect(this.state.coordinate.x, this.state.coordinate.y, color, 'fill')
  }

  componentDidMount() {
    this.renderBuilding()
  }
  componentDidUpdate() {
    this.renderBuilding()
  }

  render() {
    return null
  }
}

export default Building;
