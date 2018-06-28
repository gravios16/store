import React from 'react'
import ReactDOM from 'react-dom'
import ConnectedApp from './components/App'

import reducer from './reducers'
import middleware from './middleware'
import { Provider } from 'react-redux'
import { createStore } from 'redux' 

const store = createStore(reducer, middleware)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
);