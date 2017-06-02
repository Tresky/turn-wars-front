import React, { Component } from 'react'
import './Unit.css'

import renderer from '../../modules/renderer'

class Unit extends Component {
  constructor(props) {
    super(props)

    console.log('Unit', props)
    this.state = {
      name: this.props.unit.name,
      army: this.props.unit.army,
      coordinate: this.props.unit.coordinate,
      armor: this.props.unit.armor,
      transport: this.props.unit.transport,
      weapon: this.props.unit.weapon
    }
  }

  renderUnit() {
    let color = null
    switch (this.state.name) {
      case 'footman':
        color = 'rgba(0, 0, 255, 0.7)'
        break
      case 'horseman':
        color = 'rgba(100, 0, 100, 0.7)'
        break
      case 'catapult':
        color = 'rgba(150, 130, 100, 0.7)'
        break
      case 'dragon':
        color = 'rgba(0, 0, 0, 0.3)'
        break
      default:
        console.log('Invalid Unit', this.state.name)
        return
    }

    renderer.drawRect(this.state.coordinate.x, this.state.coordinate.y, color, 'fill')
  }

  componentDidMount() {
    this.renderUnit()
  }
  componentDidUpdate() {
    this.renderUnit()
  }

  render() {
    return null
  }
}

export default Unit;
