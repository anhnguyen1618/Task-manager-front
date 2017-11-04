import axios from 'axios'
import { loginAction } from './actions'

const ROOT = '/api'

axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

export function fetchTasks() {
  return axios.get(`${ROOT}/task/get`)
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
  return axios.get(`${ROOT}/employee/getall`)
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
      localStorage.setItem('token', res.headers['Authorization']);
      console.log(loginAction(res.data))
      return loginAction(res.data);
    })
}

export function logout() {
  return axios.post(`${ROOT}/logout`)
}

export function checkUser(data) {
  return axios.get(`${ROOT}/employee/getemp`)
}
