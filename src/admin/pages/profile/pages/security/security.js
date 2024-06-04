import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Notification from '../../../../../components/notification/notification'
import { Context } from '../../../../../context'
import { checkOldPassword } from '../../../../services/user'

function Security() {
  const { isAuthenticated, opTyp } = useContext(Context)
  const [values, setValues] = useState({
    old: '',
    newpass: '',
    confirm: '',
    oldError: '',
    newError: '',
    loading: false,
  })

  const user = isAuthenticated('user')

  const [status, setStatus] = useState({
    old: false,
    news: false,
    confirm: false,
  })

  const [notification, setNotification] = useState({
    success: false,
    error: false,
  })

  const { old, newpass, confirm, newError, loading } = values

  useEffect(() => {
    const timers = setTimeout(() => setNotification(false), 6000)
    return () => clearTimeout(timers)
  }, [notification.success, notification.errors])

  const handleChange = (name) => (event) => {
    setValues({ ...values, pwdError: '', confirmError: '' })
    const re = /^[0-9\b]+$/
    const maxLength = 4

    // if value is not blank, then test the regex
    if (opTyp?.permission === 'operator') {
      if (event.target.value === '' || re.test(event.target.value)) {
        if (event.target.value.length < maxLength) {
          setValues({ ...values, [name]: event.target.value })
        } else {
          setValues({ ...values, [name]: event.target.value })
        }
      }
    } else {
      setValues({ ...values, [name]: event.target.value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (newpass === confirm) {
      const res = await checkOldPassword(user?.user, values)

      if (res) {
        if (res.data) {
          setNotification({ ...notification, success: !notification.success })
        } else {
          setValues({ ...values, newError: res.errors?.password })
          setNotification({ ...notification, error: !notification.error })
        }
      }
    } else {
      setValues({ ...values, newError: 'Passwords do not match' })
      setNotification({ ...notification, error: !notification.error })
    }
  }

  const clear = () => {
    setValues({ ...values, newError: '', confirm: '', newpass: '' })
  }
  return (
    <div className='container'>
      <div className='login-forms settings__form'>
        <div className='title'>
          <i className='fal fa-lock'></i>
          <h2>Security</h2>
          {/* <span>{newError}</span> */}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='title'>Current Password</label>
          <div className='login-password'>
            <input
              type={`${status.old ? 'text' : 'password'}`}
              className='username'
              value={old}
              placeholder={`${
                opTyp && opTyp?.permission === 'operator'
                  ? 'Current Pin'
                  : 'Currrent Password'
              }`}
              maxLength={`${
                opTyp && opTyp?.permission === 'operator' ? 4 : null
              }`}
              required
              onChange={handleChange('old')}
              onFocus={() => clear()}
            />
            {status.old ? (
              <i
                className='fas fa-eye'
                onClick={() => setStatus({ ...status, old: !status.old })}
              ></i>
            ) : (
              <i
                className='fas fa-eye-slash'
                onClick={() => setStatus({ ...status, old: !status.old })}
              ></i>
            )}
          </div>
          <label htmlFor='title'>New Password</label>
          <div className='login-password'>
            <input
              type={status.news ? 'text' : 'password'}
              className='username'
              value={newpass}
              placeholder={`${
                opTyp && opTyp?.permission === 'operator'
                  ? 'New Pin'
                  : 'New Password'
              }`}
              maxLength={`${
                opTyp && opTyp?.permission === 'operator' ? 4 : null
              }`}
              required
              onChange={handleChange('newpass')}
            />
            {status.news ? (
              <i
                className='fas fa-eye'
                onClick={() => setStatus({ ...status, news: !status.news })}
              ></i>
            ) : (
              <i
                className='fas fa-eye-slash'
                onClick={() => setStatus({ ...status, news: !status.news })}
              ></i>
            )}
          </div>
          <label htmlFor='title'>Confirm Password</label>
          <div className='login-password'>
            <input
              type={status.confirm ? 'text' : 'password'}
              className='username'
              value={confirm}
              placeholder={`${
                opTyp && opTyp?.permission === 'operator'
                  ? 'Confirm Pin'
                  : 'Confirm Password'
              }`}
              maxLength={`${
                opTyp && opTyp?.permission === 'operator' ? 4 : null
              }`}
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

          <button className=' loginBtn'>Save</button>
        </form>
      </div>
      {/* {JSON.stringify(opTyp)} */}
      <Notification
        msg='error'
        title='Error'
        subtitle={newError}
        toggle={notification.error}
      />
      <Notification
        msg='success'
        title='Success'
        subtitle='Password Updated successfully'
        toggle={notification.success}
      />
    </div>
  )
}

export default Security
