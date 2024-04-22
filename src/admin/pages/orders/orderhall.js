import React from 'react'

function Orderhall({
  rad,
  setRad,
  orders,
  showStatus,
  setHide,
  hide,
  handleOrdClick,
  handleOrddel,
}) {
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

  return (
    <div className='layout hall'>
      {orders?.map((order, ind) => {
        return (
          <div className='hall__card'>
            <div className='hall__head'>
              <input
                type='checkbox'
                checked={rad.some((el) => el._id === order._id)}
                value='voted'
                onChange={AddRemoveOrder(order)}
                data-for='tip'
                data-tip={`select to add election to frontend`}
              />
              <div className='table__name'>Table D1</div>
              <div className='order__number'>
                Order {order?._id.slice(0, 5)}
              </div>
            </div>

            <div className='hall__details'>
              <table>
                <thead>
                  <tr>
                    <th>QT</th>
                    <th>items</th>
                    <th>price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products?.map((product, ind) => {
                    return (
                      <tr>
                        <td>{product?.count}</td>
                        <td>{product?.name}</td>
                        <td>{product?.price}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className='total'>
                <span>Subtotal</span>
                <span>$ {order?.amount}</span>
              </div>

              <div className='btn-group'>
                <span
                  className='material-icons-sharp'
                  onClick={() => handleOrddel(order)}
                >
                  delete_outline
                </span>
                <span
                  className='material-icons-sharp'
                  onClick={() => handleOrdClick(order)}
                >
                  border_color
                </span>
                {showStatus(order)}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Orderhall
