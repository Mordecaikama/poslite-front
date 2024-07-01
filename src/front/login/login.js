import React, { useState, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Context } from '../../context'
import { loginuser, verify } from '../services/user'

function LoginForm() {
  const { authenticate, setApptoken, setOpTyp } = useContext(Context)
  const [values, setValues] = useState({
    email: '',
    password: '', //123456789
    emailError: '',
    pwdError: '',
    error: '',
    accError: '',
  })

  //navigate
  const navigate = useNavigate()

  const [pin, setPin] = useState('')
  const [operator, setOperator] = useState({
    operator: '',
    state: false,
  })

  const [status, setStatus] = useState(false)

  const { email, password, emailError, pwdError, error, accError } = values

  const removechange = () => {
    setValues({ ...values, password: values.password.slice(0, -1) })
  }

  const handleChange = (name) => (event) => {
    // validate = (fieldvalue, name)
    setValues({ ...values, [name]: event.target.value })
    // validate(event.target.value, name)
  }

  const handlePin = async (e, val) => {
    // adds the pin numbers in a string format
    if (password.length < 4) {
      let pinNumber = password + val

      setValues({ ...values, password: pinNumber })
      if (password.length + 1 === 4) {
        handleSubmit(e, pinNumber)
      }
    }
  }

  const handleSubmit = async (e, val) => {
    e.preventDefault()

    const res = await loginuser({ email, password: !val ? password : val })
    if (res) {
      if (res.data) {
        authenticate('user', res.data.data)
        authenticate('token', res.data?.token)
        navigate('/companyname/dashboard')
        clearForms()
        setApptoken(res.data?.token)
      } else {
        setValues({
          ...values,
          pwdError: res?.errors.password,
          emailError: res?.errors.email,
          accError: res?.errors.acc,
        })
      }
    }
  }

  const checkEmail = async (e) => {
    e.preventDefault()

    setValues({ ...values, emailError: '' })
    const res = await verify({ email })
    if (res) {
      if (res) {
        if (res.data) {
          setOperator({ operator: res.data, state: !operator.state })
          setOpTyp(res.data.data)
        } else {
          setValues({ ...values, emailError: 'Wrong email' })
        }
      }
    }
  }

  function clearForms() {
    setValues({
      ...values,
      email: '',
      password: '',
      emailError: '',
      pwdError: '',
      accError: '',
    })
  }

  return (
    <div className='login-container'>
      <div
        className={`loginContainer__right ${
          operator?.operator?.type === 'operator' && 'op_active'
        } `}
      >
        {operator.operator?.type !== 'admin' && (
          <div className='login__right'>
            <p>Enter Your Pin</p>
            <span className='error'>{pwdError}</span>
            <span className='error'>{accError}</span>
            <div className='dots'>
              {[...Array(4)].map((value, index) => {
                return (
                  <span
                    className={`dot ${
                      index + 1 <= password.length && 'active'
                    }`}
                    key={index}
                  ></span>
                )
              })}
            </div>

            <div className='pin__numbers'>
              <button
                className='pin__number'
                onClick={(e) => handlePin(e, '1')}
              >
                1
              </button>
              <button
                className='pin__number'
                onClick={(e) => handlePin(e, '2')}
              >
                2
              </button>
              <button
                className='pin__number'
                onClick={(e) => handlePin(e, '3')}
              >
                3
              </button>
              <button
                className='pin__number'
                onClick={(e) => handlePin(e, '4')}
              >
                4
              </button>
              <button
                className='pin__number'
                onClick={(e) => handlePin(e, '5')}
              >
                5
              </button>
              <button
                className='pin__number'
                onClick={(e) => handlePin(e, '6')}
              >
                6
              </button>
              <button
                className='pin__number'
                onClick={(e) => handlePin(e, '7')}
              >
                7
              </button>
              <button
                className='pin__number'
                onClick={(e) => handlePin(e, '8')}
              >
                8
              </button>
              <button
                className='pin__number'
                onClick={(e) => handlePin(e, '9')}
              >
                9
              </button>
              <button
                className='pin__number'
                onClick={(e) => handlePin(e, '0')}
              >
                0
              </button>
              <button className='pin__number' onClick={() => removechange()}>
                <span className='material-icons-sharp'>close</span>
              </button>
            </div>
          </div>
        )}
      </div>
      <div className='login-forms frontend'>
        <h3>Login</h3>
        <i className='fas fa-user-friends'></i>
        <form>
          <>
            <label htmlFor='email'>Email</label>
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
          </>
          <span className='error'>{emailError}</span>
          {operator.operator.type === 'admin' && (
            <>
              <label htmlFor='password'>Password</label>
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
              <span className='error'>{pwdError}</span>
            </>
          )}

          <button
            className=' loginBtn'
            onClick={
              operator.operator.type === 'admin' ? handleSubmit : checkEmail
            }
          >
            {operator.operator.type === 'admin' ? 'login' : 'Next'}
          </button>
          {/* end of login button */}

          <div className='signup'>
            <span className='fg-pwd' onClick={() => {}}>
              forgotten password
            </span>
            <button
              className='Lgsignup'
              onClick={() => navigate('/password-reset')}
            >
              Reset
            </button>
          </div>
          {/* forgotten password change password. */}

          <div className='signup'>
            Dont have an account{' '}
            <Link to='/signup'>
              <button
                style={{
                  padding: '0.4rem',
                  borderRadius: '0.4rem',
                  background: '#dce1eb',
                }}
              >
                Sign Up
              </button>
            </Link>
          </div>
        </form>
      </div>

      {/* {JSON.stringify(operator)} */}
    </div>
  )
}

export default LoginForm
