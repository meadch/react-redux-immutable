import React, { PropTypes } from 'react'
import { Authenticate } from 'components'
import { connect } from 'react-redux'
import * as userActionCreators from 'redux/modules/users'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'

const AuthenticateContainer = React.createClass({
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    fetchAndHandleAuthedUser: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  handleAuth () {
    this.props.fetchAndHandleAuthedUser()
    .then( () => {
      this.context.router.replace('feed')
    })
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

function mapStateToProps({users}){
  return {
    isFetching: users.isFetching,
    error: users.error,
  }
}

function mapDispatchtoProps(dispatch){
  return bindActionCreators( userActionCreators, dispatch )
}

export default connect(mapStateToProps, mapDispatchtoProps)(AuthenticateContainer)
