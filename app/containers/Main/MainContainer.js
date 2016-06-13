import React, {PropTypes} from 'react'
import { container, innerContainer } from './styles.css'
import { Navigation } from 'components'
import { connect } from 'react-redux'
import * as usersLikesActionCreators from 'redux/modules/usersLikes'
import { bindActionCreators } from 'redux'
const MainContainer = React.createClass({
  propTypes: {
    isAuthed: PropTypes.bool.isRequired,
    setUsersLikes: PropTypes.func.isRequired,
  },
  componentDidMount() {
    if (this.props.isAuthed === true) {
      this.props.setUsersLikes()
    }
  },
  componentWillReceiveProps(nextProps) {
    if (this.props.isAuthed !== nextProps.isAuthed) {
      this.props.setUsersLikes()
    }
  },
  render () {
    return (
      <div className={container}>
        <Navigation isAuthed = {this.props.isAuthed}/>
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  },
})


export default connect( ({users}) => ( {isAuthed: users.isAuthed} ), (dispatch) => { return bindActionCreators(usersLikesActionCreators, dispatch)} )(MainContainer)
