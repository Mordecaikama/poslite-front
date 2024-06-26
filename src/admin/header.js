import React, { useContext, useState } from 'react'
import { Context } from '../context'
import { S3PATH } from '../config'

function Header() {
  const { cartsize, menu, setMenu, receipt, setReceipt, opTyp } =
    useContext(Context)
  // const [receipt, setReceipt] = useState(false)

  return (
    <div className='header item'>
      <span
        className='material-icons-sharp menu'
        onClick={() => setMenu(!menu)}
      >
        menu
      </span>
      <div className='menu__search'>
        <input type='text' className='search' />
        <span className='material-icons-sharp search'>search</span>
      </div>

      <div className='cart__container'>
        <span
          className='material-icons-sharp cart'
          onClick={() => setReceipt(!receipt)}
        >
          shopping_cart
        </span>
        <span>{cartsize}</span>
      </div>

      <div className='profile'>
        <div className='profile-photo'>
          <img src={`${S3PATH}/${opTyp?.img}`} alt='' />
        </div>
        <span>{opTyp?.name?.split(' ')[0]}</span>

        <div className='dropdown'></div>
      </div>
    </div>
  )
}

export default Header
