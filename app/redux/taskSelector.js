import store from "./store.js";

export function getTaskbyID(id) {
  return store.getState().tasks.data.filter(task => task.id.toString() === id.toString())[0]
}

export function getUser() {
  return store.getState().users.currentUser
}
