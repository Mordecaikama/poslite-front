import React from 'react'
import Appearance from './pages/appearance/appearance'
import General from './pages/general/general'
import Security from './pages/security/security'
import NotOperator from '../../../components/auth/notOperator'

import { Route, Routes, useLocation } from 'react-router-dom'
import ProfileSidebar from './profilesidebar'
import Profile from './pages/company/profile'

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

          <Route
            exact
            path='/company'
            element={<NotOperator Component={Profile} />}
          />
        </Routes>
      </div>
    </div>
  )
}

//

export default ProfileRoute
