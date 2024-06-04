import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../../context'

function SettingsSidebar({ path }) {
  const { menuShow, setMenuShow } = useContext(Context)
  return (
    <div className='profile__navbar'>
      <nav>
        <Link
          to='/companyname/settings'
          className={path === '/companyname/settings' && 'active'}
        >
          <span className='material-icons-sharp'>grid_view</span>
          <h3>Menu</h3>
        </Link>
        <Link
          to='/companyname/settings/users'
          className={path === '/companyname/settings/users' && 'active'}
        >
          <span className='material-icons-sharp'>person_outline</span>
          <h3>Users</h3>
        </Link>
        <Link
          to='/companyname/settings/product'
          className={path === '/companyname/settings/product' && 'active'}
        >
          <span className='material-icons-sharp'>insights</span>
          <h3>Product</h3>
        </Link>
        <Link
          to='/companyname/settings/category'
          className={path === '/companyname/settings/category' && 'active'}
        >
          <span className='material-icons-sharp'>mail_outline</span>
          <h3>Category</h3>
        </Link>
        <Link
          to='/companyname/settings/orders'
          className={path === '/companyname/settings/orders' && 'active'}
        >
          <span className='material-icons-sharp'>inventory</span>
          <h3>Orders</h3>
        </Link>
        <Link
          to='/companyname/settings/billing'
          className={path === '/companyname/settings/billing' && 'active'}
        >
          <span className='material-icons-sharp'>inventory</span>
          <h3>Billing</h3>
        </Link>
      </nav>
    </div>
  )
}

export default SettingsSidebar
