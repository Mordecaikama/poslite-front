import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <div className='logo'>logo</div>
      <nav>
        <a href='#'>About</a>
        <a href='#'>Features</a>
        <a href='#'>Pricing</a>
      </nav>

      <div className='btns'>
        <button className=' login-Btn'>
          <Link to='/signin'>login</Link>
        </button>
        <button className='login-Btn'>
          <Link to='/signup'>signup</Link>
        </button>
      </div>
    </header>
  )
}
