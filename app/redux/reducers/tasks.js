import { combineReducers } from 'redux'

const data = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_TASKS':
      return action.payload
    case 'ADD_TASKS':
      return state.concat(action.payload)
    case 'UPDATE_TASKS':
      const newTasks = state.map(task => task.id === action.payload.id ? action.payload : task)
      return newTasks
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload.id)
  }
  return state
}

const selectedTask = (state = '', action) => {
  switch (action.type) {
    case 'ADD_SELECTED_ID':
      return action.id
    case 'DELETE_SELECTED_ID':
      return ''
  }
  return state
}

export default combineReducers({
  data,
  selectedTask
})

