import React from 'react'

function Alert({ yes, no, msg }) {
  return (
    <div className={`toplayer__container alert__container `}>
      {/* alert container overrides the width and height  */}
      <div className='title'>
        {/* <i className='far fa-exclamation-triangle'></i> */}
        Are you sure you want to {msg}
      </div>

      <div className='btn-group'>
        <button className='btn-reset' onClick={() => yes()}>
          Yes
        </button>
        <button className='btn-reset' onClick={() => no()}>
          No
        </button>
      </div>
    </div>
  )
}

export default Alert
