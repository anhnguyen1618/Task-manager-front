import store from "./store.js";

export function getTaskbyID(id) {
  return store.getState().tasks.filter(task => task.id.toString() === id.toString())[0]
}

export function getUser() {
  return store.getState().user
}
