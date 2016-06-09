import React, { PropTypes } from 'react'
import {Modal} from 'components'
import { connect } from 'react-redux'
import * as userActionCreators from 'redux/modules/users'
import * as modalActionCreators from 'redux/modules/modal'
import { bindActionCreators } from 'redux'

function mapStateToProps({modal, users}){
  const duckTextLength = modal.duckText.length
  return {
    user: users[users.authedId] ? users[users.authedId].info : {},
    duckText: modal.duckText,
    isOpen: modal.isOpen,
    isSubmitDisabled: duckTextLength === 0 || duckTextLength > 140 ? true : false,
  }
}

function mapDispatchtoProps(dispatch){
  const actionCreators = Object.assign({}, userActionCreators, modalActionCreators)
  return bindActionCreators( actionCreators, dispatch )
}

export default connect(mapStateToProps, mapDispatchtoProps)(Modal)
