import { combineReducers } from 'redux'

const data = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_PEOPLE':
      return action.payload
    case 'ADD_PEOPLE':
      return state.concat(action.payload)
    case 'DELETE_PEOPLE':
      return state.filter(person => person.username !== action.payload.username)
    case 'UPDATE_PEOPLE':
      return state.map(person => person.username === action.payload.username ? action.payload : person)
  }
  return state
}

const currentUser = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
      return null
  }
  return state
}

const sortCategory = (sortCategory = 'userName', action) => {
  return (action.type === 'CHANGE_SORT_CATEGORY' ? action.sortCategory : sortCategory)
}

const sortOrder = (sortOrder = 'ascending', action) => {
  return (action.type === 'CHANGE_SORT_ORDER' ? action.sortOrder : sortOrder)
}

export default combineReducers({
  data,
  currentUser,
  sortCategory,
  sortOrder
})
