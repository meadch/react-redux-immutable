import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from './config/routes'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {checkIfAuthed} from 'helpers/auth'
import * as reducers from 'redux/modules'

const store = createStore( combineReducers(reducers),
                            compose(
                                  applyMiddleware(thunk),
                                  window.devToolsExtension() ?  window.devToolsExtension() : (f) => f
                                )
                              )

function checkAuth(nextState, replace){
  console.log("RUNNING")
  const isAuthed = checkIfAuthed(store)
  const nextPathName = nextState.location.pathname

  console.log(isAuthed, nextPathName)
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
    { getRoutes(checkAuth) }
  </Provider>
)


ReactDOM.render(app, document.getElementById('app'))
