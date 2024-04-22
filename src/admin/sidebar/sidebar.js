import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../../context'
import { Logout } from '../services/user'

function Sidebar({ operator }) {
  const { menu, setMenu, isAuthenticated, tableoverview } = useContext(Context)

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

  return (
    <div className='aside__container'>
      <aside>
        <div className='top'>
          <span className='material-icons-sharp'>bakery_dining</span>
          <h3>MordePOS</h3>
        </div>

        <div className='sidebar'>
          <Link to='/companyname/dashboard'>
            <h3>Dashboard</h3>
          </Link>

          <Link to='/companyname/menu'>
            <h3>Menu</h3>
          </Link>
          <Link to='/companyname/orders'>
            <h3>Orders</h3>
          </Link>

          <Link to='/companyname/reservation'>
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
          <Link to='/companyname/settings'>
            <h3>Settings</h3>
          </Link>
          <Link to='/companyname/profile'>
            <h3>Profile</h3>
          </Link>

          {operator?.permission === 'admin' && (
            <>
              <Link to='/companyname/tableservices'>
                <h3>Table Management</h3>
              </Link>
              <Link to='/companyname/products'>
                <h3>Product</h3>
              </Link>

              <Link to='/companyname/category'>
                <h3>Category</h3>
              </Link>

              <Link to='/companyname/users'>
                <h3>Users</h3>
              </Link>
            </>
          )}

          <button onClick={handleDelete}>
            <h3>Logout</h3>
          </button>
        </div>
      </aside>
      <aside className={`mobilemenu ${menu && 'sidebarshow'}`}>
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
          <Link to='/companyname/dashboard'>
            <h3>Dashboard</h3>
          </Link>

          <Link to='/companyname/menu'>
            <h3>Menu</h3>
          </Link>
          <Link to='/companyname/orders'>
            <h3>Orders</h3>
          </Link>

          <Link to='/companyname/reservation'>
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
          <Link to='/companyname/settings'>
            <h3>Settings</h3>
          </Link>
          <Link to='/companyname/profile'>
            <h3>Profile</h3>
          </Link>

          {operator?.permission === 'admin' && (
            <>
              <Link to='/companyname/tableservices'>
                <h3>Table Management</h3>
              </Link>
              <Link to='/companyname/products'>
                <h3>Product</h3>
              </Link>

              <Link to='/companyname/category'>
                <h3>Category</h3>
              </Link>

              <Link to='/companyname/users'>
                <h3>Users</h3>
              </Link>
            </>
          )}

          <button onClick={handleDelete}>
            <h3>Logout</h3>
          </button>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
