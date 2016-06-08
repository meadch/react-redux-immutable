import auth, {logout, saveUser } from 'helpers/auth'
import {formatUserInfo} from 'helpers/utils'

const AUTH_USER = 'AUTH_USER',
      UNAUTH_USER = 'UNAUTH_USER',
      FETCHING_USER = 'FETCHING_USER',
      FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS',
      FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'

// User action creators
export function authUser(uid) {
    return {
      type: AUTH_USER,
      uid,
    }
}

export function unAuthUser() {
  return {
    type: UNAUTH_USER,
  }
}

function fetchingUser() {
  return {
    type: FETCHING_USER,
  }
}
function fetchingUserFailure() {
  return {
    type: FETCHING_USER_FAILURE,
    error: 'Error fetching user.',
  }
}

export function fetchingUserSuccess(uid, user, timestamp) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp,
  }
}

export function fetchAndHandleAuthedUser() {
  return function (dispatch){
    dispatch(fetchingUser())
    return auth()
    .then( ({facebook, uid}) => {
      const userInfo = formatUserInfo(facebook.displayName, facebook.profileImageURL, uid)
      return dispatch(fetchingUserSuccess(uid, userInfo, Date.now()))
    })
    .then( ({user}) => saveUser(user))
    .then( (user) => dispatch(authUser(user.uid)))
    .catch( (err) => dispatch(fetchingUserFailure()))
  }
}

export function logoutAndUnauth(){
  return function(dispatch){
    logout()
    dispatch(unAuthUser())
  }
}

// User reducers
const initialUserState = {
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    avatar: '',
  },
}

function user (state = initialUserState, action) {
  switch (action.type) {
    case FETCHING_USER_SUCCESS :
      return {
        ...state,
        info: action.user,
        lastUpdated: action.timestamp,
      }
    default :
      return state
  }
}

const initialState = {
  isFetching: false,
  error: '',
  isAuthed: false,
  authedId: '',
}

export default function users (state = initialState, action) {
  switch (action.type) {
    case AUTH_USER :
      return {
        ...state,
        isAuthed: true,
        authedId: action.uid,
      }
    case UNAUTH_USER :
      return {
        ...state,
        isAuthed: false,
        authedId: '',
      }
    case FETCHING_USER:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_USER_SUCCESS:
      return action.user === null
        ? {
          ...state,
          isFetching: false,
          error: '',
        }
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: user(state[action.uid], action),
        }
    default :
      return state
  }
}
