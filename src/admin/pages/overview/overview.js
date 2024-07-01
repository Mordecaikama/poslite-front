import React, { useContext, useEffect, useState } from 'react'
import OverviewCard from '../../../components/cards/overview'
import { userdata } from '../../../data'
// import HorizontalBar from './graph/hbar'
import Piechart from './graph/pie'
import LineChart from './graph/line'

import { OrdersGraph, listOrders, ordersOverview } from '../../services/order'

// import 'chart.js/auto'
// import { Bar, Line } from 'react-chartjs-2'
import { chart as ChartJS } from 'chart.js/auto'
import { Context } from '../../../context'
import DateFilter from '../../../components/datefilter/datefilter'

import DatePicker, { DateObject } from 'react-multi-date-picker'
import { getUsers } from '../../services/user'
import { Bar } from 'react-chartjs-2'

import sourceData from '../../../assets/sourceData.json'
import HorizontalBar from './graph/hbar'

function Overview() {
  const { isAuthenticated, opTyp } = useContext(Context)

  const [currents, setCurrents] = useState({
    type: '',
    bartype: 'hbar',
  })

  const [lateOrders, setLateOrders] = useState(null)
  const [userdt, setUserdt] = useState({
    labels: [],
    datasets: [
      {
        label: 'hbar',
        data: [], //userdata.map((data) => data.userGain),
      },
    ],
  })

  const [Filters, setFilters] = useState({
    createdAt: 'desc',
  })

  const [dateObj, setdateObj] = useState(['days', 'months', 'year'])

  const [currentdate, setCurrentdate] = useState('days')

  const [dt, setdt] = useState([
    // new DateObject().subtract(1, 'days'),
    new Date().toISOString().slice(0, 10),
  ])

  const [operators, setOperators] = useState([])
  const [operator, setOperator] = useState({ name: 'All' })

  const [orders, setOrders] = useState(null)

  const user = isAuthenticated('user')

  const handleGraphchange = (name) => {
    if (currents.bartype === 'hbar') {
      return <Bar data={userdt} />
    } else if (currents.bartype === 'pie') {
      return <Piechart data={userdt} />
    } else if (currents.bartype === 'Line') {
      return <LineChart data={userdt} />
    } else {
      return <h2>No graph Yet</h2>
    }
  }

  const handleChange = (name) => (event) => {
    setCurrents({ ...currents, [name]: event.target.value })

    setUserdt({
      labels: orders?.map((lab) => lab?._id),
      datasets: [
        {
          label: event.target.value,
          data: orders?.map((item) => item?.count),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderRadius: 5,
          scales: {
            x: {
              grid: {
                color: 'red',
              },
            },
          },
        },
      ],
    })
  }

  useEffect(() => {
    getOrderOverview()
    getAllOp()
    getAllorders()
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
        setOrders(res.data) //same as graph data
        setUserdt({
          labels: res.data?.map((lab) => lab?._id),
          datasets: [
            {
              label: userdt?.bartype,
              data: res.data?.map((item) => item?.count),
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)',
              ],
              borderRadius: 5,
            },
          ],
        })
      }
    }
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

    const res = operators.filter((op) => op?.name === event.target.value)

    setOperator(res && res[0])
  }

  const getAllorders = async () => {
    // checks to see if operator is admin and all is selected then it selects all else if operator is 'operator'
    // then selects current operator id else selected operator from dropdown
    let filters = {
      // default is all n no option to reselect so it defaults to current operator
      ...Filters,
      operator:
        opTyp?.permission === 'admin' && operator?.name === 'All'
          ? {}
          : opTyp?.permission === 'operator'
          ? opTyp?._id
          : operator?._id,
      dates: [new Date().toISOString().slice(0, 10)],
      limit: 10,
      skip: 0,
    }
    const res = await listOrders(user?._id, user?.user, filters)

    if (res) {
      if (res.data) {
        setLateOrders(res.data?.[0]?.totalData.slice(0, 5))
      }
    }
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

        {/* // orders overview  */}
        <h2>Orders Based on Date</h2>
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

        {/* late orders  */}
        <div className='overview_details'>
          <h2>Todays Current Orders</h2>
          <div className='table__progress'>
            {lateOrders?.map((item, ind) => {
              return (
                <div className='card'>
                  <div className='title'>
                    <span>#{item?._id.slice(0, 5)}</span>
                    <span>Table {item?.table}</span>
                  </div>
                  <div className='info'>Customer: {item?.customer}</div>
                  <div className='card_b'>
                    <span>{item?.status}</span>
                    <p>
                      {item?.products.length}
                      {`${item?.products.length > 1 ? ' items' : ' item'}`}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div></div>
        </div>

        <div className='overview__graphs'>
          <h2>Graphs Representation</h2>
          <div className='revenue__today'>
            <p className='title'>Revenue In</p>
            <div className='header'>
              <select
                value={currents.bartype}
                onChange={handleChange('bartype')}
              >
                <option value='hbar'>Horizontal Bar</option>
                <option value='pie'>Pie</option>
                <option value='Line'>Line</option>
              </select>
            </div>

            <div className='revenue__container'>
              {orders && orders.length > 0 ? (
                handleGraphchange('bartype')
              ) : (
                <div className='no__graph'>
                  <h2>No Projected Graph</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
