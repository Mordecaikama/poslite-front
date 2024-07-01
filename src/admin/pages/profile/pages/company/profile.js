import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../../context'
import { FILE, S3PATH } from '../../../../../config'
import Notification from '../../../../../components/notification/notification'
import { getOrganisation, updateOrganisation } from '../../../../services/user'

function Profile() {
  const { isAuthenticated } = useContext(Context)
  const [values, setValues] = useState({
    name: '',
    photo: '',
    form: new FormData(),
    logo: '',
  })

  const user = isAuthenticated('user')

  const [notification, setNotification] = useState(null)

  const [selectedfile, setSelectedfile] = useState('')

  const { name, photo, form, logo } = values

  const handleChange = (name) => (event) => {
    if (name === 'photo') {
      const file = event.target.files[0]
      const url = URL.createObjectURL(file)
      setSelectedfile(url)
    }
    let val = name === 'photo' ? event.target.files[0] : event.target.value
    form.set(name, val)
    setValues({ ...values, [name]: event.target.value })
  }

  useEffect(() => {
    getOrgani()
  }, [])

  useEffect(() => {
    const timers = setTimeout(() => setNotification(false), 6000)
    return () => clearTimeout(timers)

    // renders when notification is true
  }, [notification])

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log('something is goin on ')
    upOrganisation(form)
  }

  const getOrgani = async () => {
    const res = await getOrganisation(user?.user, user?._id)

    if (res) {
      if (res.data) {
        setValues({ ...values, name: res.data?.name, logo: res.data?.logo })
      }
    }
  }

  const upOrganisation = async (values) => {
    const res = await updateOrganisation(user?.user, user?._id, values)
    // console.log(res)

    if (res) {
      if (res.data) {
        setNotification(true)
        getOrgani()
      }
    }
  }

  return (
    <div className='container'>
      <div className='container '>
        <div className='login-forms settings__form'>
          <div className='title'>
            <i className='fal fa-th-large'></i>

            {/* <span></span> */}
            <h2>Organisation Settings</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='profile-photo'>
              {selectedfile && selectedfile ? (
                <img src={selectedfile ? selectedfile : ''} alt='' />
              ) : (
                <img src={`${S3PATH}/${logo}`} alt='' />
              )}
            </div>
            <div className='login-password'>
              <input
                type='file'
                className='username'
                value={photo}
                // required
                placeholder='file'
                onChange={handleChange('photo')}
              />
            </div>

            <label htmlFor='title'>Name</label>
            <div className='login-password'>
              <input
                type='text'
                className='username'
                value={name}
                required
                placeholder='Name'
                onChange={handleChange('name')}
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
    </div>
  )
}

export default Profile
