import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {User} from 'components'
import * as usersActionCreators from 'redux/modules/users'
import * as usersDucksActionCreators from 'redux/modules/usersDucks'
import {staleUser, staleDucks} from 'helpers/utils'


const UserContainer = React.createClass({
  propTypes: {
      noUser: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      isFetching: PropTypes.bool.isRequired,
      error: PropTypes.string.isRequired,
      duckIds: PropTypes.array.isRequired,
      fetchAndHandleUser: PropTypes.func.isRequired,
      fetchAndHandleUsersDucks: PropTypes.func.isRequired,
      lastUpdated: PropTypes.number.isRequired,
  },
  componentDidMount(){
    const uid = this.props.routeParams.uid
    if (this.props.noUser === true || staleUser(this.props.lastUpdated)){
      this.props.fetchAndHandleUser(uid)
    }
    if (this.props.noUser === true || staleDucks(this.props.lastUpdated)){
      this.props.fetchAndHandleUsersDucks(uid)
    }
  },
  render(){
    console.log("NAME", this.props.name)
    return <User
        noUser={this.props.noUser}
        name={this.props.noUser ? '' : this.props.name}
        isFetching={this.props.isFetching}
        name={this.props.name}
        error={this.props.error}
        duckIds={this.props.duckIds} />
  }
})

function mapStateToProps ({users, userDucks}, props) {
  const specificUsersDucks = userDucks[props.routeParams.uid]
  const user = users[props.routeParams.uid]
  const noUser = typeof user === undefined
  const name = noUser ? '' : user.info.name
  return {
    noUser,
    name,
    isFetching: users.isFetching || userDucks.isFetching,
    error: users.error || userDucks.error,
    lastUpdated: specificUsersDucks ? specificUsersDucks.lastUpdated : 0,
    duckIds: specificUsersDucks ? specificUsersDucks.duckIds : [],
  }
}


function mapDispatchtoProps(dispatch){
  const actionCreators = {...usersActionCreators, ...usersDucksActionCreators}
  return bindActionCreators( actionCreators, dispatch )
}

export default connect(mapStateToProps, mapDispatchtoProps)(UserContainer)
