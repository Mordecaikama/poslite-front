import React from 'react'
import Settings from './settings'
// import Security from './pages/security'
// import Billing from './pages/billing'
// import Appearance from './pages/appearance'
// import General from './pages/general'

// import Mobile from './pages/mobile'
import Error from '../404'
import { Route, Routes } from 'react-router-dom'

function SettingRoute() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Settings />} />
        {/* <Route exact path='/security' element={<Security />} /> */}
        {/* <Route exact path='/billing' element={<Billing />} /> */}
        {/* <Route exact path='/appearance' element={<Appearance />} /> */}
        {/* <Route exact path='/general' element={<General />} /> */}
        {/* <Route exact path='/mobile' element={<Mobile />} /> */}
        {/* <Route exact path='/add' element={<AddCategory />} /> */}
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  )
}

export default SettingRoute
