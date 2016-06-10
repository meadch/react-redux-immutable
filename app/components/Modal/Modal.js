import React, { PropTypes } from 'react'
import { default as ReactModal } from 'react-modal'
import {
  newDuckTop, pointer, newDuckInputContainer,
  newDuckInput, submitDuckBtn, darkBtn } from './styles.css'
import {formatNewDuck} from 'helpers/utils'
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
  handleDuckStuff: func.isRequired,
}

function Modal(props){
  console.log("MODAL PROPS: ", props)
  function handleSubmitDuckBtn(){
    props.handleDuckStuff(formatNewDuck(props.duckText, props.user))
  }
  return (
    <span className={darkBtn} onClick={props.openModal}>
      {'Add Algo'}
      <ReactModal style={modalStyles} isOpen={props.isOpen} onRequestClose={props.closeModal}>
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
        <button
          className={submitDuckBtn}
          disabled={props.isSubmitDisabled}
          onClick={handleSubmitDuckBtn}
          >
          Hello
        </button>
      </ReactModal>
    </span>
  )
}

export default Modal
