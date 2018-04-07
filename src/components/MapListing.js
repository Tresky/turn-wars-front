import React from 'react';
import './MatchListing.css'
import { alert, buttons, jumbotron } from 'bootstrap-css';

const MapListing = ({id, name}) => (
  <div className="map-listing">
    <h3>{name}</h3>
  </div>
)

export default MapListing

