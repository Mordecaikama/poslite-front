import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '../../config'

export default function ResetPassword() {
  const [values, setValues] = useState({
    password: '',
    emailError: '',
    pwdError: '',
    loading: false,
    msg: '',
  })
  const { confirmpass, loading, newpass, msg, pwdError } = values

  const [status, setStatus] = useState({ new: false, old: false })
  const [webresponse, setWebresponse] = useState(null)
  const userid = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    checkResetCode()
  }, [])

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handlePasswordReset = async (e) => {
    e.preventDefault()
    console.log(userid)

    // if (confirmpass !== newpass) {
    //   setValues({ ...values, pwdError: 'passwords dont match' })
    // } else {
    //   const res = await axios.post(`${API}/reset-password/${userid?.id}`, {
    //     newpass,
    //   })

    //   console.log(res)

    //   if (res.data.error) {
    //     alert(res.data.error)
    //     //   setLoading(false)
    //   } else {
    //     alert('Now you can login with your new password')
    //     navigate('/login')
    //   }
    // }
  }

  const checkResetCode = async () => {
    console.log(userid)

    const res = await axios.post(`${API}/check/code/${userid?.id}`)
    console.log(res)

    if (res.data.ok) {
      setWebresponse(false)
    } else {
      setWebresponse(true)
    }
  }

  const passwordForms = () => {
    return (
      <div className='login-forms'>
        <h1>RESET PASSWORD</h1>
        <h4 style={{ color: 'white' }}>{msg && msg}</h4>
        <i className='fas fa-user-friends'></i>
        <form onSubmit={handlePasswordReset}>
          <div className='login-password'>
            <input
              type={status.new ? 'text' : 'password'}
              placeholder='New Password'
              value={newpass}
              required
              onChange={handleChange('newpass')}
            />
            {status.new ? (
              <i
                className='fas fa-eye'
                onClick={() => setStatus({ ...status, new: !status.new })}
              ></i>
            ) : (
              <i
                className='fas fa-eye-slash'
                onClick={() => setStatus({ ...status, new: !status.new })}
              ></i>
            )}
          </div>

          <div className='login-password'>
            <input
              type={status.old ? 'text' : 'password'}
              placeholder='Confirm Password'
              value={confirmpass}
              required
              onChange={handleChange('confirmpass')}
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
          <span className='error'>{pwdError}</span>

          <button className=' loginBtn'>Reset Password</button>
        </form>
      </div>
    )
  }

  return (
    <div className='login-container'>
      {!webresponse ? passwordForms() : <div>url has expired</div>}
    </div>
  )
}
