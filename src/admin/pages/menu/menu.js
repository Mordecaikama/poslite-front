import React, { useContext, useEffect, useState } from 'react'
import { getProducts } from '../../services/menu'
import { allCat, getCategoryProducts } from '../../services/category'
import { Context } from '../../../context'
import { useLocation, useNavigate } from 'react-router-dom'
import { createOrder } from '../../services/order'
import { listtable } from '../../services/table'
import Carousel from '../../../components/Carousel/Carousel'

import Table from '../../../components/tables'
import Receipt from '../receipt'

import Card from '../../../components/cards/catcard'
import Foodcard from '../../../components/cards/foodcard'
import Notification from '../../../components/notification/notification'
import { FILE, responsive } from '../../../config'

function Menu() {
  const {
    cart,
    addTocart,
    removeCart,
    cartsize,
    menu,
    setMenu,
    isAuthenticated,
    totalPrice,
    emptycart,
    opTyp,
    receipt,
    setReceipt,
    appsettings,
    overAllTax,
  } = useContext(Context)

  // const [receipt, setReceipt] = useState(false)
  const [values, setValues] = useState({
    categories: [],
    catProd: [],
    catName: '',
    loading: false,
  })

  const [orderinfo, setOrderinfo] = useState({
    msg: '',
  })

  const [hide, setHide] = useState({
    currentCart: null, // deletes cart item
  })

  const location = useLocation()
  const navigate = useNavigate()

  const [tables, setTables] = useState(null)
  const [table, setTable] = useState('')

  const [options, setOptions] = useState({
    cash: false,
    card: false,
    ewallet: false,
    payerror: 'error',
  })

  const { payerror } = options

  const [pin, setPin] = useState('')

  // sets which notification
  const [notification, setNotification] = useState({
    taberror: false,
  })

  const handleChange = (value) => {
    // adds the pin numbers in a string format
    if (pin.length < 4) {
      let pinNumber = pin + value
      setPin(pinNumber)
    }
  }

  const handleTableChange = (value) => (event) => {
    // adds the pin numbers in a string format

    setTable(event.target.value)
  }

  const removechange = () => {
    setPin(pin.slice(0, -1))
  }

  const [products, setProducts] = useState([])

  const organi = isAuthenticated('user')

  // useEffect(() => {
  //   tables && setTable(tables[0]?.name)
  // }, [tables])

  useEffect(() => {
    getproducts()
    getCategories()
    getAlltables()

    // sets table if user is checked in.
    location && location?.state && setTable(location?.state?.data.name)
  }, [])

  useEffect(() => {
    const timers = setTimeout(
      () =>
        setNotification({
          taberror: false,
        }),
      6000
    )
    return () => clearTimeout(timers)
  }, [notification.taberror])

  const getproducts = async (id) => {
    const res = await getProducts(organi?._id)

    if (res) {
      // console.log(res.data?.products)
      setProducts(res.data?.products)
    }
  }
  const categoryClick = async (cate) => {
    // console.log(cate)

    const res = await getCategoryProducts(organi?._id, cate?._id, organi.user)

    if (res) {
      setValues({ ...values, catProd: res.data?.products, catName: cate?.name })
    }
  }

  const getCategories = async () => {
    const res = await allCat(organi?._id, organi?.user)

    if (res) {
      // console.log(res.data)
      if (res.data) {
        setValues({ ...values, categories: res.data?.category, loading: true })
      }
      //
    }
  }

  const addOrder = async () => {
    const tot = totalPrice()
    const orders = {
      products: cart,
      transaction_id: 'abcde',
      customer: location.state ? location?.state?.data.customer : 'default',
      amount: tot,
      operator: organi.user,
      table: table?.name,
      orderstatus: 'checkedIn',
    }

    if (parseInt(pin) >= tot) {
      const res = await createOrder(organi?._id, organi?.user, orders)

      if (res) {
        if (res.data) {
          emptycart()
          getAlltables()
          // only works if it was reroute from reservation page
          if (location.state) {
            navigate(location.pathname, {})
            setTable('')
          }
        } else {
          setOptions({ ...options, cash: !options.cash })
          setOrderinfo('Please Select table')
          setNotification({
            ...notification,
            taberror: !notification.taberror,
          })
        }
      }
    } else {
    }
  }

  const getAlltables = async () => {
    // console.log(filters)
    const res = await listtable(organi?._id, organi?.user)
    // console.log(res)

    if (res) {
      // console.log(res.data[0]?.tables)
      if (res?.data) {
        let tb = res.data[0]?.tables
        // assigns only free tables
        let free_tb = tb?.filter((table) => table.status === 'free')
        setTables(free_tb)
        setTable(free_tb && free_tb[0])
      }

      //  setOrders(res.data[0]?.orders)
    }
  }

  const showStatus = () => {
    if (location && location?.state) {
      return (
        <>
          <p>Customer: {location?.state?.data.customer}</p>
          <p>Table: {location?.state?.data.name}</p>
        </>
      )
    } else {
      return (
        <div className='login-password'>
          <select
            className='search-select status-select '
            value={table}
            onChange={handleTableChange('table')}
          >
            {tables &&
              tables?.map((table, i) => (
                <option key={i} value={table?.name}>
                  {table.name}
                </option>
              ))}
          </select>
        </div>
      )
    }
  }

  const handleClick = (data) => (event) => {
    setHide({
      ...hide,
      currentCart: hide.currentCart?._id != data?._id ? data : null,
    })
    // console.log(event.target, receiptNode.current)
  }

  const handleCartDelete = (item) => {
    removeCart(item)
    setHide({ ...hide, currentCart: null })
  }

  const eCate =
    values &&
    values.categories.map((product, ind) => {
      return (
        <Card
          product={product}
          items='13'
          key={product?._id}
          handleCategory={categoryClick}
        />
      )
    })

  return (
    <div className='menu__container'>
      {/* Delete MANY  orders*/}
      <Notification
        msg='error'
        title='Error'
        subtitle={orderinfo}
        toggle={notification.taberror}
      />
      <div className='menu__main'>
        <div className='header item'>
          <span
            className='material-icons-sharp menu'
            onClick={() => setMenu(!menu)}
          >
            menu
          </span>

          <div className='menu__search'>
            <input type='text' className='search' />
            <span className='material-icons-sharp search'>search</span>
          </div>

          <div className='cart__container'>
            <span
              className='material-icons-sharp cart'
              onClick={() => setReceipt(!receipt)}
            >
              shopping_cart
            </span>
            <span className='cart_count'>{cartsize}</span>
          </div>

          <div className='profile'>
            <div className='profile-photo'>
              <img src={`${FILE}/images/${opTyp?.img}`} alt='' />
            </div>
            <span className='material-icons-sharp arrow-down'>expand_more</span>
            <span>{opTyp?.name?.split(' ')[0]}</span>

            <div className='dropdown'></div>
          </div>
        </div>
        <div className='menu__category item'>
          <Carousel
            products={eCate}
            slidesToShow={
              values?.categories?.length > 4 ? 4 : values?.categories?.length
            }
            responsive={responsive}
          />
          {!values.loading
            ? 'loading'
            : values?.categories.length < 1 && <h2>NO Category EXIST</h2>}

          {/* <MultiCaros /> */}
        </div>
        <div
          className={`food__container ${
            values.catProd.length < 1 && 'no__item'
          }`}
        >
          {values && values.catProd.length < 1 ? (
            <>
              <span className='material-icons-sharp no__bag'>work_off</span>
              <p>No products available for Category {values.catName}.</p>
              <p>Click on a Category to show available products.</p>
              {/* <p>{JSON.stringify(table)}</p>
              <p>{JSON.stringify(opTyp)}</p> */}
            </>
          ) : (
            values?.catProd.map((data, ind) => {
              const itemDer =
                cart && cart.filter((cartItem) => cartItem._id === data._id)
              return (
                <Foodcard
                  itemexist={itemDer}
                  add={addTocart}
                  key={ind}
                  data={data}
                />
              )
            })
          )}
        </div>
        {/* {JSON.stringify(opTyp)} */}

        {appsettings?.menufooter && (
          <div className='menu__footer item'>
            <Table name='T5' items='5' />
            <Table name='T6' items='8' status='finished' />
            <Table name='T4' items='3' status='paid' />
          </div>
        )}
      </div>

      <Receipt
        state={receipt}
        options={options}
        setOptions={setOptions}
        showStatus={showStatus}
        handleClick={handleClick} // sets cart item
        hide={hide}
        appsettings={appsettings}
        removeCart={handleCartDelete}
        total={totalPrice}
        tax={overAllTax}
      />

      <div className={`receipt__mobile ${receipt && 'showreceipt'}`}>
        <div className='receipt__header'>
          <div className='header__left'>{showStatus()}</div>

          <span
            className='material-icons-sharp close'
            onClick={() => setReceipt(!receipt)}
          >
            close
          </span>
        </div>

        <div className='receipt__body'>
          <div className={`receipt__items ${cart.length < 1 && 'no__item'}`}>
            {cart && cart.length < 1 ? (
              <span className='material-icons-sharp no__cart'>
                remove_shopping_cart
              </span>
            ) : (
              cart &&
              cart?.map((data, ind) => {
                return (
                  <div className='receiptitem__container' key={ind}>
                    <div
                      className={`receipt__item ${
                        data._id === hide.currentCart?._id && 'active'
                      }`}
                      // ref={receiptNode}
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
                      onClick={() => handleCartDelete(data)}
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
              <span>$ {totalPrice()}</span>
            </div>
            <div className='tax'>
              <span>Tax {appsettings?.tax * 100}%</span>
              <span>$ {overAllTax()}</span>
            </div>

            <hr className='dashed' />

            <div className='Total'>
              <span>Total</span>
              <span>$ {(totalPrice() + overAllTax()).toFixed(2)}</span>
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

      <div
        className={`login__right mobilecash ${options.cash && 'cashsideshow'}`}
      >
        <span
          className='material-icons-sharp pin__closeicon'
          onClick={() => setOptions({ ...options, cash: !options.cash })}
        >
          close
        </span>

        <p>Enter the Amount</p>

        <div className='login-password'>
          <input
            type='number'
            className='username'
            value={pin}
            required
            onChange={() => {}}
          />
        </div>

        <label htmlFor=''>{payerror}</label>

        <div className='pin__numbers'>
          <button className='pin__number' onClick={() => handleChange('1')}>
            1
          </button>
          <button className='pin__number' onClick={() => handleChange('2')}>
            2
          </button>
          <button className='pin__number' onClick={() => handleChange('3')}>
            3
          </button>
          <button className='pin__number' onClick={() => handleChange('4')}>
            4
          </button>
          <button className='pin__number' onClick={() => handleChange('5')}>
            5
          </button>
          <button className='pin__number' onClick={() => handleChange('6')}>
            6
          </button>
          <button className='pin__number' onClick={() => handleChange('7')}>
            7
          </button>
          <button className='pin__number' onClick={() => handleChange('8')}>
            8
          </button>
          <button className='pin__number' onClick={() => handleChange('9')}>
            9
          </button>
          <button className='pin__number' onClick={() => handleChange('0')}>
            0
          </button>
          <button className='pin__number' onClick={() => removechange()}>
            <span className='material-icons-sharp'>close</span>
          </button>

          <button className='pin__number' onClick={() => addOrder('orders')}>
            Pay
          </button>
        </div>
      </div>

      <div
        className={`login__right mobilecard ${options.card && 'cardsideshow'}`}
      >
        <span className='material-icons-sharp wifi'>wifi</span>
        <p>Hold Card near reader</p>
        <button onClick={() => setOptions({ ...options, card: !options.card })}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default Menu
