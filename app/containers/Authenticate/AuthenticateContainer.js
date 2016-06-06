import React, { PropTypes } from 'react'
import { Authenticate } from 'components'
import { connect } from 'react-redux'
import * as userActionCreators from 'redux/modules/users'
import { bindActionCreators } from 'redux'

const AuthenticateContainer = React.createClass({
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    fetchAndHandleAuthedUser: PropTypes.func.isRequired,
  },
  handleAuth () {
    this.props.fetchAndHandleAuthedUser()
  },
  render () {
    return (
      <Authenticate
        isFetching={this.props.isFetching}
        error= {this.props.error}
        onAuth={this.handleAuth}/>
    )
  },
})

function mapStateToProps(state){
  return {
    isFetching: state.isFetching,
    error: state.error,
  }
}

function mapDispatchtoProps(dispatch){
  return bindActionCreators( userActionCreators, dispatch )
}

export default connect(mapStateToProps, mapDispatchtoProps)(AuthenticateContainer)
