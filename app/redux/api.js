import axios from 'axios'
import { loginAction, loadTasksAction, loadPeopleAction } from './actions'

const ROOT = '/api'

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
  return axios.post(`${ROOT}/task/create`, data)
}

export function modifyTask(data) {
  return axios.put(`${ROOT}/task/update`, data)
}

export function eraseTask(id) {
  return axios.delete(`${ROOT}/task/delete?id=${id}`)
}

export function fetchPeople() {
  return axios.get(`${ROOT}/users`)
    .then(res => loadPeopleAction(res.data))
}

export function createPeople(data) {
  return axios.post(`${ROOT}/employee/create`, data)
}

export function updatePeople(data) {
  return axios.put(`${ROOT}/employee/update`, data)
}

export function deletePeople(username) {
  return axios.delete(`${ROOT}/employee/delete?username=${username}`)
}

export function login(data) {
  return axios.post(`${ROOT}/login`, data)
    .then(res => {
      localStorage.setItem('token', res.headers['authorization'])
      return loginAction(res.data);
    })
}

export function logout() {
  return axios.post(`${ROOT}/logout`)
}

export function checkUser(data) {
  return axios.get(`${ROOT}/currentUser`)
    .then(res => {
      return loginAction(res.data)
    })
}
