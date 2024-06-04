import axios from 'axios'
import { API } from '../../config'
import queryString from 'query-string'

export const getCategory = async (categoryId) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.get(`${API}/category/${categoryId}`)

  if (data) {
    return data.data
  }
}

export const createCategory = async (organiId, userId, category) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.post(
    `${API}/category/${organiId}/${userId}`,
    category
  )

  if (data) {
    return data.data
  }
}

export const updateCategory = async (catId, userId, category) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.put(`${API}/category/${catId}/${userId}`, category)

  if (data) {
    return data.data
  }
}

export const deleteCategory = async (catId, orgId, userId) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.delete(`${API}/category/${catId}/${orgId}/${userId}`)

  if (data) {
    return data.data
  }
}

export const allCategory = async (orgId, userId, filter) => {
  // userinfo in an object e.g {username,password}
  const query = queryString.stringify(filter)
  const data = await axios.get(`${API}/categories/${orgId}/${userId}?${query}`)

  if (data) {
    return data.data
  }
}

export const allCat = async (orgId, userId, filter) => {
  // userinfo in an object e.g {username,password}
  // const query = queryString.stringify(filter)
  const data = await axios.get(`${API}/categorys/${orgId}/${userId}`)

  if (data) {
    return data.data
  }
}

export const getCategoryProducts = async (orgId, catId, userId) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.get(`${API}/category/${orgId}/${catId}/${userId}`)

  if (data) {
    return data.data
  }
}

export const DeleteManyCategory = async (organiId, userId, cats) => {
  const data = await axios.delete(
    `${API}/category/bulk/${organiId}/${userId}`,
    cats
  )
  if (data) {
    return data.data
  }
}
