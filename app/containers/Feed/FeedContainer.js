import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {Feed} from 'components'
import * as feedActionCreators from 'redux/modules/feed'
import {bindActionCreators} from 'redux'


const { bool, string, func } = PropTypes
const FeedContainer = React.createClass({
  propTypes: {
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
  const { newDucksAvailable, error, isFetching, duckIds } = feed
  return {
    newDucksAvailable,
    error,
    isFetching,
    duckIds,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(feedActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer)
