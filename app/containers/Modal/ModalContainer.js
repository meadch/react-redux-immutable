import React, { PropTypes } from 'react'
import {Modal} from 'components'
import { connect } from 'react-redux'

const ModalContainer = React.createClass({
  render() {
    return <Modal
              duckText={this.props.duckText}
              isOpen={this.props.isOpen}
            />
  }
})

function mapStateToProps({modal}){
  return {
    duckText: modal.duckText,
    isOpen: modal.isOpen,
  }
}

export default connect(mapStateToProps)(ModalContainer)
