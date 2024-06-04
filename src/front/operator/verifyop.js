import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { confirmOperator } from '../../admin/services/user'

const VerifyOperator = () => {
  const [values, setValues] = useState({
    password: '',
    confirm: '',
    confirmError: '',
    pwdError: '',
    pwdErrorState: false,
    loading: false,
    redirectToReferer: false,
  })

  const navigate = useNavigate()

  const [status, setStatus] = useState({
    main: false,
    confirm: false,
  })

  const {
    password,
    pwdError,
    confirm,
    confirmError,
    pwdErrorState,
    redirectToRefere,
  } = values

  const params = useParams()
  console.log(params)

  const handleChange = (name) => (event) => {
    // resets all error
    setValues({ ...values, pwdError: '', confirmError: '' })
    const re = /^[0-9\b]+$/
    const maxLength = 4

    // if value is not blank, then test the regex
    if (event.target.value === '' || re.test(event.target.value)) {
      if (event.target.value.length < maxLength) {
        setValues({ ...values, [name]: event.target.value })
      } else {
        setValues({ ...values, [name]: event.target.value })
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password === confirm) {
      const res = await confirmOperator(params.orgId, params.usId, values)

      if (res) {
        if (res.data) {
          navigate('/signin')
        } else {
          console.log(res)
        }
      }
    } else {
      setValues({ ...values, confirmError: 'Pins dont match' })
    }
  }

  return (
    <div className='verify__operator container'>
      <div className='form__container'>
        <h1>COMPLETE YOUR ACCOUNT</h1>
        <h2>SETUP YOUR PIN.</h2>
        <form onSubmit={handleSubmit}>
          <span>Pin</span>
          <div
            className='login-password'
            style={{ borderColor: `${pwdErrorState && 'red'}` }}
          >
            <input
              type={status.main ? 'number' : 'password'}
              placeholder='pin'
              value={password}
              maxLength={4}
              required
              onChange={handleChange('password')}
            />
            {status.main ? (
              <i
                className='fas fa-eye'
                onClick={() => setStatus({ ...status, main: !status.main })}
              ></i>
            ) : (
              <i
                className='fas fa-eye-slash'
                onClick={() => setStatus({ ...status, main: !status.main })}
              ></i>
            )}
          </div>
          <span className='error'>{pwdError}</span>

          <span>Confirm Pin</span>
          <div className='login-password'>
            <input
              type={status.confirm ? 'number' : 'password'}
              placeholder='confirm pin'
              value={confirm}
              maxLength={4}
              required
              onChange={handleChange('confirm')}
            />
            {status.confirm ? (
              <i
                className='fas fa-eye'
                onClick={() =>
                  setStatus({ ...status, confirm: !status.confirm })
                }
              ></i>
            ) : (
              <i
                className='fas fa-eye-slash'
                onClick={() =>
                  setStatus({ ...status, confirm: !status.confirm })
                }
              ></i>
            )}
          </div>
          <span className='error'>{confirmError}</span>
          <button className='btn'>Setup Account</button>

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

export default VerifyOperator
