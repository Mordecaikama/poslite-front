import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { verifyEmail } from '../services/user'

function VerifyCode() {
  const [values, setValues] = useState({
    pin: '',
    pinError: '',
    loading: false,
  })

  const location = useLocation()
  const navigate = useNavigate()
  const { pin, pinError } = values

  const handleChange = (name) => (event) => {
    // validate = (fieldvalue, name)
    setValues({ ...values, [name]: event.target.value.toUpperCase() })
    // validate(event.target.value, name)
  }

  const submit = async (e) => {
    e.preventDefault()

    const res = await verifyEmail(values)

    if (res) {
      if (res.msg) {
        navigate('/signin')
      } else {
        setValues({ ...values, pinError: res?.errors })
      }
    }
  }

  return (
    <div className='verification__container container'>
      <div className='form__container'>
        <p>Verify your account</p>
        <h4>Enter your verification code:</h4>
        <form onSubmit={submit}>
          <div className='login-password'>
            <input
              type='text'
              className='username'
              value={pin}
              placeholder='code'
              required
              onChange={handleChange('pin')}
              maxlength='5'
            />
            <span className='hide help'></span>
          </div>
          <button className='btn' style={{ marginRight: '1rem' }}>
            Confirm
          </button>
          <span className='error'>{pinError}</span>

          <div className='signup'>
            Already have an Account
            <Link to='/signin'>
              <button className='Lgsignup'>Login</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VerifyCode
