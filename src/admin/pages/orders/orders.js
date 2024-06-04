import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../../../context'
import {
  listOrders,
  updateOrderStatus,
  getOrderStatusValues,
} from '../../services/order'
import Orderhall from './orderhall'
import OrderTable from './ordertable'
import Toplayer from '../../../components/toplayer/toplayer'
import Alert from '../../../components/messages/alert'
import Notification from '../../../components/notification/notification'
import Vieworder from './order'
import DateFilter from '../../../components/datefilter/datefilter'

import DatePicker, { DateObject } from 'react-multi-date-picker'
import { getUsers } from '../../services/user'

const Orders = () => {
  const { appsettings, isAuthenticated, opTyp } = useContext(Context)
  const [orders, setOrders] = useState(null)
  const [order, setOrder] = useState(null)
  const [Filters, setFilters] = useState({
    dates: [],
    operator: null,
    limit: 10,
    createdAt: 'asc',
  })
  const [dt, setdt] = useState([
    new DateObject().subtract(1, 'days'),
    new Date(),
  ])

  const [operators, setOperators] = useState([])
  const [operator, setOperator] = useState({ name: 'All' })

  const [hide, setHide] = useState({
    tview: true, //table order view status
    tdel: true,
    edit: false,
    delalert: true,
    bulkalert: true,
  })

  const [dateObj, setdateObj] = useState(['days', 'months', 'year'])

  const [currentdate, setCurrentdate] = useState('days')
  // sets which notification
  const [notification, setNotification] = useState({
    delorder: false,
    manydelorders: false,
    orderstate: false,
  })

  const [ordlength, setOrdlength] = useState(null)

  const [query, setQuery] = useState({
    limit: 0,
    skip: 0,
  })

  const [view, setView] = useState('table')

  const [rad, setRad] = useState([]) // helps in grouping array of selected voters

  //for orders
  const [statusvalues, setStatusvalues] = useState([])

  const AddRemoveProduct = (order) => (e) => {
    e.stopPropagation()
    // if item in array select else remove from array
    const res = rad.some((item) => item._id === order._id)
    if (res) {
      const r = rad.filter((item) => item._id !== order._id)
      setRad(r)
    } else {
      setRad([...rad, order])
    }
    // console.log(rad)
  }

  const user = isAuthenticated('user')

  useEffect(() => {
    setQuery({ ...query, limit: appsettings?.ordersPerpage })
  }, [])

  useEffect(() => {
    getAllorders()
    loadStatusValues()
    getAllOp()
  }, [dt, operator, query])

  useEffect(() => {
    const timers = setTimeout(
      () =>
        setNotification({
          delorder: false,
          manydelorders: false,
          orderstate: false,
        }),
      6000
    )
    return () => clearTimeout(timers)
  }, [
    notification.delorder,
    notification.manydelorders,
    notification.orderstate,
  ])

  const handleOrdClick = (oder) => {
    // updates field
    // console.log(oder)
    setOrder(oder)
    setHide({ ...hide, edit: !hide.edit })
  }
  const handleOrddel = (oder) => {
    // updates field
    setOrder(oder)
    setHide({ ...hide, delalert: !hide.delalert })
  }

  const handleChange = (name) => (event) => {
    setFilters({ ...Filters, [name]: event.target.value })
  }

  const handleView = (name) => (event) => {
    setView(event.target.value)
  }

  const delBulk = async () => {
    // console.log(rad)

    setHide({ ...hide, bulkalert: !hide.bulkalert })
    setNotification({
      ...notification,
      manydelorders: !notification.manydelorders,
    })
  }

  const delOrd = async () => {
    setHide({ ...hide, delalert: !hide.delalert })
    setNotification({
      ...notification,
      delorder: !notification.delorder,
    })
  }

  const getAllorders = async () => {
    // checks to see if operator is admin and all is selected then it selects all else if operator is 'operator'
    // then selects current operator id else selected operator from dropdown
    let filters = {
      ...Filters,
      // default is all n no option to reselect so it defaults to current operator
      operator:
        opTyp?.permission === 'admin' && operator?.name === 'All'
          ? {}
          : opTyp?.permission === 'operator'
          ? opTyp?._id
          : operator?._id,
      dates: dt,
      limit: query.limit,
      skip: query.skip,
    }
    const res = await listOrders(user?._id, user?.user, filters)
    // console.log(res)

    if (res) {
      // console.log(res.data[0]?.orders)
      if (res.data) {
        setOrders(res.data?.[0]?.totalData)
        setOrdlength(res.data?.[0]?.pagination?.[0]?.total)
      }
    }
  }

  const handleStatusChange = async (e, order) => {
    const res = await updateOrderStatus(order?._id, user?.user, {
      status: e.target.value,
      order,
    })

    if (res) {
      if (res.data) {
        getAllorders()
        setNotification({
          ...notification,
          orderstate: !notification.orderstate,
        })
      }
    }
  }

  const loadStatusValues = async () => {
    const res = await getOrderStatusValues()

    if (res) {
      // console.log(res.data)
      if (res.data) {
        setStatusvalues(res.data)
      }
    }
  }

  const showStatus = (o) => {
    // console.log(o)
    // const newStatusvalues = AddTo(statusvalues, o.status)

    return (
      <div className='login-password'>
        {/* <span>{o.status}</span> */}
        {(o && o?.status === 'Delivered') || o?.status === 'Cancelled' ? (
          <span>{o.status}</span>
        ) : (
          <select
            className='search-select status-select '
            onChange={(e) => handleStatusChange(e, o)}
          >
            <option value={o.status}>{o.status}</option>
            {statusvalues &&
              statusvalues.map((status, i) => (
                <option key={i} value={status}>
                  {status}
                </option>
              ))}
          </select>
        )}
      </div>
    )
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

  //function
  const getAllOp = async () => {
    const res = await getUsers(user?._id, user?.user, {
      permission: 'operator',
    })
    // console.log(res)

    if (res) {
      // console.log(res.data)
      if (res.data) {
        res.data?.users.push({ name: 'All' })
        setOperators(res.data?.users)
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

  const pagesToshow = () => {
    // checks items per page and divides the length of items by it
    // e.g itesm = 10; items per page = 5; total paginate= 2
    // show btns to more paginate if results from divide is greater
    // than division.
    var ppage = appsettings ? appsettings?.ordersPerpage : 5
    const res = Math.ceil(ordlength / ppage)

    return parseInt(res)
  }

  const defaultPagination = () => {
    var ppage = appsettings ? appsettings?.ordersPerpage : 5
    const res = Math.ceil(ordlength / ppage)

    let v = 0

    if (res < appsettings?.ordPaginate) {
      v = res
    } else {
      v = appsettings?.ordersPaginate
    }
    return parseInt(v)
  }

  const checkifMorepages = () => {
    // if more products than the pagination
    // it shows more by clicking the next arrow

    var ppage = appsettings?.ordersPerpage
    const res = Math.ceil(ordlength / ppage)

    if (defaultPagination() < res) {
      return parseInt(res)
    }
  }

  return (
    <div className='container order__container'>
      {/* Delete MANY  orders*/}
      <Notification
        msg='success'
        title='Success'
        subtitle={`Status Updated`}
        toggle={notification.orderstate}
      />
      {/* Delete MANY  orders*/}
      <Notification
        msg='success'
        title='Success'
        subtitle={`Orders Deleted`}
        toggle={notification.manydelorders}
      />
      {/* Delete MANY  orders*/}
      <Notification
        msg='success'
        title='Success'
        subtitle={`Order Deleted`}
        toggle={notification.delorder}
      />

      {/* delete order alert message  */}
      <Toplayer
        state={hide.bulkalert}
        children={
          <Alert
            yes={delBulk}
            no={() => {
              setHide({ ...hide, bulkalert: !hide.bulkalert })
            }}
            msg={`Delete Selected Orders`}
          />
        }
      />

      {/* delete product alert message  */}
      <Toplayer
        state={hide.delalert}
        children={
          <Alert
            yes={delOrd}
            no={() => {
              setHide({ ...hide, delalert: !hide.delalert })
            }}
            msg={`Delete ${order?._id} `}
          />
        }
      />

      <Vieworder
        state={hide.edit}
        close={() => setHide({ ...hide, edit: !hide.edit })}
        order={order}
      />

      <div className='order__info'>
        {/* <h4>Orders</h4> */}
        <div className='login-password'>
          <select value={view} onChange={handleView('view')}>
            <option value='table'>Table</option>
            <option value='hcard'>hall Card</option>
          </select>
        </div>
        <DateFilter
          items={dateObj}
          handleDateClick={handleDateClick}
          currentdate={currentdate}
          dt={dt}
          setdt={setdt}
        />
        {OperatorsComponent()}
      </div>

      <div className='title'>
        <div className='left'>
          <h3>Orders</h3>
        </div>
        <div className='options'>
          <div className='btn-group'>
            {rad.length > 1 && (
              <button
                className='btn-group btn-outline trash'
                onClick={() => setHide({ ...hide, bulkalert: !hide.bulkalert })}
              >
                <i className='fas fa-trash' title='Delete selected voters'></i>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {view === 'table' ? (
        <OrderTable
          orders={orders}
          rad={rad}
          setRad={setRad}
          showStatus={showStatus}
          handleOrdClick={handleOrdClick}
          handleOrddel={handleOrddel}
          hide={hide}
          setHide={setHide}
          query={query}
          setQuery={setQuery}
          appsettings={appsettings}
          pages={pagesToshow}
          showmore={checkifMorepages}
          defaultPagination={defaultPagination}
        />
      ) : (
        <Orderhall
          orders={orders}
          rad={rad}
          setRad={setRad}
          showStatus={showStatus}
          handleOrdClick={handleOrdClick}
          handleOrddel={handleOrddel}
        />
      )}

      <p>{checkifMorepages()}</p>
    </div>
  )
}

export default Orders
