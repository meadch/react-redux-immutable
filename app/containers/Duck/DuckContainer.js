import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {Duck} from 'components'
import * as usersLikesActions from 'redux/modules/usersLikes'
import {bindActionCreators} from 'redux'


const { string, object, bool, number, func } = PropTypes
const DuckContainer = React.createClass({
  propTypes: {
    duckId: string.isRequired,
    numberOfLikes: number,
    isLiked: bool.isRequired,
    hideLikeCount: bool.isRequired,
    hideReplyBtn: bool.isRequired,
    handleDeleteLike: func.isRequired,
    addAndHandleLike: func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  getDefaultProps() {
    return {
      hideLikeCount: true,
      hideReplyBtn: false,
    }
  },
  goToProfile(e){
    e.preventDefault()
    this.context.router.push(`/${this.props.duck.uid}`)
  },
  handleClick(e){
    e.preventDefault()
    this.context.router.push(`/duckDetail/${this.props.duck.duckId}`)
  },
  render() {
    return <Duck
              goToProfile={this.goToProfile}
              onClick={this.props.hideReplyBtn === true ? null : this.handleClick }
              {...this.props }
            />
  }

});

function mapStateToProps({ ducks, likeCount, usersLikes }, props){
  return {
    duck: ducks[props.duckId],
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn,
    isLiked: usersLikes[props.duckId] === true,
    numberOfLikes: likeCount[props.duckId],
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(usersLikesActions,dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DuckContainer)
