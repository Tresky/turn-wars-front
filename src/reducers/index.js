import { combineReducers } from 'redux';
import matches from './matches.js';
import app from './app.js';
import maps from './maps.js';

const turnWarsReducers = combineReducers({
  matches,
  app,
  maps,
})

export default turnWarsReducers
