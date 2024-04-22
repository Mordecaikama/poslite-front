import React from 'react'
import Operator from './operator'
import Error from '../404'
import { Route, Routes } from 'react-router-dom'

function OperatorRoute() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Operator />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  )
}

export default OperatorRoute
