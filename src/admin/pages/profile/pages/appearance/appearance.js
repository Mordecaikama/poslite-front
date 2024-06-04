import React, { useContext, useEffect, useState } from 'react'
import Notification from '../../../../../components/notification/notification'
import { updateOperator, userprofile } from '../../../../services/user'
import { Context } from '../../../../../context'

import { FILE } from '../../../../../config'

function Appearance() {
  const { isAuthenticated, opTyp, setOpTyp } = useContext(Context)
  // const {opTyp} = useContext(ContextProvider)
  const [imgs, setImgs] = useState(false)
  const [selectedfile, setSelectedfile] = useState('')
  const [values, setValues] = useState({
    photo: '',
    form: new FormData(),
  })
  const user = isAuthenticated('user')

  const [notification, setNotification] = useState(null)

  const { photo, form } = values

  useEffect(() => {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    upOp(form)
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
    <div className='container'>
      <div className='login-forms settings__form appearance'>
        <div className='title'>
          <i className='fal fa-street-view'></i>
          <h2>User Logo </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='profile-photo'>
            {selectedfile && selectedfile ? (
              <img src={selectedfile ? selectedfile : ''} alt='' />
            ) : (
              <img src={`${FILE}/images/${opTyp?.img}`} alt='' />
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

          {/* {JSON.stringify(opTyp)} */}

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
