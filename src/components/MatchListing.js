import React from 'react';
import './MatchListing.css'
import { alert, buttons, jumbotron } from 'bootstrap-css';

const MatchListing = ({id, matchState, playersJoined, playersNeeded, scenario, onJoin}) => (
  <div className="match-listing" key={id}>
    <h3>{scenario}</h3>
    <div className="player-count">
      <div className="players-joined">{playersJoined}/</div>
      <div className="players-needed">{playersNeeded}</div>
    </div>
    <div className="match-state"> {matchState} </div>
    <div onClick={onJoin} className="match-join btn btn-info">Join</div>
  </div>
)

export default MatchListing
