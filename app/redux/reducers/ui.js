import { combineReducers } from 'redux'

const sidePaneltriggered = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_SIDE_PANEL':
      return true
    case 'HIDE_SIDE_PANEL':
      return false
  }
  return state
}

export default combineReducers({
  sidePaneltriggered
})

