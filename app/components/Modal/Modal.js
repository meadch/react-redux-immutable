import React, { PropTypes } from 'react'
import { default as ReactModal } from 'react-modal'
import {
  newDuckTop, pointer, newDuckInputContainer,
  newDuckInput, submitDuckBtn, darkBtn } from './styles.css'

const modalStyles = {
  content: {
    width: 350,
    margin: '0px auto',
    height: 220,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0,
  },
}

const {object, string, func, bool } = PropTypes

Modal.propTypes = {
  duckText: string.isRequired,
  isOpen: bool.isRequired,
  isSubmitDisabled: bool.isRequired,
  user: object.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
  updateDuckText: func.isRequired,
}


const Modal = (props) => {
  console.log(props)
  return (
    <span className={darkBtn} onClick={props.openModal}>
      <ReactModal style={modalStyles} isOpen={props.duckText}>
        <div className={newDuckTop}>
          <span>{'Add new duck...'}</span>
          <span onClick={props.closeModal} className={pointer}>{'X'}</span>
        </div>
        <div className={newDuckInputContainer}>
          <textarea
            onChange={ (e) => props.updateDuckText(e.target.value)}
            value={props.duckText}
            maxLength={140}
            type='text'
            className={newDuckInput}
            placeholder={"What's on your mind?"}
            />
        </div>

      </ReactModal>
    </span>
  )
  props.isOpen ?
          <div>Display Modal: {props.duckText}</div> :
          <div>Modal aint open fool.</div>
}

export default Modal
