import React from 'react'

function Foodcard({ add, data, itemexist }) {
  return (
    <div className={`food__card ${itemexist?.length > 0 && 'itemder'}`}>
      <div className='food__top' onClick={() => add(data, 1)}>
        <div className='title'>
          <span>Orders</span>
          <span className='material-icons-sharp'>east</span>
          <span>Kitchen</span>
        </div>
        <h4>{data?.name}</h4>

        <div className='price'>{data?.price}</div>
      </div>

      <div className='btn-group'>
        <span
          className='material-icons-sharp'
          onClick={() => {
            if (itemexist?.length > 0 && itemexist[0].count > 1) {
              add(data, -1)
            }
          }}
        >
          remove
        </span>
        <input
          type='number'
          value={itemexist?.length > 0 ? itemexist[0].count : 0}
        />
        <span className='material-icons-sharp' onClick={() => add(data, 1)}>
          add
        </span>
      </div>
    </div>
  )
}

export default Foodcard
