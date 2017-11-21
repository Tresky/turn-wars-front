import React, { Component } from 'react';
import MatchListing from './MatchListing.js';
import './Lobby.css';

const Lobby = ({playerId, matches, onRequestJoin}) =>  (
  <div className="lobby-list">
    {matches.map((element, idx) => {
      return (
        <div key={element.id} onClick={function() { console.log('called'); onRequestJoin(playerId, element.id) }}  className={`parity-${idx % 2 == 0 ? 'even' : 'odd'}`}>
          <MatchListing {...element}/>
        </div>
      )
    })}
  </div>
)

export default Lobby
