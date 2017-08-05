import React, { Component } from 'react';
import MatchListing from './MatchListing.js';

class Lobby extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.onMount()
  }

  render() { 
    console.log(this.props.matches)
    return (
      <div className="lobby-list">
        {this.props.matches.map((element) => {
          return (
            <MatchListing key={element} {...element}/>
          )
        })}
      </div>
    )
  }
}

export default Lobby
