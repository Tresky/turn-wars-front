import React, { Component } from 'react';
import MatchListing from './MatchListing.js';
import MapListing from './MapListing.js';
import './Lobby.css';

const Lobby = ({playerId, matches, maps, onRequestJoin, onMatchCreate}) =>  (
  <div className="lobby">
    <div className="map-list">
      {maps.map((element, idx) => {
        return (
          <div key={idx} className="map-row">
            <MapListing {...element} />
            <div className="create btn btn-primary inline" onClick={function() { onMatchCreate(playerId, element) }}>Create</div>
          </div>
        )
      })}
    </div>
    <div className="lobby-list">
      {matches.map((element, idx) => {
        return (
          <div key={idx}  className={`parity-${idx % 2 == 0 ? 'even' : 'odd'}`}>
            <MatchListing {...element} onJoin={function() { onRequestJoin(playerId, element.id) }} />
          </div>
        )
      })}
    </div>
  </div>
)

export default Lobby
