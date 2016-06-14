import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {Feed} from 'components'
import * as feedActionCreators from 'redux/modules/feed'
import {bindActionCreators} from 'redux'
import {List} from 'immutable'


const { bool, string, func } = PropTypes
const FeedContainer = React.createClass({
  propTypes: {
    duckIds: PropTypes.instanceOf(List),
    newDucksAvailable: bool.isRequired,
    error: string.isRequired,
    isFetching: bool.isRequired,
    setAndHandleFeedListener: func.isRequired,
    resetNewDucksAvailable: func.isRequired,
  },
  componentDidMount(){
    // After mounting, need to set listener...
    this.props.setAndHandleFeedListener()
  },
  render() {
    return (
      <Feed
        newDucksAvailable={this.props.newDucksAvailable}
        error={this.props.error}
        isFetching={this.props.isFetching}
        resetNewDucksAvailable={this.props.resetNewDucksAvailable}
        duckIds={this.props.duckIds}
        />
    );
  }

});

function mapStateToProps({feed}){
  return {
    newDucksAvailable: feed.get('newDucksAvailable'),
    error: feed.get('error'),
    isFetching: feed.get('isFetching'),
    duckIds: feed.get('duckIds')
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(feedActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer)
