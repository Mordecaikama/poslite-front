import React from 'react'
import Category from './category'
import Error from '../404'
import { Route, Routes } from 'react-router-dom'
// import AddCategory from './add'

const Categoryroute = () => {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Category />} />
        {/* <Route exact path='/add' element={<AddCategory />} /> */}
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  )
}

export default Categoryroute
