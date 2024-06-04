import React, { useContext, useEffect, useState } from 'react'
import AddCategory from '../category/add'
import {
  allCategory,
  createCategory,
  updateCategory,
} from '../../services/category'
import { createProduct, updateProduct } from '../../services/menu'
import { FileUploader } from 'react-drag-drop-files'
import { Context } from '../../../context'
import Notification from '../../../components/notification/notification'
import { useLocation, useNavigate } from 'react-router'
import { FILE } from '../../../config'

const fileTypes = ['JPG', 'PNG', 'GIF']

function Addnewproduct() {
  const { isAuthenticated } = useContext(Context)
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: 1,
    category: '',
    photo: null,
    form: new FormData(),
    loading: false,
    redirectToReferer: false,
  })

  const location = useLocation()
  const navigate = useNavigate()

  const [errors, setErrors] = useState({})

  // sets which notification
  const [notification, setNotification] = useState({
    addproduct: false,
    adderror: false,
    upproduct: false,
  })

  const [selectedfile, setSelectedfile] = useState('')
  const [Images, setImages] = useState([])

  const [categories, setCategories] = useState([])
  const user = isAuthenticated('user')

  const [hide, setHide] = useState({
    category: false,
  })

  const {
    name,
    description,
    photo,
    form,
    price,
    category,
    loading,
    redirectToReferer,
  } = values

  useEffect(() => {
    getCat()
    if (location.state) {
      setValues({
        ...values,
        name: location.state.data.name,
        description: location.state.data.description,
        price: location.state.data.price,
        category: location.state.data.category,
        photo: location.state.data.img[0],
        proId: location.state.data._id,
      })

      form.set('id', location.state.data._id)
    }
  }, [])

  useEffect(() => {
    const timers = setTimeout(
      () =>
        setNotification({
          addproduct: false,
        }),
      6000
    )
    return () => clearTimeout(timers)
  }, [notification.addproduct, notification.adderror, notification.upproduct]) //query

  const handleChange = (name) => (event) => {
    let imgs = []
    if (name === 'photo') {
      //# sets image on frontend
      const value = event.target.files
      const url = URL.createObjectURL(event.target.files[0])
      setSelectedfile(url)

      for (let ind in value) {
        form.append(name, value[ind])
        imgs.push(value[ind])
      }
      setImages(imgs)
    } else {
      const value = event.target.value
      form.set(name, value)
      setValues({ ...values, [name]: value })
    }
  }

  const addProduct = (event) => {
    event.preventDefault()
    createPro()
  }
  const updatePro = (event) => {
    event.preventDefault()
    upPro()
  }

  const createPro = async () => {
    // console.log(values)
    const res = await createProduct(user?._id, user?.user, form)
    // console.log(res)

    if (res) {
      // console.log(res.data)
      if (res.data) {
        setNotification({
          ...notification,
          addproduct: !notification.addproduct,
        })
        clearForms()
        // navigate(-1)
      } else {
        // console.log(res.errors)
        setErrors(res.errors)
        setNotification({ ...notification, adderror: !notification.adderror })
      }
    }
  }

  const upPro = async () => {
    // console.log('update pro', values)
    // console.log(user) productId, userId, product
    const res = await updateProduct(values?.proId, user?.user, form)
    // console.log(res)

    if (res) {
      // console.log(res.data)
      if (res.data) {
        setNotification({ ...notification, upproduct: !notification.upproduct })
      }
    }
  }

  const getCat = async () => {
    const res = await allCategory(user?._id, user?.user)

    if (res) {
      let val = res.data?.category[0]?._id
      if (res.data) {
        setCategories(res.data?.category)
        //sets first category as default in our forms.
        form.set('category', val)
      }
      //
    }
  }

  const addCat = async (values) => {
    const res = await createCategory(user?._id, user?.user, values)

    if (res) {
      // console.log(res.data)
      if (res.data) {
        setHide({ ...hide, category: !hide.category })
        getCat()
      }
    }
  }
  const upCat = async (values) => {
    const res = await updateCategory(category?._id, user?.user, values)

    if (res) {
      // console.log(res.data)
      if (res.data) {
        setHide({ ...hide, category: !hide.category })
        getCat()
        clearForms()
      }
    }
  }

  const clearForms = () => {
    setValues({
      name: '',
      description: '',
      price: 1,
      category: '',
      photo: null,
      form: new FormData(),
    })
  }

  const hideform = () => {
    clearForms()
  }

  return (
    <div className='addnewproduct__container'>
      <div className='addnewproduct__body'>
        <h2>{location.state ? 'Update' : 'Add'} Product</h2>

        <div className='addnewproduct__main'>
          <div className='left'>
            <p>Add Images</p>
            <div className='newimage'>
              {/* <img src={require('../../../assets/logo.png')} alt='' /> */}

              {selectedfile && selectedfile ? (
                <label htmlFor='rimg'>
                  <img src={selectedfile} alt='' />
                  <input
                    type='file'
                    id='rimg'
                    multiple
                    accept='image/*'
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
                      multiple
                      accept='image/*'
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
                  <img src={`${FILE}/images/${photo}`} alt='' />
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
            {selectedfile ? (
              <div className='image__item'>
                <div className='profile-photo'>
                  <img src={selectedfile} alt='logo' />
                </div>
                <div className='text'>
                  <p>{selectedfile}</p>
                  <p>482 kb</p>
                </div>

                <span
                  className='material-icons-sharp delete'
                  onClick={() => setSelectedfile('')}
                >
                  delete
                </span>
              </div>
            ) : (
              photo && (
                <div className='image__item'>
                  <div className='profile-photo'>
                    <img src={`${FILE}/images/${photo}`} alt='' />
                  </div>
                  <div className='text'>
                    <p>{photo}</p>
                    <p>482 kb</p>
                  </div>
                </div>
              )
            )}
          </div>
          <div className='right'>
            <div className='addproduct__main'>
              <form onSubmit={location.state ? updatePro : addProduct}>
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
                <label>Category</label>
                <div className='login-password'>
                  <select value={category} onChange={handleChange('category')}>
                    {/* <option value={values.category}>{values.category}</option> */}
                    {categories.map((cat, ind) => {
                      return (
                        <option value={cat._id} key={cat.name}>
                          {cat.name}
                        </option>
                      )
                    })}
                  </select>
                  <span
                    className='material-icons-sharp add'
                    onClick={() =>
                      setHide({ ...hide, category: !hide.category })
                    }
                  >
                    add
                  </span>
                </div>
                <label>Price</label>
                <div className='input-groups'>
                  <div className='login-password'>
                    <input
                      type='number'
                      className='username'
                      value={price}
                      required
                      onChange={handleChange('price')}
                    />
                  </div>
                </div>

                <label>Description</label>
                <div className='login-password'>
                  <textarea
                    value={description}
                    placeholder='short description'
                    maxLength='200'
                    cols='20'
                    rows='5'
                    className='username'
                    required
                    onChange={handleChange('description')}
                  ></textarea>
                </div>

                <button className='loginBtn'>
                  {location.state ? 'Update' : 'Add'} Product
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* {JSON.stringify(values)} */}
      </div>

      {/*  up product */}
      <Notification
        msg='success'
        title='Success'
        subtitle={`${name}  Updated`}
        toggle={notification.upproduct}
      />
      {/*  adds product */}
      <Notification
        msg='success'
        title='Success'
        subtitle={`Product  Added`}
        toggle={notification.addproduct}
      />
      {/*  adds product error*/}
      <Notification
        msg='error'
        title='Error'
        subtitle={
          <>
            <p>{errors.category}</p>
            <p>{errors.code}</p>
            <p>{errors.name}</p>
            <p>{errors.price}</p>
          </>
        }
        toggle={notification.adderror}
      />

      <AddCategory
        state={hide.category}
        close={() => setHide({ ...hide, category: !hide.category })}
        addcat={addCat}
        upcat={upCat}
        cate={null}
        setCate={() => {}}
      />
    </div>
  )
}

export default Addnewproduct
