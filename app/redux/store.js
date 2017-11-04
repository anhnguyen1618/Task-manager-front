import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'

const sidePaneltriggered = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_SIDE_PANEL':
      return true
    case 'HIDE_SIDE_PANEL':
      return false
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

const tasks = (state = [], action) => {
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

const people = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_PEOPLE':
      return action.payload
    case "ADD_PEOPLE":
      return state.concat(action.payload)
    case "DELETE_PEOPLE":
      return state.filter(person => person.username !== action.payload.username)
    case "UPDATE_PEOPLE":
      return state.map(person => person.username === action.payload.username ? action.payload : person)
  }
  return state;
}

const sortBy = (sortBy = "name", action) => {
  return (action.type === "CHANGE_SORT_CATEGORY" ? action.sortBy : sortBy);
}

const sortOrder = (sortOrder = "ascending", action) => {
  return (action.type === "CHANGE_SORT_ORDER" ? action.sortOrder : sortOrder);
}

const idOfDeleteEntry = (idOfDeleteEntry = "", action) => {
  switch (action.type) {
    case 'ADD_ID':
      return action.id;
    default:
      return idOfDeleteEntry;
  }
}

const showConfirm = (showConfirm = false, action) => {
  switch (action.type) {
    case 'SHOW_CONFIRM':
      return true;
    case 'HIDE_CONFIRM':
      return false;
    default:
      return showConfirm;
  }
}

const user = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
      return null
  }
  return state
}

const reducer = combineReducers({
  form: formReducer,
  sidePaneltriggered,
  selectedTask,
  tasks,
  people,
  sortBy,
  sortOrder,
  idOfDeleteEntry,
  showConfirm,
  user,
  routing: routerReducer
})

export default createStore(reducer)
