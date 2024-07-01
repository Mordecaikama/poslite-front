import React, { useState, useEffect } from 'react'

import { FILE, S3PATH } from '../../../config'

function AddOperator({
  addOp,
  upOp,
  opera,
  setOp,
  state,
  close,
  error,
  clearError,
}) {
  const [values, setValues] = useState({
    name: '',
    photo: '',
    password: '',
    form: new FormData(),
  })

  const [selectedfile, setSelectedfile] = useState('')

  const { name, photo, email, password, form } = values

  useEffect(() => {
    // console.log(opera)
    if (opera) {
      setValues({
        ...values,
        name: opera?.name,
        photo: opera?.img,
        password: '',
        email: opera?.email,
        id: opera?._id,
      })
    } else {
      setValues({
        ...values,
        name: '',
        photo: '',
        password: '',
        email: '',
      })
    }
  }, [opera])

  const handleChange = (name) => (event) => {
    // console.log(event.key)
    let val
    if (name === 'photo') {
      // sets image on frontend
      const file = event.target.files[0]
      const url = URL.createObjectURL(file)
      setSelectedfile(url)
    }
    if (name === 'password') {
      if (event.target.value.length <= 4) {
        // let passwordNumber = values.password + event.target.value
        form.set(name, event.target.value)
        setValues({ ...values, [name]: event.target.value })
      }
    } else {
      val = name === 'photo' ? event.target.files[0] : event.target.value
      form.set(name, val)
      setValues({ ...values, [name]: val })
    }
  }

  const addOperator = (event) => {
    event.preventDefault()
    // console.log(values)
    addOp(form)
    clearForms()
  }
  const upOperator = (event) => {
    event.preventDefault()
    // console.log('update')
    upOp(form)
    clearForms()
  }

  const clearForms = () => {
    setValues({
      name: '',
      photo: '',
      email: '',
      password: '',
      form: new FormData(),
      loading: false,
      redirectToReferer: false,
    })
    setSelectedfile('')
  }

  const hideform = () => {
    close()
    clearForms()
    setOp(null)
    clearError()
  }

  return (
    <div
      className={`container toplayer__container addoperator__container  ${
        !state && 'animatetop'
      }`}
    >
      <div className='addoperator__header'>
        <span className='addoperator__text'>
          {opera ? 'Update' : 'Add'} Operator
        </span>

        <span className='material-icons-sharp close' onClick={() => hideform()}>
          close
        </span>
      </div>

      <div className='addoperator__main'>
        <form onSubmit={opera ? upOperator : addOperator}>
          <div className='newimage' title='click to add profile photo'>
            {selectedfile && selectedfile ? (
              <label htmlFor='rimg'>
                <img src={selectedfile} alt='' />
                <input
                  type='file'
                  id='rimg'
                  style={{ display: 'none' }}
                  hidden
                  onChange={handleChange('photo')}
                />
              </label>
            ) : !photo ? (
              <label htmlFor='file'>
                <span className='material-icons-sharp photo'>
                  photo_library
                  <input
                    type='file'
                    id='file'
                    // multiple
                    // accept='image/*'
                    style={{ display: 'none' }}
                    onChange={handleChange('photo')}
                  />
                </span>
                <p>
                  <span className='material-icons-sharp upload'>
                    file_upload
                  </span>
                  Drop your files here or Browse.
                </p>
              </label>
            ) : (
              // this side is for edit; when an image exist
              // show image
              <label htmlFor='file' className='profile'>
                <img src={`${S3PATH}/${photo}`} alt='' />
                <input
                  type='file'
                  id='file'
                  style={{ display: 'none' }}
                  hidden
                  onChange={handleChange('photo')}
                />
              </label>
            )}
          </div>

          <label>Name</label>
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
          <p className='error'>{error.name}</p>
          <label>Email</label>
          <div className='login-password'>
            <input
              type='email'
              className='username'
              value={email}
              placeholder='Email'
              required
              onChange={handleChange('email')}
            />
          </div>
          <p className='error'>{error.email}</p>
          <label>password</label>
          <div className='login-password'>
            <input
              type='number'
              pattern='[0-9]*'
              inputmode='numeric'
              className='username password'
              value={password}
              placeholder='password'
              required={opera ? false : true}
              onChange={handleChange('password')}
              // onKeyDown={removechange}
            />
          </div>
          <p className='error'>{error.password}</p>

          <button className='loginBtn'>
            {opera ? 'Update' : 'Add'} Operator
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddOperator
