import React, { useContext } from 'react'
import { Context } from '../context'

function Index() {
  const { menu, setMenu, isAuthenticated, authenticate } = useContext(Context)

  const user = isAuthenticated('user')

  return (
    <div className='container login__container'>
      <div className='login__left'>
        <div className='loginleft__header'>
          <span
            className='material-icons-sharp menu'
            onClick={() => setMenu(!menu)}
          >
            menu
          </span>
          <p>Shift 2</p>
          <p className='date'>
            Monday, 6 Fefb 2023 <span className='dot'></span> 8:23 AM
          </p>
        </div>

        <div className='login__details'>
          <h1>more to come from Admin page</h1>
        </div>
      </div>
    </div>
  )
}

export default Index
