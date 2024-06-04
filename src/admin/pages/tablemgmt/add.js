import React, { useEffect } from 'react'

function AddTable({
  addtab,
  uptab,
  table,
  setTable,
  state,
  close,
  values,
  setValues,
}) {
  useEffect(() => {
    if (table) {
      var nu = table.name.substring(table.name.length - 1) //get last digit
      var na = table.name.slice(0, table.name.length - 1)
      // const [na, nu] = table.name
      // console.log(table)
      setValues({
        ...values,
        name: na,
        number: nu,
        id: table?._id,
      })
    } else {
      setValues({
        name: '',
        number: 0,
      })
    }
  }, [table])

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value })
  }

  const addTabe = (event) => {
    event.preventDefault()
    addtab(values)
    clearForms()
  }

  const upTabe = (event) => {
    event.preventDefault()
    uptab(values)
    clearForms()
  }

  const clearForms = () => {
    setValues({
      name: '',
      number: 0,
    })
    setTable(null)
  }

  const hideform = () => {
    close()
    setTable(null)
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
          {table ? 'Update' : 'Add'} Table
        </span>

        <span className='material-icons-sharp close' onClick={() => hideform()}>
          close
        </span>
      </div>

      <div className='addcategory__main'>
        <form onSubmit={table ? upTabe : addTabe}>
          <label>Name</label>
          <div className='login-password'>
            <input
              type='text'
              className='username'
              value={values.name}
              placeholder='Name'
              required
              onChange={handleChange('name')}
            />
          </div>
          <label>Number</label>
          <div className='login-password'>
            <input
              type='number'
              className='username'
              value={values.number}
              placeholder='Number'
              required
              onChange={handleChange('number')}
            />
          </div>
          <span>{values.error}</span>
          <button className='loginBtn'>{table ? 'Update' : 'Add'} Table</button>
        </form>
      </div>
    </div>
  )
}

export default AddTable
