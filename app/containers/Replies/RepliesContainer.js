import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Replies} from 'components'
import {staleReplies} from 'helpers/utils'
import * as repliesActionCreators from 'redux/modules/replies'

const RepliesContainer = React.createClass({
  getDefaultProps() {
    return {
      lastUpdated: 0,
      replies: {},
    }
  },
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    lastUpdated: PropTypes.number.isRequired,
    replies: PropTypes.object.isRequired,
    duckId: PropTypes.string.isRequired,
    fetchAndHandleReplies: PropTypes.func.isRequired,
  },
  componentDidMount(){
    if (staleReplies(this.props.lastUpdated)) {
      this.props.fetchAndHandleReplies(this.props.duckId)
    }
  },
  render () {
    return (
      <Replies
        isFetching={this.props.isFetching}
        error={this.props.error}
        lastUpdated={this.props.lastUpdated}
        replies={this.props.replies}
        duckId={this.props.duckId}
        />
    )
  },
})

function mapStateToProps (state, props) {
  const duckRepliesInfo = state.replies[props.duckId] || {}
  const {lastUpdated, replies} = duckRepliesInfo
  return {
    isFetching: state.replies.isFetching,
    error: state.replies.error,
    lastUpdated,
    replies,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(repliesActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RepliesContainer)
