import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from './config/routes'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {checkIfAuthed} from 'helpers/auth'
import * as reducers from 'redux/modules'
import {routerReducer, syncHistoryWithStore} from 'react-router-redux'
import {hashHistory} from 'react-router'

const store = createStore( combineReducers({...reducers, routing: routerReducer }),
                            compose(
                                  applyMiddleware(thunk),
                                  window.devToolsExtension() ?  window.devToolsExtension() : (f) => f
                                )
                              )

const history = syncHistoryWithStore(hashHistory, store)

function checkAuth(nextState, replace){
  const isAuthed = checkIfAuthed(store)
  const nextPathName = nextState.location.pathname
  if (nextPathName === '/' ||  nextPathName === '/auth'){
    if(isAuthed === true){
      replace('/feed')
    }
  } else {
    if (isAuthed != true){
      replace('/auth')
    }
  }
}

const app = (
  // Provider provides a way to give each component a piece of the store
  <Provider store={store}>
    { getRoutes(checkAuth, history) }
  </Provider>
)


ReactDOM.render(app, document.getElementById('app'))
