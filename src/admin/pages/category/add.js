import React, { useEffect, useState } from 'react'
import { FILE } from '../../../config'

function AddCategory({ addcat, upcat, cate, setCate, state, close }) {
  const [values, setValues] = useState({
    name: '',
    photo: '',
    form: new FormData(),
  })

  const [selectedCatfile, setSelectedCatfile] = useState('')

  const { name, photo, form } = values

  useEffect(() => {
    if (cate) {
      setValues({
        ...values,
        name: cate?.name,
        id: cate?._id,
        photo: cate?.img,
      })
    } else {
      setValues({
        ...values,
        name: '',
        photo: '',
      })
    }
  }, [cate])

  const handleChange = (name) => (event) => {
    console.log(event.target)
    if (name === 'photo') {
      // sets image on frontend
      const file = event.target.files[0]
      const url = URL.createObjectURL(file)
      setSelectedCatfile(url)
    } else {
      const value = event.target.value
      form.set(name, value)
      setValues({ ...values, [name]: value })
    }
  }

  const addCate = (event) => {
    event.preventDefault()
    addcat(form)
    clearForms()
  }

  const upCate = (event) => {
    event.preventDefault()
    upcat(form)
    clearForms()
  }

  const clearForms = () => {
    setValues({
      name: '',
      form: new FormData(),
      photo: '',
    })
    setCate(null)
    setSelectedCatfile('')
  }

  const hideform = () => {
    close()
    setCate(null)
    clearForms()
  }
  return (
    <div
      className={`container toplayer__container addcategory__container  ${
        !state && 'animatetop'
      }`}
    >
      <div className='addcategory__header'>
        <span className='addcategory__text'>
          {cate ? 'Update' : 'Add'} Category
        </span>

        <span className='material-icons-sharp close' onClick={() => hideform()}>
          close
        </span>
      </div>

      <div className='addcategory__main'>
        <form onSubmit={cate ? upCate : addCate}>
          <div className='newimage' title='click to add profile photo'>
            {selectedCatfile && selectedCatfile ? (
              <label htmlFor='catimg'>
                <img src={selectedCatfile} alt='' />
                <input
                  type='file'
                  id='catimg'
                  style={{ display: 'none' }}
                  hidden
                  onChange={handleChange('photo')}
                />
              </label>
            ) : !photo ? (
              <label htmlFor='catimg'>
                <span className='material-icons-sharp photo'>
                  photo_library
                  <input
                    type='file'
                    id='catimg'
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
              <label htmlFor='catimg' className='profile'>
                <img src={`${FILE}/images/${photo}`} alt='' />
                <input
                  type='file'
                  id='catimg'
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

          <button className='loginBtn'>
            {cate ? 'Update' : 'Add'} Category
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddCategory
