import axios from 'axios'
import { loginAction, loadTasksAction, loadPeopleAction, addTasksAction,
        updateTasksAction, deleteTaskAction, addPeopleAction,
        deletePeopleAction, updatePeopleAction } from './actions'

const ROOT = '/api';

const getToken = () => localStorage.getItem('token')

axios.defaults.headers.common['Authorization'] = getToken();

axios.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
})

export function fetchTasks() {
  return axios.get(`${ROOT}/tasks`)
    .then(res => loadTasksAction(res.data))
}

export function addTask(data) {
  return axios.post(`${ROOT}/tasks`, data)
    .then(res => addTasksAction(res.data))
}

export function modifyTask(data) {
  return axios.put(`${ROOT}/tasks/${data.id}`, data)
    .then(res => updateTasksAction(res.data))
}

export function eraseTask(id) {
  return axios.delete(`${ROOT}/tasks/${id}`)
    .then(res => deleteTaskAction({id}))
}

export function fetchPeople() {
  return axios.get(`${ROOT}/users`)
    .then(res => loadPeopleAction(res.data))
}

export function createPeople(data) {
  return axios.post(`${ROOT}/signUp`, data)
    .then(res => addPeopleAction(res.data))
}

export function updatePeople(data) {
  return axios.put(`${ROOT}/users/${data.userName}`, data)
    .then(res => updatePeopleAction(res.data))
}

export function deletePeople(userName) {
  return axios.delete(`${ROOT}/users/${userName}`)
    .then(res => deletePeopleAction({userName}))
}

export function login(data) {
  return axios.post(`${ROOT}/login`, data)
    .then(res => {
      localStorage.setItem('token', res.headers['authorization'])
      return loginAction(res.data);
    })
}

export function logout() {
  return axios.get(`${ROOT}/logout`)
  .then(res => {
    localStorage.setItem('token', '')
    window.location = '/'
  })
}

export function checkUser(data) {
  return axios.get(`${ROOT}/currentUser`)
    .then(res => {
      return loginAction(res.data)
    })
}
