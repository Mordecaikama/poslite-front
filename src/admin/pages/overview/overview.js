import React, { useContext, useEffect, useState } from 'react'
import OverviewCard from '../../../components/cards/overview'
import { userdata } from '../../../data'
import Piechart from './graph/pie'

import { OrdersGraph, ordersOverview } from '../../services/order'

// import 'chart.js/auto'
import { chart as ChartJS } from 'chart.js/auto'
import { Context } from '../../../context'
import DateFilter from '../../../components/datefilter/datefilter'

import DatePicker, { DateObject } from 'react-multi-date-picker'
import { getUsers } from '../../services/user'

function Overview() {
  const { isAuthenticated, opTyp } = useContext(Context)
  const [graphData, setGraphData] = useState(null)
  const [currents, setCurrents] = useState({
    type: '',
    bartype: 'hbar',
  })
  const [userdt, setUserdt] = useState({
    labels: [],
    datasets: [
      {
        label: userdata.map((data) => data.year),
        data: userdata.map((data) => data.userGain),
      },
    ],
  })

  const [Filters, setFilters] = useState({
    dates: [],
    operator: null,
  })

  const [dateObj, setdateObj] = useState(['days', 'months', 'year'])

  const [currentdate, setCurrentdate] = useState('days')

  const [dt, setdt] = useState([
    new DateObject().subtract(1, 'days'),
    new Date(),
  ])

  const [operators, setOperators] = useState([])
  const [operator, setOperator] = useState({ name: 'All' })

  const [orders, setOrders] = useState(null)

  const user = isAuthenticated('user')

  const handleGraphchange = () => {
    return <Piechart data={userdt} />
  }

  useEffect(() => {
    getOrderOverview()
    getAllOp()
    // getgraphdata()
  }, [dt, operator])

  const getOrderOverview = async () => {
    const filter = {
      operator:
        opTyp?.permission === 'admin' && operator?.name === 'All'
          ? {}
          : opTyp?.permission === 'operator'
          ? opTyp?._id
          : operator?._id,
      dates: dt,
    }
    const res = await ordersOverview(user?._id, user?.user, filter)

    if (res) {
      if (res.data) {
        // console.log(res.data)
        setOrders(res.data)
      }
    }
  }

  const getgraphdata = async () => {
    const filter = {
      operator:
        opTyp?.permission === 'admin' && operator?.name === 'All'
          ? {}
          : opTyp?.permission === 'operator'
          ? opTyp?._id
          : operator?._id,
      dates: dt,
    }

    const res = await OrdersGraph(user?._id, user?.user, filter)

    // if (res) {
    // if (res.data) {
    // console.log(res.data)
    // const proc = res.data[0]?.totalData.filter(
    //   (item) => item?.status === 'Processing'
    // )
    // console.log(proc)
    // }
    // }
  }

  const getAllOp = async () => {
    const res = await getUsers(user?._id, user?.user, {
      permission: 'operator',
    })

    if (res) {
      if (res.data) {
        res.data?.users.push({ name: 'All' })
        setOperators(res.data?.users)
      }
    }
  }

  const handleDateClick = (item) => {
    setCurrentdate(currentdate !== item ? item : null)
  }

  const handleOpChange = (value) => (event) => {
    // adds the pin numbers in a string format
    // console.log(value)
    const res = operators.filter((op) => op?.name === event.target.value)

    setOperator(res && res[0])
  }

  const OperatorsComponent = () => {
    return (
      <div className='login-password'>
        {opTyp?.permission === 'operator' ? (
          <span>{opTyp?.name}</span>
        ) : (
          <select
            className='search-select status-select '
            value={operator?.name}
            onChange={handleOpChange('operator')}
          >
            {operators &&
              operators?.map((op, i) => (
                <option key={i} value={op?.name}>
                  {op.name}
                </option>
              ))}
          </select>
        )}
      </div>
    )
  }

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

        <div className='order__info'>
          <DateFilter
            items={dateObj}
            handleDateClick={handleDateClick}
            currentdate={currentdate}
            dt={dt}
            setdt={setdt}
          />
          {OperatorsComponent()}
        </div>

        <div className='overview__cards'>
          {orders?.map((item, ind) => {
            return (
              <OverviewCard
                total={item?.count}
                icon={item?._id === 'Pending' ? 'pending' : item?._id}
                title={item?._id}
                color={item?._id === 'Cancelled' ? 'red' : 'transparent'}
              />
            )
          })}
          {/* <OverviewCard total={10} icon='pending' title='Pending' />
          <OverviewCard title='Orders' />
          <OverviewCard total={21} icon='block' title='Cancelled' color='red' /> */}
        </div>

        {/* <div className='overview__cards'>
          <OverviewCard total={15} icon='equalizer' title='Net Sales' />
          <OverviewCard
            total={21}
            icon='donut_large'
            title='Total Sales'
            color='green'
          />
        </div> */}

        <div className='overview_details'>
          <div className='table__progress'>
            <div className='card'>
              <div className='title'>
                <span>#231128001</span>
                <span>Table a12</span>
              </div>
              <div className='info'>Rachmad Jailani</div>
              <div className='card_b'>
                <div className='progress'>
                  <svg>
                    <circle cx='38' cy='38' r='36'></circle>
                  </svg>
                  <div className='number'>
                    <p>80%</p>
                  </div>
                </div>
                <span>Processing</span>
                <span>6 items </span>
              </div>
            </div>
            <div className='card'>
              <div className='title'>
                <span>#231128001</span>
                <span>Table a12</span>
              </div>
              <div className='info'>Rachmad Jailani</div>
              <div className='card_b'>
                <div className='progress'>
                  <svg>
                    <circle cx='38' cy='38' r='36'></circle>
                  </svg>
                  <div className='number'>
                    <p>80%</p>
                  </div>
                </div>
                <span>Processing</span>
                <span>6 items </span>
              </div>
            </div>
            <div className='card'>
              <div className='title'>
                <span>#231128001</span>
                <span>Table a12</span>
              </div>
              <div className='info'>Rachmad Jailani</div>
              <div className='card_b'>
                <div className='progress'>
                  <svg>
                    <circle cx='38' cy='38' r='36'></circle>
                  </svg>
                  <div className='number'>
                    <p>80%</p>
                  </div>
                </div>
                <span>Processing</span>
                <span>6 items </span>
              </div>
            </div>
          </div>

          <div></div>
        </div>

        <div className='overview__graphs'>
          <div className='revenue__today'>
            <p className='title'>Revenue In</p>

            <div className='revenue__container'>
              <div className='revenue__left'>
                {handleGraphchange('bartype')}
              </div>
              <div className='revenue__right'>
                <div className='top'>
                  <div className='info'>
                    <p>
                      <span className='dot'></span>
                      <span>Dine In</span>
                    </p>
                    <p>
                      <h4 className='percent'>15%(Order)</h4>
                    </p>
                  </div>
                </div>
                <div className='bottom'>
                  <div className='info'>
                    <p>
                      <span className='dot'></span>
                      <span>Dine In</span>
                    </p>
                    <p>
                      <h4 className='percent'>15%(Order)</h4>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='revenue__today'>
            <p className='title'>All Revenue</p>

            <div className='revenue__container'>
              <div className='revenue__left'>
                <span>Estimated Total Revenue</span>
                <p>
                  <span className='currency'>Rp</span> 500.000.000
                </p>
                <span>100 Order</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
