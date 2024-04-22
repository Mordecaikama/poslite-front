import axios from 'axios'
import { API } from '../../config'

export const loginOperator = async (operatorId, organiId, operator) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.post(
    `${API}/operator/login/${operatorId}/${organiId}`,
    operator
  )

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

export const updateOperator = async (operatorId, organiId, operator) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.put(
    `${API}/operator/${operatorId}/${organiId}`,
    operator
  )

  if (data) {
    return data.data
  }
}
export const deleteOperator = async (operatorId, userId, organiId) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.delete(
    `${API}/operator/${operatorId}/${userId}/${organiId}`
  )

  if (data) {
    return data.data
  }
}

export const getOperators = async (organiId) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.get(`${API}/operator/${organiId}`)

  if (data) {
    return data.data
  }
}

export const DeleteManyOps = async (organiId, userId, ops) => {
  const data = await axios.delete(
    `${API}/operator/bulk/${organiId}/${userId}`,
    ops
  )
  if (data) {
    return data.data
  }
}
