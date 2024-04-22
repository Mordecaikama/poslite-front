import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../../context'

import Notification from '../../../../../component/notification/notification'

function General() {
  const { isAuthenticated } = useContext(Context)
  const [values, setValues] = useState({
    name: '',
    email: '',
  })
  const [notification, setNotification] = useState(false)

  const user = isAuthenticated('user')

  useEffect(() => {
    // getOrganisation()

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

    handleUpdate()
  }

  const getOrganisation = async () => {
    // console.log(organi)
    const res = await getOrganisation(user?.user, user?._id)

    if (res) {
      console.log(res.data)
      // setValues({
      //   ...values,
      //   name: res.data && res.data?.user?.name,
      //   email: res.data && res.data?.user?.email,
      // })
    } else {
      console.log(res)
    }

    // console.log(new Date() > new Date(res.data.data.elections[0]?.endDate))
    // console.log(res.data.data.elections[0])
  }

  const handleUpdate = async () => {
    const res = await axios.post(`/api/update/${user?.user}`, {
      name,
      email,
    })

    if (res) {
      setNotification(true)
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
