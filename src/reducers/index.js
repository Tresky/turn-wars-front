import { combineReducers } from 'redux';
import matches from './matches.js';
import app from './app.js';

const turnWarsReducers = combineReducers({
  matches,
  app
})

export default turnWarsReducers
