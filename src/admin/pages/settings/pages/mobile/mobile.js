import React, { useState } from 'react'

function Mobile() {
  const [values, setValues] = useState({
    name: '',
    address: '',
    nameError: '',
    addError: '',
    loading: false,
  })

  const { name, address, nameError, addError, loading } = values

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value })
  }

  return (
    <div className='container'>
      <div className='login-forms settings__form'>
        <div className='title'>
          <i className='fal fa-mobile'></i>
          <h2>Mobile</h2>
        </div>
        <form>
          <div className='input-options imgs__store'>
            <img
              src={require('../../../../../assets/images/appstore.png')}
              alt=''
            />
            <img
              src={require('../../../../../assets/images/playstore.png')}
              alt=''
            />
          </div>

          <button className=' loginBtn'>Save</button>
        </form>
      </div>
    </div>
  )
}

export default Mobile
