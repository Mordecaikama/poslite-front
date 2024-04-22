import React, { useContext, useEffect, useState } from 'react'
import Notification from '../../../../../components/notification/notification'
import { updateOperator, userprofile } from '../../../../services/user'
import { Context } from '../../../../../context'

function General() {
  const { opTyp, setOpTyp, isAuthenticated } = useContext(Context)
  const [values, setValues] = useState({
    name: '',
    email: '',
  })
  const [notification, setNotification] = useState(false)

  const user = isAuthenticated('user')

  useEffect(() => {
    setValues({ name: opTyp?.name, email: opTyp?.email })
  }, [opTyp])

  useEffect(() => {
    const timers = setTimeout(() => setNotification(false), 6000)
    return () => clearTimeout(timers)

    // renders when notification is true
  }, [notification])

  const { name, email } = values

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    upOp(values)
  }

  const upOp = async (values) => {
    const res = await updateOperator(opTyp?._id, user?._id, values)
    // console.log(res)

    if (res) {
      // console.log(res.data)
      if (res.data) {
        setNotification(true)
        getProfile()
      }
    }
  }

  const getProfile = async () => {
    const res = await userprofile(user?.user)

    if (res) {
      if (res.data) {
        setOpTyp(res.data?.data)
      }
    }
  }

  return (
    // this css combines login-forms from signup css
    // settings__form from app.css
    <div className='container '>
      <div className='login-forms settings__form'>
        <div className='title'>
          <i className='fal fa-th-large'></i>

          {/* <span></span> */}
          <h2>Profile Settings</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='title'>Name</label>
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
          <label htmlFor='title'>Email</label>
          <div className='login-password'>
            <input
              type='text'
              className='username'
              value={email}
              placeholder='Address'
              required
              onChange={handleChange('email')}
            />
          </div>

          <button className=' loginBtn'>Update</button>
        </form>
      </div>

      <Notification
        msg='success'
        title='Success'
        subtitle='Successfully updated User Profile'
        toggle={notification}
      />
    </div>
  )
}

export default General
