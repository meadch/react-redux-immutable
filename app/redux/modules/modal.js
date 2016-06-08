const OPEN_MODAL = "OPEN_MODAL",
      CLOSE_MODAL = "CLOSE_MODAL",
      UPDATE_DUCK_TEXT = "UPDATE_DUCK_TEXT"

const initialState = {
  duckText: '',
  isOpen: false,
}

// ACTIONS
export function openModal(){
  return {
    type: OPEN_MODAL,
  }
}

export function closeModal(){
  return {
    type: CLOSE_MODAL,
  }
}

export function updateDuckText(){
  return {
    type: UPDATE_DUCK_TEXT,
    newDuckText,
  }
}

export default function modal (state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL :
      return {
        ...state,
        isOpen: true,
      }
    case CLOSE_MODAL :
      return {
        duckText: '',
        isOpen: false,
      }
    case UPDATE_DUCK_TEXT :
      return {
        ...state,
        duckText: action.newDuckText,
      }
    default :
      return state
  }
}
