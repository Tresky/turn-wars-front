import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import turnWarsReducer from './reducers';

const store = createStore(turnWarsReducer, composeWithDevTools(
  applyMiddleware(thunk)
));

export default store
