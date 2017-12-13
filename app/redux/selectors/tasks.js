
import store from '../store'

export function getAllTasks(state) {
  return state.tasks.data
}

export function getSelectedTask(state) {
  return state.tasks.selectedTask
}

export function getTaskbyID(state, id) {
  return state.tasks.data.find(task => task.id.toString() === id.toString())
}
