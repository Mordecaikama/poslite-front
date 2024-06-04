import React, { useState } from 'react'

function Menu({ appsettings, handleChange, save }) {
  return (
    <div className='settings'>
      <div className='body'>
        <article>
          <div className='info'>
            <h4>Debit Card Tray Sidebar On Menu </h4>
            <p>
              When this option is enabled, debit card tray in menu page will
              display when paying with card.
            </p>
          </div>
          <label class='switch'>
            <input
              type='checkbox'
              checked={appsettings?.debitSidebar}
              onChange={handleChange('debitSidebar')}
            />
            <span class='slider round'></span>
          </label>
        </article>
        <article>
          <div className='info'>
            <h4>Footer on Menu page </h4>
            <p>
              When this option is enabled, it updates you on the current
              progress of updated orders in the app.
            </p>
          </div>
          <label class='switch'>
            <input
              type='checkbox'
              checked={appsettings?.menufooter}
              onChange={handleChange('menufooter')}
            />
            <span class='slider round'></span>
          </label>
        </article>
        <article>
          <div className='info'>
            <h3>Tax Percentage</h3>
          </div>
          <div class='settings__number'>
            <input
              type='number'
              min={0}
              // pattern='[0-9]*'
              value={appsettings?.tax * 100}
              onChange={handleChange('tax')}
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

export default Menu
