import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../../context'

function SettingsSidebar({ path }) {
  const { menuShow, setMenuShow } = useContext(Context)
  return (
    <div className='main__container container'>
      <aside>
        <div class='top'>
          <div class='logo'>
            <img src={require('../../../assets/images/logo.png')} alt='logo ' />
            <h2>
              EGA <span class='danger'>TOR</span>
            </h2>
          </div>
          <div className='close'>
            <span className='material-icons-sharp'>close</span>
          </div>
        </div>
        <div class='sidebar'>
          <Link
            to='/admindashboard/settings'
            className={path === '/admindashboard/settings' && 'active'}
          >
            <span className='material-icons-sharp'>grid_view</span>
            <h3>General</h3>
          </Link>
          <Link
            to='/admindashboard/settings/organisation'
            className={
              path === '/admindashboard/settings/organisation' && 'active'
            }
          >
            <span className='material-icons-sharp'>person_outline</span>
            <h3>Organisation</h3>
          </Link>
          <Link
            to='/admindashboard/settings/appearance'
            className={
              path === '/admindashboard/settings/appearance' && 'active'
            }
          >
            <span className='material-icons-sharp'>insights</span>
            <h3>Appearance</h3>
          </Link>
          <Link
            to='/admindashboard/settings/mobile'
            className={path === '/admindashboard/settings/mobile' && 'active'}
          >
            <span className='material-icons-sharp'>mail_outline</span>
            <h3>Mobile App</h3>
            <span className='message-count'>26</span>
          </Link>
          <Link
            to='/admindashboard/settings/billing'
            className={path === '/admindashboard/settings/billing' && 'active'}
          >
            <span className='material-icons-sharp'>inventory</span>
            <h3>Billing</h3>
          </Link>
          <Link
            to='/admindashboard/settings/security'
            className={path === '/admindashboard/settings/security' && 'active'}
          >
            <span className='material-icons-sharp'>lock</span>
            <h3>Security</h3>
          </Link>
        </div>
      </aside>

      <div className={`mobile-menu ${menuShow.profile && 'menushow'}`}>
        <div class='top'>
          <div class='logo'>
            <img src={require('../../../assets/images/logo.png')} alt='logo ' />
            <h2>
              EGA <span class='danger'>TOR</span>
            </h2>
          </div>
          <div className='close'>
            <span
              className='material-icons-sharp'
              onClick={() => setMenuShow({ menushow: !menuShow.profile })}
            >
              close
            </span>
          </div>
        </div>
        <div class='sidebar'>
          <Link
            to='/admindashboard/settings'
            className={path === '/admindashboard/settings' && 'active'}
            onClick={() => setMenuShow({ menushow: !menuShow.profile })}
          >
            <span className='material-icons-sharp'>grid_view</span>
            <h3>General</h3>
          </Link>
          <Link
            to='/admindashboard/settings/organisation'
            className={
              path === '/admindashboard/settings/organisation' && 'active'
            }
            onClick={() =>
              setMenuShow({ ...menuShow, profile: !menuShow.profile })
            }
          >
            <span className='material-icons-sharp'>person_outline</span>
            <h3>Organisation</h3>
          </Link>
          <Link
            to='/admindashboard/settings/appearance'
            className={
              path === '/admindashboard/settings/appearance' && 'active'
            }
            onClick={() =>
              setMenuShow({ ...menuShow, profile: !menuShow.profile })
            }
          >
            <span className='material-icons-sharp'>insights</span>
            <h3>Appearance</h3>
          </Link>
          <Link
            to='/admindashboard/settings/mobile'
            className={path === '/admindashboard/settings/mobile' && 'active'}
            onClick={() =>
              setMenuShow({ ...menuShow, profile: !menuShow.profile })
            }
          >
            <span className='material-icons-sharp'>mail_outline</span>
            <h3>Mobile App</h3>
            <span className='message-count'>26</span>
          </Link>
          <Link
            to='/admindashboard/settings/billing'
            className={path === '/admindashboard/settings/billing' && 'active'}
            onClick={() =>
              setMenuShow({ ...menuShow, profile: !menuShow.profile })
            }
          >
            <span className='material-icons-sharp'>inventory</span>
            <h3>Billing</h3>
          </Link>
          <Link
            to='/admindashboard/settings/security'
            className={path === '/admindashboard/settings/security' && 'active'}
            onClick={() =>
              setMenuShow({ ...menuShow, profile: !menuShow.profile })
            }
          >
            <span className='material-icons-sharp'>lock</span>
            <h3>Security</h3>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SettingsSidebar
