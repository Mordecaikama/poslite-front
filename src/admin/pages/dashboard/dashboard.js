import React, { useContext, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Tables from '../tablemgmt/tables'
// import SettingRoute from './pages/settings/settingsroute'
import Categoryroute from '../category/category'
import ProductRoute from '../products/productroute'
import OperatorRoute from '../users/operatorroute'
import Reservation from '../reservation/reservation'
import AdminRoute from '../../../components/auth/adminRoute'

import Sidebar from '../../sidebar/sidebar'
import Menu from '../menu/menu'
import Overview from '../overview/overview'
import Orders from '../orders/orders'
import SettingRoute from '../settings/settingsroute'
import ProfileRoute from '../profile/profileroute'
import Header from '../../header'
import Timeline from '../reservation/timeline'
import { getOrganisation, userprofile } from '../../services/user'
import { Context } from '../../../context'
import { Tableoverview } from '../../services/table'
import Error from '../../../front/404'

function Homepage() {
  const { pathname } = useLocation()

  const {
    isAuthenticated,
    opTyp,
    setOpTyp,
    setTableOverview,
    setAppsettings,
    setCart,
  } = useContext(Context)

  const user = isAuthenticated('user')

  useEffect(() => {
    getProfile()
    getTableOverview()
    getSettings()
  }, [])

  const getProfile = async () => {
    const res = await userprofile(user?.user)

    if (res) {
      if (res.data) {
        setOpTyp(res.data?.data)
        setCart(res.data?.data?.cart)
      }
    }
  }

  const getTableOverview = async () => {
    // called in getAlltables
    const res = await Tableoverview(user?._id, user?.user)
    // console.log(res)

    if (res) {
      if (res.data) {
        setTableOverview(res.data)
      }
    }
  }

  const getSettings = async () => {
    const res = await getOrganisation(user?.user, user?._id)
    if (res) {
      if (res.data) {
        setAppsettings(res.data?.config)
      }
    }
  }
  return (
    <div className='main__container container'>
      <Sidebar operator={opTyp} path={pathname} />
      <div className='main'>
        {pathname !== '/companyname/menu' &&
          pathname !== '/companyname/reservation' && <Header />}

        <Routes>
          {/* <Route exact path='/' element={<Index />} /> */}
          <Route exact path='/dashboard' element={<Overview />} />
          <Route exact path='/menu' element={<Menu />} />
          <Route exact path='/orders' element={<Orders />} />
          <Route exact path='/reservation' element={<Reservation />} />
          <Route exact path='/timeline' element={<Timeline />} />
          <Route
            exact
            path='/tableservices'
            element={<AdminRoute Component={Tables} />}
          />

          <Route
            exact
            path='/settings/*'
            element={<AdminRoute Component={SettingRoute} />}
          />

          <Route
            exact
            path='/profile/*'
            element={<AdminRoute Component={ProfileRoute} />}
          />

          <Route
            exact
            path='/products/*'
            element={<AdminRoute Component={ProductRoute} />}
          />
          <Route
            exact
            path='/category/*'
            element={<AdminRoute Component={Categoryroute} />}
          />

          <Route
            exact
            path='/users/*'
            element={<AdminRoute Component={OperatorRoute} />}
          />

          <Route path='*' element={<Error />} />
        </Routes>
      </div>
    </div>
  )
}

export default Homepage
