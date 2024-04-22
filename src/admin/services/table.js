import axios from 'axios'
import queryString from 'query-string'
import { API } from '../../config'

export const checkStatus = async (organiId, userId) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.get(`${API}/tables/status/${organiId}/${userId}`)

  // console.log(data)
  if (data) {
    return data.data
  }
}
export const listtable = async (organiId, userId, filter) => {
  const query = queryString.stringify(filter)
  // userinfo in an object e.g {username,password}
  const data = await axios.get(`${API}/tables/${organiId}/${userId}?${query}`)

  // console.log(data)
  if (data) {
    return data.data
  }
}

export const createTable = async (organiId, userId, table) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.post(`${API}/table/${organiId}/${userId}`, table)
  // console.log(data)

  if (data) {
    return data.data
  }
}

export const updateTable = async (tableId, userId, table) => {
  const data = await axios.put(`${API}/table/${tableId}/${userId}`, table)

  if (data) {
    return data.data
  }
}

export const getTableStatusValues = async () => {
  const data = await axios.get(`${API}/table/status-values`)

  if (data) {
    return data.data
  }
}

export const deleteTable = async (tableId, organiId, userId) => {
  const data = await axios.delete(
    `${API}/table/${tableId}/${organiId}/${userId}`
  )

  if (data) {
    return data.data
  }
}

export const Tableoverview = async (organiId, userId) => {
  const data = await axios.get(`${API}/table-overview/${organiId}/${userId}`)

  if (data) {
    return data.data
  }
}
