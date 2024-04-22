import React from 'react'

export default function OverviewCard({
  title = 'orders',
  total = 220,
  icon = 'local_mall',
  color = 'inherit',
}) {
  return (
    <div className='overview__card'>
      <div className='overview__top'>
        <div className='card__head'>
          <p>Total {title}</p>
          <span className='material-icons-sharp' style={{ color: color }}>
            {icon}
          </span>
        </div>
        <div className='card__main'>
          <h1>{total}</h1>
        </div>
      </div>
      <div className='card__view'>
        <div className='head'>
          <span>view detail</span>
          <span className='material-icons-sharp icon'>arrow_forward_ios</span>
        </div>
      </div>
    </div>
  )
}
