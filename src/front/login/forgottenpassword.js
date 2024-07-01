import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { API } from '../../config'

function ForgottenPassword() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    code: '',
    codeError: '',
    passwordError: '',
    emailError: '',
    verified: false,
    message: false,
  })
  const {
    email,
    password,
    passwordError,
    emailError,
    code,
    codeError,
    message,
    verified,
  } = values

  const navigate = useNavigate()

  // const [visible, setVisible] = useState(false)
  // const [resetCode, setResetcode] = useState('')
  const [status, setStatus] = useState(false)

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (verified) {
      handleResetPassword()
    } else {
      !message ? handleForgotPassword() : handleVerifyCode()
    }
  }

  const handleForgotPassword = async () => {
    const res = await axios.post(`${API}/forgot-password`, {
      email: values.email,
      password: values.password,
    })

    if (res.data?.errors) {
      setValues({
        ...values,
        emailError: res.data?.errors,
      })
    } else {
      setValues({ ...values, message: res.data?.msg })
      toast.success('check your email to confirm the reset code sent', {
        position: 'bottom-left',
        className: 'password-reset-alert',
      })
      // clearForms()
    }
  }

  const handleVerifyCode = async () => {
    const res = await axios.post(`${API}/check/code`, {
      email: values.email,
      code: values.code,
    })

    if (res.data?.error) {
      setValues({
        ...values,
        codeError: res.data?.error,
      })
    } else {
      setValues({ ...values, verified: true })
    }
  }

  const handleResetPassword = async () => {
    const res = await axios.post(`${API}/reset-password`, {
      email,
      password,
    })

    if (res.data?.error) {
      setValues({
        ...values,
        passwordError: res.data?.error,
      })
    } else {
      // setState({ ...!state, login: !state.login })
      clearForms()
      navigate('/signin')
    }
  }

  function clearForms() {
    setValues({
      email: '',
      password: '',
      code: '',
      codeError: '',
      passwordError: '',
      emailError: '',
      verified: false,
      message: false,
    })
  }

  return (
    <div className='login-container'>
      <div className='login-forms frontend'>
        <h3>
          {verified
            ? 'Reset Password'
            : !message
            ? 'Forgot Password'
            : 'Verify Code'}
        </h3>
        <i className='fas fa-user-friends'></i>
        <form>
          {verified ? (
            <>
              <div className='login-password'>
                <input
                  type={status ? 'text' : 'password'}
                  placeholder='password'
                  value={password}
                  required
                  onChange={handleChange('password')}
                />
                {status ? (
                  <i
                    className='fas fa-eye'
                    onClick={() => setStatus(!status)}
                  ></i>
                ) : (
                  <i
                    className='fas fa-eye-slash'
                    onClick={() => setStatus(!status)}
                  ></i>
                )}
              </div>
              <span className='error'>{passwordError}</span>
            </>
          ) : message ? (
            <>
              <div className='login-password'>
                <input
                  type='text'
                  placeholder='Code'
                  value={code}
                  required
                  onChange={handleChange('code')}
                />
              </div>
              <span className='error'>{codeError}</span>
            </>
          ) : (
            <>
              <div className='login-password'>
                <input
                  type='text'
                  className='username'
                  value={email}
                  placeholder='Email'
                  required
                  onChange={handleChange('email')}
                />
              </div>
              <span className='error'>{emailError}</span>
            </>
          )}

          <button className=' loginBtn' onClick={handleSubmit}>
            {verified
              ? 'Reset Password'
              : !message
              ? 'Forgot Password'
              : 'Verify Code'}
          </button>

          <div className='signup'>
            Already have an account
            <button
              style={{
                padding: '0.4rem',
                borderRadius: '0.4rem',
                background: '#dce1eb',
              }}
              onClick={() => navigate('/signin')}
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default ForgottenPassword
