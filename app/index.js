import React from 'react'
import ReactDOM from 'react-dom'
import routes from './config/routes'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import users from 'redux/modules/users'
import thunk from 'redux-thunk'

const store = createStore(users, applyMiddleware(thunk))

const app = (
  // Provider provides a way to give each component a piece of the store
  <Provider store={store}>
    {routes}
  </Provider>
)

ReactDOM.render(app, document.getElementById('app'))
