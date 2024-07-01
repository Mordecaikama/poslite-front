import React, { useContext, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../../context'
import { Logout } from '../services/user'

function Sidebar({ operator, path }) {
  const { menu, setMenu, isAuthenticated, tableoverview } = useContext(Context)

  const sidebarRef = useRef('<aside>sidebar</aside>')

  const user = isAuthenticated('user')
  const navigate = useNavigate()

  const handleDelete = async () => {
    const res = await Logout(user && user.user)
    // console.log(res.data.data)
    if (res) {
      if (res.data) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/signin')
      }
    }
  }

  useEffect(() => {
    mouseEnterOut()
  }, [])

  const handleSidebar = (e) => {
    if (!sidebarRef.current?.contains(e.target)) {
      setMenu(false)
    }
  }

  const mouseEnterOut = () => {
    document.addEventListener('mousedown', handleSidebar)

    return () => {
      document.removeEventListener('mousedown', handleSidebar)
    }
  }

  return (
    <div className='aside__container'>
      <aside>
        <div className='top'>
          <span className='material-icons-sharp'>bakery_dining</span>
          <h3>kamaPOS</h3>
        </div>

        <div className='sidebar'>
          <Link
            to='/companyname/dashboard'
            className={`${path === '/companyname/dashboard' && 'active'}`}
          >
            <h3>Dashboard</h3>
          </Link>

          <Link
            to='/companyname/menu'
            className={`${path === '/companyname/menu' && 'active'}`}
          >
            <h3>Menu</h3>
          </Link>
          <Link
            to='/companyname/orders'
            className={`${path === '/companyname/orders' && 'active'}`}
          >
            <h3>Orders</h3>
          </Link>

          <Link
            to='/companyname/reservation'
            className={`${path === '/companyname/reservation' && 'active'}`}
          >
            <h3>Reservation</h3>
            {tableoverview &&
              tableoverview
                ?.filter((table) => table._id === 'reserved')
                ?.map((st, ind) => {
                  return (
                    <div key={ind}>
                      <span className='message-count'>{st?.count}</span>
                    </div>
                  )
                })}
          </Link>

          {operator?.permission === 'admin' && (
            <>
              <Link
                to='/companyname/tableservices'
                className={`${
                  path === '/companyname/tableservices' && 'active'
                }`}
              >
                <h3>Table Management</h3>
              </Link>
              <Link
                to='/companyname/products'
                className={`${path === '/companyname/products' && 'active'}`}
              >
                <h3>Product</h3>
              </Link>

              <Link
                to='/companyname/category'
                className={`${path === '/companyname/category' && 'active'}`}
              >
                <h3>Category</h3>
              </Link>

              <Link
                to='/companyname/users'
                className={`${path === '/companyname/users' && 'active'}`}
              >
                <h3>Users</h3>
              </Link>
              <Link
                to='/companyname/settings'
                className={`${path === '/companyname/settings' && 'active'}`}
              >
                <h3>Settings</h3>
              </Link>
            </>
          )}

          <Link
            to='/companyname/profile'
            className={`${path === '/companyname/profile' && 'active'}`}
          >
            <h3>Profile</h3>
          </Link>

          <button className='btn' onClick={handleDelete}>
            <h3>Logout</h3>
          </button>
        </div>
      </aside>
      <aside
        className={`mobilemenu ${menu && 'sidebarshow'}`}
        ref={sidebarRef}
        onClick={handleSidebar}
      >
        <div className='top'>
          <span className='material-icons-sharp'>bakery_dining</span>
          <h3>MordePOS</h3>

          <span
            className='material-icons-sharp menu sidebarmenu__icon'
            onClick={() => setMenu(!menu)}
          >
            close
          </span>
        </div>

        <div className='sidebar'>
          <Link
            to='/companyname/dashboard'
            className={`${path === '/companyname/dashboard' && 'active'}`}
          >
            <h3>Dashboard</h3>
          </Link>

          <Link
            to='/companyname/menu'
            className={`${path === '/companyname/menu' && 'active'}`}
          >
            <h3>Menu</h3>
          </Link>
          <Link
            to='/companyname/orders'
            className={`${path === '/companyname/orders' && 'active'}`}
          >
            <h3>Orders</h3>
          </Link>

          <Link
            to='/companyname/reservation'
            className={`${path === '/companyname/reservation' && 'active'}`}
          >
            <h3>Reservation</h3>
            {tableoverview &&
              tableoverview
                ?.filter((table) => table._id === 'reserved')
                ?.map((st, ind) => {
                  return (
                    <div key={ind}>
                      <span className='message-count'>{st?.count}</span>
                    </div>
                  )
                })}
          </Link>

          {operator?.permission === 'admin' && (
            <>
              <Link
                to='/companyname/tableservices'
                className={`${
                  path === '/companyname/tableservices' && 'active'
                }`}
              >
                <h3>Table Management</h3>
              </Link>
              <Link
                to='/companyname/products'
                className={`${path === '/companyname/products' && 'active'}`}
              >
                <h3>Product</h3>
              </Link>

              <Link
                to='/companyname/category'
                className={`${path === '/companyname/category' && 'active'}`}
              >
                <h3>Category</h3>
              </Link>

              <Link
                to='/companyname/users'
                className={`${path === '/companyname/users' && 'active'}`}
              >
                <h3>Users</h3>
              </Link>
              <Link
                to='/companyname/settings'
                className={`${path === '/companyname/settings' && 'active'}`}
              >
                <h3>Settings</h3>
              </Link>
            </>
          )}

          <Link
            to='/companyname/profile'
            className={`${path === '/companyname/profile' && 'active'}`}
          >
            <h3>Profile</h3>
          </Link>

          <button className='btn' onClick={handleDelete}>
            <h3>Logout</h3>
          </button>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
