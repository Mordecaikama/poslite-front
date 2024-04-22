import React from 'react'
import Appearance from './pages/appearance/appearance'
import General from './pages/general/general'
import Security from './pages/security/security'

import { Route, Routes, useLocation } from 'react-router-dom'
import ProfileSidebar from './profilesidebar'

function ProfileRoute() {
  const { pathname } = useLocation()
  return (
    <div className='profile__container container'>
      <ProfileSidebar path={pathname} />
      <div className='profile__main container'>
        <Routes>
          <Route exact path='/' element={<General />} />
          <Route path='/appearance' element={<Appearance />} />
          <Route path='/security' element={<Security />} />
        </Routes>
      </div>
    </div>
  )
}

export default ProfileRoute
