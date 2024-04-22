import { Link } from 'react-router-dom'

function ProfileSidebar({ path }) {
  return (
    <div className='profile__navbar'>
      <nav>
        <Link
          to='/companyname/profile'
          className={`${path === '/companyname/profile' && 'active'}`}
        >
          <span className='material-icons-sharp'>date_range</span>
          <h3>Profile</h3>
        </Link>
        <Link
          to='/companyname/profile/appearance'
          className={`${
            path === '/companyname/profile/appearance' && 'active'
          }`}
        >
          <span className='material-icons-sharp'>people_alt</span>
          <h3>Appearance</h3>
        </Link>
        <Link
          to='/companyname/profile/security'
          className={`${path === '/companyname/profile/security' && 'active'}`}
        >
          <span className='material-icons-sharp'>mail_outline</span>
          <h3>Security</h3>
        </Link>
      </nav>
    </div>
  )
}

export default ProfileSidebar
