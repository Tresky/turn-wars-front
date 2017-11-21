import React from 'react';
import './MatchListing.css'

const MatchListing = ({id, matchState, playersJoined, playersNeeded, scenario}) => (
  <div className="match-listing" key={id}>
    <h3>{scenario}</h3>
    <div className="player-count">
      <div className="players-joined">{playersJoined}/</div>
      <div className="players-needed">{playersNeeded}</div>
    </div>
    <div className="match-state"> {matchState} </div>
  </div>
)

export default MatchListing
