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
export const verify = async (user) => {
  // userinfo in an object e.g {username,password}
  const data = await axios.post(`${API}/verify-email`, user)
  // console.log(data)

  if (data) {
    return data.data
  }
}
