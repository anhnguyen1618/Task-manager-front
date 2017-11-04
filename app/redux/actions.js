export function loadTasks(tasks) {
  return { type: 'LOAD_TASKS', payload: tasks }
}

export function addTasks(tasks) {
  return { type: 'ADD_TASKS', payload: tasks }
}

export function updateTasks(task) {
  return { type: 'UPDATE_TASKS', payload: task }
}

export function deleteTask(task) {
  return { type: 'DELETE_TASK', payload: task }
}

export function loadPeople(people) {
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
