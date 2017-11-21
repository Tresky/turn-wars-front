import React from 'react'
import ReactDOM from 'react-dom'
import ActiveApp from './containers/ActiveApp'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import { Provider } from 'react-redux'
import store from './store.js';

ReactDOM.render(
  <Provider store={store}>
    <ActiveApp />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
