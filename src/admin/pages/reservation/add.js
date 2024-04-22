import React, { useState, useEffect } from 'react'

function Add({
  state,
  close,
  handleStatus,
  tables,
  option = 'free',
  tbst,
  handleTableYes,
}) {
  const [values, setValues] = useState({
    customer: '',
    time: '',
    _id: '',
    status: 'reserved',
  })

  useEffect(() => {
    if (tbst) {
      setValues({
        ...values,
        customer: tbst?.customer,
        time: tbst?.time,
        _id: tbst?._id,
      })
    } else {
      tables && setValues({ ...values, _id: tables[0]?._id })
    }
  }, [tables, tbst])

  const { customer, time } = values

  const handleChange = (name) => (event) => {
    // console.log(event.key)

    setValues({ ...values, [name]: event.target.value })
  }

  const upStatus = (event) => {
    event.preventDefault()

    if (tbst) {
      // checks if tables have changed
      if (tbst?._id !== values?._id) {
        // frees table and deletes its reservations
        handleTableYes(tbst)
      }
    }
    handleStatus(values)
    hideform()
  }

  const clearForms = () => {
    setValues({
      customer: '',
      time: '',
      status: 'reserved',
    })
  }

  const hideform = () => {
    close()
    clearForms()
  }

  return (
    <div
      className={`container toplayer__container addreservation__container  ${
        !state && 'animatetop'
      }`}
    >
      <div className='addreservation__header'>
        <span className='addreservation__text'>Reserve Table</span>

        <span className='material-icons-sharp close' onClick={() => hideform()}>
          close
        </span>
      </div>

      <div className='addreservation__main'>
        <form onSubmit={upStatus}>
          <label>Free Tables</label>
          <div className='login-password'>
            <select
              className='search-select status-select '
              value={values?._id}
              onChange={handleChange('_id')}
            >
              {tables && tbst
                ? tables?.map((table, i) => (
                    <option key={i} value={table._id}>
                      {table.name}
                    </option>
                  ))
                : tables
                    ?.filter((table) => table.status === option)
                    .map((table, i) => (
                      <option key={i} value={table._id}>
                        {table.name}
                      </option>
                    ))}
            </select>
          </div>

          <label>Name</label>
          <div className='login-password'>
            <input
              type='text'
              className='customer'
              value={customer}
              placeholder='Name'
              required
              onChange={handleChange('customer')}
            />
          </div>
          <label>Time</label>
          <div className='login-password'>
            <input
              type='time'
              className='customer'
              value={time}
              placeholder='time'
              required
              onChange={handleChange('time')}
            />
          </div>

          <button className='loginBtn'>{tbst ? 'update' : 'Add Status'}</button>
        </form>
      </div>
    </div>
  )
}

export default Add
