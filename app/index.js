import React from 'react'
import ReactDOM from 'react-dom'
import routes from './config/routes'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import users from 'redux/modules/users'

const store = createStore(users)

const app = (
  // Provider provides a way to give each component a piece of the store
  <Provider store={store}>
    {routes}
  </Provider>
)

ReactDOM.render(app, document.getElementById('app'))
