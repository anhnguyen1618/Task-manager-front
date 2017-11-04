import store from '../store'

export function getCurrentUser(state) {
  if (state) return state.users.currentUser
  return store.getState().users.currentUser
}

export function getAllUsers(state) {
  return state.users.data
}

export function getSortCategory(state) {
  return state.users.sortCategory
}

export function getSortOrder(state) {
  return state.users.sortOrder
}