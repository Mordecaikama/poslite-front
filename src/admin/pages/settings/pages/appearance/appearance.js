import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../../Context'
import axios from 'axios'
import Notification from '../../../../../component/notification/notification'

function Appearance() {
  const { isAuthenticated, authenticate } = useContext(Context)
  const [imgs, setImgs] = useState(false)
  const [selectedfile, setSelectedfile] = useState('')
  const [values, setValues] = useState({
    photo: '',
    form: new FormData(),
    nameError: '',
    loading: false,
  })

  const [logo, setLogo] = useState('')

  const [notification, setNotification] = useState(null)

  const user = isAuthenticated('user')

  const { photo, form, nameError, loading } = values

  useEffect(() => {
    // getOrganisation()
    const timers = setTimeout(() => setNotification(false), 6000)
    return () => clearTimeout(timers)
  }, [notification])

  const handleChange = (name) => (event) => {
    const file = event.target.files[0]
    const url = URL.createObjectURL(file)
    setSelectedfile(url)
    setImgs(true)
    // console.log(file)
    form.set(name, file)
    setValues({ ...values, [name]: event.target.value })
  }

  const handlelogo = async () => {
    // dont put form in an object
    setValues({ ...values, loading: true })
    const res = await axios.post(
      `/api/updatelogo/${user && user.user}/${user && user._id}`,
      form
    )
    if (res) {
      // console.log(res.data.data)
      if (res.data) {
        setLogo(res.data && res.data.data?.logo)
        setNotification(true)
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handlelogo()
  }

  const getOrganisation = async () => {
    // console.log(organi)
    const res = await axios.post(`/api/organisation/${user?.user}/${user?._id}`)
    // console.log(res)
    if (res) {
      if (res.data) {
        setLogo(res.data && res.data?.logo)
      }
    }
  }

  return (
    <div className='container'>
      <div className='login-forms settings__form appearance'>
        <div className='title'>
          <i className='fal fa-street-view'></i>
          <h2>Organisation Logo </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='profile-photo'>
            {selectedfile && selectedfile ? (
              <img src={selectedfile ? selectedfile : ''} alt='' />
            ) : (
              <img src={`/images/${logo}`} alt='' />
            )}
          </div>
          <div className='login-password'>
            <input
              type='file'
              className='username'
              value={photo}
              placeholder='File'
              required
              onChange={handleChange('photo')}
            />
          </div>

          {JSON.stringify(selectedfile)}

          <button className=' loginBtn'>Save</button>
        </form>
      </div>

      <Notification
        msg='success'
        title='Success'
        subtitle='Successfully updated Logo'
        toggle={notification}
      />
    </div>
  )
}

export default Appearance
