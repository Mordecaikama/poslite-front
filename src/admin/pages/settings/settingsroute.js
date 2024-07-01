import React, { useContext, useEffect, useState } from 'react'
import Notification from '../../../components/notification/notification'

import Error from '../404'
import { Route, Routes, useLocation } from 'react-router-dom'
import SettingsSidebar from './settingssidebar'
import Menu from './pages/menu/menu'
import Users from './pages/users/user'
import Product from './pages/product/product'
import Category from './pages/category/category'
import Billing from './pages/billing/billing'
import Orders from './pages/orders/orders'
import { Context } from '../../../context'

import { updateOrganiSettings } from '../../services/user'

function SettingRoute() {
  const { pathname } = useLocation()

  const { isAuthenticated, setAppsettings, appsettings } = useContext(Context)

  const [notification, setNotification] = useState(null)

  const user = isAuthenticated('user')

  const [settings, setSettings] = useState({
    menu: false,
    users: false,
    product: false,
    cat: false,
    orders: false,
    billing: false,
  })

  useEffect(() => {
    const timers = setTimeout(() => setNotification(false), 6000)
    return () => clearTimeout(timers)

    // renders when notification is true
  }, [notification])

  const handleSettChange = (name) => (event) => {
    if (
      name === 'menufooter' ||
      name === 'debitSidebar' ||
      name === 'catImage'
    ) {
      setAppsettings({ ...appsettings, [name]: !appsettings[name] })
    } else if (name === 'tax') {
      // divides by 100
      const val = event.target.value / 100
      setAppsettings({ ...appsettings, [name]: val })
    } else {
      setAppsettings({ ...appsettings, [name]: event.target.value })
    }
  }

  const handleSave = async () => {
    const res = await updateOrganiSettings(user.user, user?._id, {
      config: appsettings,
    })

    if (res) {
      if (res.data) {
        setNotification(true)
        setAppsettings(res.data?.config)
      }
    }
  }

  return (
    <div className='profile__container container'>
      <div className='settings__main'>
        <SettingsSidebar path={pathname} />
        <Routes>
          <Route
            exact
            path='/'
            element={
              <Menu
                handleChange={handleSettChange}
                appsettings={appsettings}
                save={handleSave}
              />
            }
          />
          <Route
            exact
            path='/users'
            element={
              <Users
                handleChange={handleSettChange}
                appsettings={appsettings}
                save={handleSave}
              />
            }
          />
          <Route
            exact
            path='/product'
            element={
              <Product
                handleChange={handleSettChange}
                appsettings={appsettings}
                save={handleSave}
              />
            }
          />
          <Route
            exact
            path='/category'
            element={
              <Category
                handleChange={handleSettChange}
                appsettings={appsettings}
                save={handleSave}
              />
            }
          />
          <Route
            exact
            path='/billing'
            element={
              <Billing
                handleChange={handleSettChange}
                appsettings={appsettings}
                save={handleSave}
              />
            }
          />
          <Route
            exact
            path='/orders'
            element={
              <Orders
                handleChange={handleSettChange}
                appsettings={appsettings}
                save={handleSave}
              />
            }
          />

          <Route path='*' element={<Error />} />
        </Routes>

        <Notification
          msg='success'
          title='Success'
          subtitle='Successfully updated User Profile'
          toggle={notification}
        />
      </div>

      <div className='settings__mobile'>
        <a onClick={() => setSettings({ ...!settings, menu: !settings.menu })}>
          <span className='material-icons-sharp'>date_range</span>
          <h3>Menu</h3>
        </a>
        <div className={`settings__hide ${settings.menu && 'open'}`}>
          <Menu
            handleChange={handleSettChange}
            appsettings={appsettings}
            save={handleSave}
          />
        </div>
        <a
          onClick={() => setSettings({ ...!settings, users: !settings.users })}
        >
          <span className='material-icons-sharp'>people_alt</span>
          <h3>Users</h3>
        </a>
        <div className={`settings__hide ${settings.users && 'open'}`}>
          <Users
            handleChange={handleSettChange}
            appsettings={appsettings}
            save={handleSave}
          />
        </div>
        <a
          onClick={() =>
            setSettings({ ...!settings, product: !settings.product })
          }
        >
          <span className='material-icons-sharp'>mail_outline</span>
          <h3>Product</h3>
        </a>
        <div className={`settings__hide ${settings.product && 'open'}`}>
          <Product
            handleChange={handleSettChange}
            appsettings={appsettings}
            save={handleSave}
          />
        </div>
        <a onClick={() => setSettings({ ...!settings, cat: !settings.cat })}>
          <span className='material-icons-sharp'>insights</span>
          <h3>Category</h3>
        </a>
        <div className={`settings__hide ${settings.cat && 'open'}`}>
          <Category
            handleChange={handleSettChange}
            appsettings={appsettings}
            save={handleSave}
          />
        </div>
        <a
          onClick={() =>
            setSettings({ ...!settings, orders: !settings.orders })
          }
        >
          <span className='material-icons-sharp'>drafts</span>
          <h3>Orders</h3>
        </a>
        <div className={`settings__hide ${settings.orders && 'open'}`}>
          <Orders
            handleChange={handleSettChange}
            appsettings={appsettings}
            save={handleSave}
          />
        </div>
        <a
          onClick={() =>
            setSettings({ ...!settings, billing: !settings.billing })
          }
        >
          <span className='material-icons-sharp'>content_copy</span>
          <h3>Billing</h3>
        </a>
        <div className={`settings__hide ${settings.dup && 'open'}`}>
          <Billing
            handleChange={handleSettChange}
            appsettings={appsettings}
            save={handleSave}
          />
        </div>
      </div>

      {/* {JSON.stringify(appsettings, null, 2)} */}
    </div>
  )
}

export default SettingRoute
