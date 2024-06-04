import axios from 'axios'
import queryString from 'query-string'
import { API } from '../../config'

export const userprofile = async (userId) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.get(`${API}/profile/${userId}`)

  if (data) {
    return data
  }
}

export const loginuser = async (user) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.post(`${API}/signin`, user)

  if (data) {
    return data
  }
}

export const Signup = async (user) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.post(`${API}/signup`, user)

  if (data) {
    return data
  }
}

export const getUsers = async (organiId, userId, filter) => {
  // userinfo in an object e.g {username,password}

  const query = queryString.stringify(filter)
  const data = await axios.get(`${API}/user/${organiId}/${userId}?${query}`)

  if (data) {
    return data.data
  }
}

// for operator pagination
export const getOperators = async (organiId, userId, filter) => {
  // userinfo in an object e.g {username,password}

  const query = queryString.stringify(filter)
  const data = await axios.get(`${API}/users/${organiId}/${userId}?${query}`)

  if (data) {
    return data.data
  }
}

export const createOperator = async (organiId, userId, operator) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.post(
    `${API}/operator/${organiId}/${userId}`,
    operator
  )

  if (data) {
    return data.data
  }
}

export const updateOperator = async (userId, organiId, operator) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.put(`${API}/user/${userId}/${organiId}`, operator)

  if (data) {
    return data.data
  }
}

export const confirmOperator = async (userId, organiId, operator) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.post(
    `${API}/confirmooperator/${userId}/${organiId}`,
    operator
  )

  if (data) {
    return data.data
  }
}
export const checkOldPassword = async (userId, values) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.post(`${API}/update/password/${userId}`, values)

  if (data) {
    return data.data
  }
}

export const deleteUser = async (userId, organiId, operator) => {
  // userinfo in an object e.g {username,password}
  const query = queryString.stringify(operator)

  const data = await axios.delete(
    `${API}/user/${userId}/${organiId}?${query}`,
    operator
  )

  if (data) {
    return data.data
  }
}

export const DeleteManyOps = async (organiId, userId, ops) => {
  const data = await axios.delete(`${API}/user/bulk/${organiId}/${userId}`, ops)
  if (data) {
    return data.data
  }
}

export const getOrganisation = async (userId, organiId) => {
  const data = await axios.get(`${API}/organisation/${userId}/${organiId}`)
  if (data) {
    return data.data
  }
}

export const updateOrganisation = async (userId, organiId, doc) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.put(`${API}/organisation/${userId}/${organiId}`, doc)

  if (data) {
    return data.data
  }
}
export const updateOrganiSettings = async (userId, organiId, doc) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.put(
    `${API}/organisation/settings/${userId}/${organiId}`,
    doc
  )

  if (data) {
    return data.data
  }
}

export const Logout = async (userid) => {
  const data = await axios.get(`${API}/logout/${userid}`)

  if (data) {
    return data.data
  }
}
