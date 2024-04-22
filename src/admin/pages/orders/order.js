import React from 'react'

function Vieworder({ order, state, close }) {
  return (
    <div
      className={`container toplayer__container editOrder__container  ${
        !state && 'animatetop'
      }`}
    >
      <div className='editOrder__header'>
        <span className='editOrder__text'>View Order</span>

        <span className='material-icons-sharp close' onClick={() => close()}>
          close
        </span>
      </div>

      <div className='layout hall'>
        <div className='hall__card'>
          <div className='hall__head'>
            <div className='table__name'>Table D1</div>
            <div className='order__number'>Order {order?._id.slice(0, 5)}</div>
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
                {order?.products?.map((product, ind) => {
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vieworder
