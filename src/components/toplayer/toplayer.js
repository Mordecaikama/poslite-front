import React from 'react'

function Toplayer({ state, children }) {
  return (
    <div
      className='full-img'
      id='imgBox'
      style={{ display: state ? 'none' : 'block' }}
    >
      {children}
    </div>
  )
}

export default Toplayer
