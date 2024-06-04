import React, { useContext, useState } from 'react'
import { Context } from '../../context'

function Receipt({
  removeCart,
  options,
  setOptions,
  showStatus,
  hide,
  handleClick, // sets cart item
  appsettings,
  total,
  tax,
}) {
  const { cart } = useContext(Context)

  const [pin, setPin] = useState('')

  const handleChange = (value) => {
    // adds the pin numbers in a string format
    if (pin.length < 4) {
      let pinNumber = pin + value
      setPin(pinNumber)
      if (pin.length + 1 === 4) {
        console.log(pinNumber)
      }
    }
  }

  const removechange = () => {
    setPin(pin.slice(0, -1))
  }

  return (
    <div className='receipt'>
      <div className='receipt__header'>
        <div className='header__left'>{showStatus()}</div>
      </div>

      <div className='receipt__body'>
        <div className={`receipt__items ${cart.length < 1 && 'no__item'}`}>
          {cart && cart.length < 1 ? (
            <>
              <span className='material-icons-sharp no__cart'>
                remove_shopping_cart
              </span>
              <p>Empty order</p>
            </>
          ) : (
            cart &&
            cart?.map((data, ind) => {
              return (
                <div className='receiptitem__container' key={ind}>
                  <div
                    className={`receipt__item ${
                      data._id === hide.currentCart?._id && 'active'
                    }`}
                    onClick={handleClick(data)}
                  >
                    <span className='bullet'>{ind + 1}</span>
                    <p>
                      {data?.name} x {data?.count}
                    </p>
                    <span className='price'>{data?.price}</span>
                  </div>
                  <span
                    className='material-icons-sharp delete'
                    onClick={() => removeCart(data)}
                  >
                    delete
                  </span>
                </div>
              )
            })
          )}
        </div>

        <div className='receipt__total'>
          <div className='subtotal'>
            <span>subtotal</span>
            <span>$ {total()}</span>
          </div>
          <div className='tax'>
            <span>Tax {appsettings?.tax * 100}%</span>
            <span>$ {tax()}</span>
          </div>

          <hr className='dashed' />

          <div className='Total'>
            <span>Total</span>
            <span>$ {(total() + tax()).toFixed(2)}</span>
          </div>

          <div className='receipt__footer'>
            <div className='payments'>
              <div className='payment'>
                <div className='cash'>
                  <span
                    className='material-icons-sharp pay'
                    onClick={() =>
                      setOptions({ ...options, cash: !options.cash })
                    }
                  >
                    euro_symbol
                  </span>
                  <p>Cash</p>
                </div>
                {appsettings && appsettings?.debitSidebar && (
                  <div className='cash'>
                    <span
                      className='material-icons-sharp pay'
                      onClick={() =>
                        setOptions({ ...options, card: !options.card })
                      }
                    >
                      credit_score
                    </span>
                    <p>Debit Card</p>
                  </div>
                )}
                <div className='cash'>
                  <span className='material-icons-sharp pay'>dashboard</span>
                  <p>E-Wallet</p>
                </div>
              </div>
            </div>

            <button className='placebtn'>Place order</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Receipt
