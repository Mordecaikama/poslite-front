import axios from 'axios'
import queryString from 'query-string'
import { API } from '../../config'

export const createOrder = async (organiId, userId, orders) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.post(`${API}/order/${organiId}/${userId}`, orders)

  if (data) {
    return data.data
  }
}
export const listOrders = async (organiId, userId, filters) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.post(`${API}/orders/${organiId}/${userId}`, filters)

  if (data) {
    return data.data
  }
}
export const OrdersGraph = async (organiId, userId, filters) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.post(
    `${API}/orders-graph/${organiId}/${userId}`,
    filters
  )

  if (data) {
    return data.data
  }
}

export const updateOrderStatus = async (orderId, userId, status) => {
  const data = await axios.put(`${API}/order/${orderId}/${userId}`, status)

  if (data) {
    return data.data
  }
}
export const ordersOverview = async (organiId, userId, filter) => {
  // executes for dashboards only
  // const query = queryString.stringify(filter)
  const data = await axios.post(
    `${API}/ordersoverview/${organiId}/${userId}`,
    filter
  )

  if (data) {
    return data.data
  }
}

export const getOrderStatusValues = async () => {
  const data = await axios.get(`${API}/order/status-values`)

  if (data) {
    return data.data
  }
}

export const deleteOrder = async (orderId, userId) => {
  const data = await axios.delete(`${API}/order/${orderId}/${userId}`)

  if (data) {
    return data.data
  }
}
