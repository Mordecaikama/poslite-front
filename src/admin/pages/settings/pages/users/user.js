import React, { useState } from 'react'

function Users({ handleChange, appsettings, save }) {
  return (
    <div className='setting_users  settings'>
      <div className='body'>
        <article>
          <div className='info'>
            <h3>Number of Users Per Page </h3>
          </div>
          <div class='settings__number'>
            <input
              type='number'
              min={1}
              // pattern='[0-9]*'
              value={appsettings?.usersPerpage}
              onChange={handleChange('usersPerpage')}
            />
          </div>
        </article>
        <article>
          <div className='info'>
            <h3>Pagination</h3>
          </div>
          <div class='settings__number'>
            <input
              type='number'
              min={1}
              // pattern='[0-9]*'
              value={appsettings?.usersPaginate}
              onChange={handleChange('usersPaginate')}
            />
          </div>
        </article>
        <button className='btn-reset' onClick={save}>
          Save
        </button>
      </div>
    </div>
  )
}

export default Users
