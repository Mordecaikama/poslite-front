import React, { useContext } from 'react'

import { Navigate, useLocation } from 'react-router-dom'
import { Context } from '../../context'

const AdminRoute = ({ Component }) => {
  const { isAuthenticated } = useContext(Context)

  const location = useLocation()

  const user = isAuthenticated('token')
  return user ? (
    <Component />
  ) : (
    <Navigate to='/signin' state={{ from: location }} />
  )
}

export default AdminRoute
