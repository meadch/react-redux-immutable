import React, { PropTypes } from 'react'
import { Authenticate } from 'components'
import auth from 'helpers/auth'
import { connect } from 'react-redux'

const AuthenticateContainer = React.createClass({
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
  },
  handleAuth () {
    auth().then( (user) => {
      console.log("Authed User: ", user)
    })
  },
  render () {
    console.log("PROPS: ", this.props)
    return (
      <Authenticate
        isFetching={false}
        error=''
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

export default connect(mapStateToProps)(AuthenticateContainer)
