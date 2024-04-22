import React, { useContext } from 'react'
import OverviewCard from '../../../components/cards/overview'

function Overview() {
  return (
    <div className='container overview__container'>
      <div className='login__left'>
        <div className='loginleft__header'>
          <p>Shift 2</p>
          <p className='date'>
            Monday, 6 Fefb 2023 <span className='dot'></span> 8:23 AM
          </p>
        </div>
      </div>
      <div className='overview'>
        <h1>Monitoring</h1>
        <p>You can see your performance here</p>

        <div className='overview__cards'>
          <OverviewCard title='Orders' />
          <OverviewCard total={10} icon='pending' title='Pending' />
          <OverviewCard total={21} icon='block' title='Cancelled' color='red' />
        </div>

        <div className='overview__cards'>
          <OverviewCard total={15} icon='equalizer' title='Net Sales' />
          <OverviewCard
            total={21}
            icon='donut_large'
            title='Total Sales'
            color='green'
          />
        </div>

        <div className='overview__graphs'>
          <span className='material-icons-sharp'>pie_chart</span>
        </div>
      </div>
    </div>
  )
}

export default Overview
