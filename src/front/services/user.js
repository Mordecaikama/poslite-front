import axios from 'axios'
import { API } from '../../config'

export const loginuser = async (user) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.post(`${API}/signin`, user)

  if (data) {
    return data.data
  }
}
export const Signup = async (user) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.post(`${API}/signup`, user)

  if (data) {
    return data.data
  }
}
export const verify = async (values) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.post(`${API}/verify-email`, values)
  // console.log(data)

  if (data) {
    return data.data
  }
}

export const verifyEmail = async (values) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.post(`${API}/confirm-code`, values)
  // console.log(data)

  if (data) {
    return data.data
  }
}
