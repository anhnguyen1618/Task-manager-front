export function loadTasksAction(tasks) {
  return { type: 'LOAD_TASKS', payload: tasks }
}

export function addTasksAction(tasks) {
  return { type: 'ADD_TASKS', payload: tasks }
}

export function updateTasksAction(task) {
  return { type: 'UPDATE_TASKS', payload: task }
}

export function deleteTaskAction(id) {
  return { type: 'DELETE_TASK', payload: id }
}

export function loadPeopleAction(people) {
  return { type: 'LOAD_PEOPLE', payload: people }
}

export function addPeople(people) {
  return { type: 'ADD_PEOPLE', payload: people }
}

export function updatePeopleAction(people) {
  return { type: 'UPDATE_PEOPLE', payload: people }
}

export function deletePeopleAction(people) {
  return { type: 'DELETE_PEOPLE', payload: people }
}

export function loginAction(user) {
  return { type: 'LOGIN', payload: user }
}
