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

const Orders = () => {
  const { menu, setMenu, isAuthenticated } = useContext(Context)
  const [orders, setOrders] = useState(null)
  const [order, setOrder] = useState(null)
  const [Filters, setFilters] = useState({
    date: new Date().toISOString().split('T')[0],
    operator: null,
    limit: 10,
    createdAt: 'asc',
  })

  const [hide, setHide] = useState({
    tview: true, //table order view status
    tdel: true,
    edit: false,
    delalert: true,
    bulkalert: true,
  })

  // sets which notification
  const [notification, setNotification] = useState({
    delorder: false,
    manydelorders: false,
    orderstate: false,
  })

  const [view, setView] = useState('table')

  const [rad, setRad] = useState([]) // helps in grouping array of selected voters

  //for orders
  const [statusvalues, setStatusvalues] = useState([])

  const { date } = Filters

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
    getAllorders()
    loadStatusValues()
  }, [Filters])

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
    console.log(Filters)
    let filters = {
      ...Filters,
      operator: user.user,
      date: Filters.date,
    }
    const res = await listOrders(user?._id, user?.user, filters)
    // console.log(res)

    if (res) {
      // console.log(res.data[0]?.orders)
      if (res.data) {
        setOrders(res.data[0]?.orders)
      }
    } else {
      console.log(res)
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
        <h4>Orders</h4>

        <div className='login-password'>
          <select value={view} onChange={handleView('view')}>
            {/* <option value={gender}>{gender}</option> */}
            <option value='table'>Table</option>
            <option value='hcard'>hall Card</option>
          </select>
        </div>
        <input type='date' className='date' onChange={handleChange('date')} />
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

      {}
      {/* {JSON.stringify(orders)} */}
    </div>
  )
}

export default Orders
