import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Products from './products'
import Error from '../404'
import Addnewproduct from './newaddproduct'

function ProductRoute() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Products />} />
        <Route exact path='/addnew' element={<Addnewproduct />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  )
}

export default ProductRoute
