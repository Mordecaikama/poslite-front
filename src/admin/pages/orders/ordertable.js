import React, { useState } from 'react'
import moment from 'moment'

function OrderTable({
  orders,
  rad,
  setRad,
  showStatus,
  setHide,
  hide,
  handleOrdClick,
  handleOrddel,
}) {
  const [hovered, setHovered] = useState(false)

  const [cVoterRow, setCVoterRow] = useState(null)

  const AddRemoveOrder = (cate) => (e) => {
    e.stopPropagation()
    // if item in array select else remove from array
    const res = rad.some((item) => item._id === cate._id)
    if (res) {
      const r = rad.filter((item) => item._id !== cate._id)
      setRad(r)
    } else {
      setRad([...rad, cate])
    }
    // console.log(rad)
  }

  const handleMouseEnterState = (order) => {
    // this handles current voter row when mouse hovers over the row
    setHovered(true)
    setCVoterRow(order)
    // console.log(hovered, product._id)
  }
  const handleMouseLeaveState = (order) => {
    // this handles current voter row when mouse hovers over the row
    setHovered(false)
    setCVoterRow(null)
  }

  return (
    <div className='container ordertable__container'>
      {/* <div className='title'>
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
      </div> */}

      <table className='voters__table'>
        <thead>
          <tr>
            <th>
              <input
                type='checkbox'
                checked={rad.length === orders?.length}
                onClick={() =>
                  orders && rad.length === orders?.length
                    ? setRad([])
                    : setRad(orders)
                }
                onChange={() => {}}
              />
            </th>
            <th>Date</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Status</th>
            <th>Table</th>
            <th>Total Orders</th>
            <th>Operator</th>
            <th>transaction id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order, ind) => {
              return (
                <tr
                  onMouseEnter={() => handleMouseEnterState(order)}
                  onMouseLeave={() => handleMouseLeaveState(order)}
                >
                  <td>
                    <input
                      type='checkbox'
                      checked={rad.some((el) => el._id === order._id)}
                      value='voted'
                      onChange={AddRemoveOrder(order)}
                      data-for='tip'
                      data-tip={`select to add election to frontend`}
                    />
                  </td>
                  <td>{moment(order.createdAt).fromNow()}</td>
                  <td>{order.customer} </td>
                  <td>{Math.ceil(order.amount)}</td>
                  <td> {Math.ceil(order.amount)} </td>
                  <td>
                    <span className='badge'>{showStatus(order)}</span>
                  </td>
                  <td>{order.table}</td>
                  <td>{order?.products.length} </td>
                  <td>{order.operator?.name}</td>
                  <td>{order.transaction_id}</td>
                  <td>
                    {/* {rad.length < 2 && hovered && cVoterRow._id === voter._id && ( */}

                    <div
                      className={`btn-group ${
                        rad.length < 2 &&
                        hovered &&
                        cVoterRow._id === order._id &&
                        'btn__show'
                      }`}
                    >
                      <i
                        className='fas fa-trash'
                        onClick={() => handleOrddel(order)}
                      ></i>

                      <i
                        className='fal fa-pen-square'
                        onClick={() => handleOrdClick(order)}
                      ></i>
                    </div>
                    {/* )} */}
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default OrderTable
