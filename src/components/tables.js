import React from 'react'

function Table({ name, items, status }) {
  return (
    <div className='table__container'>
      <div className='table__item'>
        <span className='table__no left'>{name && name}</span>
        <div className='right'>
          <div className='title'>
            <span className='name'>Leslie k.</span>
            {status && (
              <span className='table__progress'>{status && status}</span>
            )}
          </div>
          <div className='table__details'>
            <span>{items && items} items</span>
            <span className='material-icons-sharp arrow'>east</span>
            <span>Kitchen</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
