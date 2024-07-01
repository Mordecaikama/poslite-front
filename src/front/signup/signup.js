import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './signup.css'
import { Signup } from '../services/user'

function SignUpForm() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    gender: 'male',
    organisation: '',
    confirm: '',
    nameError: '',
    emailError: '',
    confirmError: '',
    pwdError: '',
    admin: true,
    elections_per_year: 3,
    size: 200,
    loading: false,
    pwdErrorState: false,

    redirectToReferer: false,
  })

  const [status, setStatus] = useState({
    main: false,
    confirm: false,
  })

  const [pwdValidate, setPwdValidate] = useState(false)

  const [pwd, setPwd] = useState({
    small: { pattern: /[a-z\d]{1,}/i, state: false },
    dig: { pattern: /\d+/, state: false },
    cap: { pattern: /[A-Z]+/, state: false },
    speci: { pattern: /[#$@!%&*?\;]+/, state: false },
    min: { pattern: /^[A-Za-z\d#$@!%&*?\;\.]{8,}$/, state: false },
  })

  const [patterns, setPatterns] = useState({
    telephone: { pattern: /^\d{11}$/, state: false },
    username: { pattern: /^[a-z\d]{5,12}$/i, state: false },
    password: pwd,
    slug: { pattern: /^[a-z\d-]{8,20}$/, state: false },
    email: {
      pattern: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
      state: false,
    },
  })

  const {
    name,
    email,
    password,
    gender,
    organisation,
    elections_per_year,
    size,
    nameError,
    emailError,
    pwdError,
    confirm,
    confirmError,
    redirectToReferer,
    pwdErrorState,
  } = values

  const handleChange = (name) => (event) => {
    if (name === 'password') {
      const obj = {}
      // const mt = pwd.dig.pattern.test(event.target.value)
      const val = Object.keys(pwd).map((k) => {
        if (k) {
          obj[k] = {
            pattern: pwd[k].pattern,
            state: pwd[k].pattern.test(event.target.value),
          }
        }
      })

      setPwd(obj)
    }
    setValues({ ...values, [name]: event.target.value })
  }

  const submit = async (e) => {
    e.preventDefault()
    handleSignup()

    // console.log(values)
  }

  const handleSignup = async () => {
    const res = await Signup(values)
    if (res) {
      if (res.data) {
        navigate(`/confirm-email`)
        clearForms()
      } else {
        setValues({
          ...values,
          nameError: res.err?.name,
          emailError: res.err?.email,
          pwdError: res.err?.password,
        })
      }
    }
  }

  function clearForms() {
    setValues({
      ...values,
      name: '',
      telephone: '',
      dob: '',
      telError: '',
      emailError: '',
      pwdError: '',
      dobError: '',
      nameError: '',
      confirmError: '',
      email: '',
      password: '',
      gender,
      pwdErrorState: false,
    })
  }

  return (
    <div className='login-container'>
      <div className='login-forms frontend'>
        <h3>Create Your Account</h3>
        <i className='fas fa-user-friends'></i>
        <form onSubmit={submit}>
          {/* <span>Name{!cap.state && 'false'}</span> */}
          <div className='login-password'>
            <input
              type='text'
              className='username'
              value={name}
              placeholder='Name'
              required
              onChange={handleChange('name')}
            />
          </div>
          <span className='error'>{nameError}</span>

          <span>Email</span>
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

          <span>Password</span>

          <div className='password__container'>
            <div
              className='login-password password'
              style={{ borderColor: `${pwdErrorState && 'red'}` }}
            >
              <input
                type={status.main ? 'text' : 'password'}
                placeholder='password'
                onFocus={() => setPwdValidate(true)}
                onBlur={() => setPwdValidate(false)}
                value={password}
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
            <div className={`validate ${pwdValidate && 'showvalidate'}`}>
              <div className='validate__sub'>
                <i
                  className={`fas fa-check-circle ${
                    pwd.min.state && 'correct'
                  }`}
                ></i>

                <span className={`${pwd.min.state && 'correct'}`}>
                  Enter between 8 to 20 characters
                </span>
              </div>

              <div className='validate__sub'>
                <i
                  className={`fas fa-check-circle ${
                    pwd.cap.state && pwd.small.state && 'correct'
                  }`}
                ></i>
                <span
                  className={`${pwd.cap.state && pwd.small.state && 'correct'}`}
                >
                  An uppercase and lowercase letter
                </span>
              </div>
              <div className='validate__sub'>
                <i
                  className={`fas fa-check-circle ${
                    pwd.speci.state && pwd.dig.state && 'correct'
                  }`}
                ></i>
                <span
                  className={` ${
                    pwd.speci.state && pwd.dig.state && 'correct'
                  }`}
                >
                  A number and symbol
                </span>
              </div>
            </div>
          </div>

          <span>Confirm Password</span>
          <div className='login-password'>
            <input
              type={status.confirm ? 'text' : 'password'}
              placeholder='confirm password'
              value={confirm}
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

          <span>Organisation Name</span>
          <div className='login-password'>
            <input
              type='text'
              className='username'
              value={organisation}
              placeholder='Organisation name'
              required
              onChange={handleChange('organisation')}
            />
          </div>

          <button className=' loginBtn'>Continue</button>

          <div className='signup'>
            Already have an Account
            <Link to='/signin'>
              <button className='Lgsignup'>Login</button>
            </Link>
          </div>
        </form>
      </div>
      {/* {JSON.stringify(pwd)} */}
    </div>
  )
}

export default SignUpForm
