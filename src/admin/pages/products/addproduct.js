import React, { useState } from 'react'

function Addproduct({ add, state, close }) {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    quantity: 'Male',
    loading: false,
    redirectToReferer: false,
  })

  const {
    name,
    description,
    price,
    category,
    quantity,
    loading,
    redirectToReferer,
  } = values

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value })
  }

  const addProduct = (event) => {
    event.preventDefault()
    // console.log(values)
  }
  return (
    <div
      className={`container toplayer__container addproduct__container  ${
        state && 'animatetop'
      }`}
    >
      <div className='addproduct__header'>
        <span className='addproduct__text'>Add</span>

        <span className={`material-icons-sharp close `} onClick={() => close()}>
          close
        </span>
      </div>
      <div className='addproduct__main'>
        <form onSubmit={addProduct}>
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
          <div className='login-password'>
            <select value={category} onChange={handleChange('category')}>
              {/* <option value={gender}>{gender}</option> */}
              <option value='Male'>PIE</option>
              <option value='Female'>BREAKFAST</option>
            </select>
          </div>

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
          <div className='input-groups'>
            <div className='login-password'>
              <input
                type='text'
                className='username'
                value={quantity}
                placeholder='quanity'
                required
                onChange={handleChange('quantity')}
              />
            </div>
          </div>
          <div className='input-groups'>
            <div className='login-password'>
              <input
                type='text'
                className='username'
                value={description}
                placeholder='Description'
                required
                onChange={handleChange('description')}
              />
            </div>
          </div>

          <button className='loginBtn'>Add Product</button>
        </form>
      </div>
    </div>
  )
}

export default Addproduct
