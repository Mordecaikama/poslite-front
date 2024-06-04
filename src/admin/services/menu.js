import axios from 'axios'
import { API } from '../../config'
import queryString from 'query-string'

export const getProduct = async (productId, userId) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.get(`${API}/product/${productId}/${userId}`)

  if (data) {
    return data.data
  }
}

export const createProduct = async (organiId, userId, products) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.post(
    `${API}/product/${organiId}/${userId}`,
    products
  )

  if (data) {
    return data.data
  }
}
export const updateProduct = async (productId, userId, products) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.put(
    `${API}/product/${productId}/${userId}`,
    products
  )

  if (data) {
    return data.data
  }
}

export const deleteProduct = async (productId, organiId, userId) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.delete(
    `${API}/product/${productId}/${organiId}/${userId}`
  )

  if (data) {
    return data.data
  }
}
export const getProducts = async (organiId, query) => {
  // userinfo in an object e.g {username,password}
  const querys = queryString.stringify(query)
  const data = await axios.get(`${API}/products/${organiId}?${querys}`)

  if (data) {
    return data.data
  }
}

export const DeleteManyProducts = async (organiId, userId, products) => {
  const data = await axios.delete(
    `${API}/products/bulk/${organiId}/${userId}`,
    products
  )
  if (data) {
    return data.data
  }
}
