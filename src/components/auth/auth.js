import React, { useContext, useEffect } from 'react'

import { Navigate, useLocation } from 'react-router-dom'
import { Context } from '../../context'

const AuthRoute = ({ Component }) => {
  const { isAuthenticated } = useContext(Context)

  // useEffect( ()=>{

  // },[])

  const location = useLocation()

  const user = isAuthenticated('token')
  // console.log(user)
  return user ? (
    <Component />
  ) : (
    <Navigate to='/signin' state={{ from: location }} />
  )
}

export default AuthRoute
