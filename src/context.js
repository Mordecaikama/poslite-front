import React, { useState, useEffect } from 'react'
import axios from 'axios'
export const Context = React.createContext()

function ContextProvider({ children }) {
  const [cart, setCart] = useState([])
  const [cartsize, setCartsize] = useState(0)
  const [menu, setMenu] = useState(false)
  const [cartTotalPrice, setCartTotalPrice] = useState(0)
  const [user, setUser] = useState(null)
  const [opTyp, setOpTyp] = useState(null)
  const [apptoken, setApptoken] = useState(null)
  const [receipt, setReceipt] = useState(false)
  const [tableoverview, setTableOverview] = useState(null)

  const [menuShow, setMenuShow] = useState({
    dashboard: false,
    admin: false,
    profile: false,
  })

  useEffect(() => {
    const user = isAuthenticated('user')
    const { cart } = { ...localStorage }
    let ct = cart ? JSON.parse(cart) : []
    setUser(user)
    setCart(ct)
  }, [])

  const isAuthenticated = (key) => {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key))
    } else {
      return false
    }
  }

  const token = isAuthenticated('token')

  const realtoken = !token ? apptoken : token

  axios.defaults.headers.common['Authorization'] = `Bearer ${realtoken}`
  axios.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      let res = error.response

      if (res.status === 401 && res.statusText === 'Unauthorized') {
        // console.log('JWT is ', res.statusText)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/signin'
      }
    }
  )

  const authenticate = (key, data) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data))
    }
  }

  function AddTolocalStorage(ct = cart, name = 'cart') {
    // localStorage.removeItem('cart')
    localStorage.setItem(name, JSON.stringify(ct))
  }

  function addTocart(item, itemcount = null) {
    // this method adds to our cart and changes the size of cart
    checkToAdd(item, itemcount)
  }

  function checkToAdd(item, itemcount = 0) {
    // this method checks to see if a product exist in the cart,
    // if it doesn't, it adds to cart, and
    // sets the totalItems(),overallPrice(), AddToloalStorage()
    //if it does, from the store page it doesn't increment count
    // b@ from the payment page it has the + which  increments the count
    // or - which decreases the count
    //  which also sets the totalItems(),overallPrice(), AddToloalStorage()
    // adds the product to our cart
    // console.log('itemcount ', itemcount)
    var endcartItems = []
    const itemDer = cart.some((cartItem) => cartItem._id === item._id)

    if (itemDer) {
      const endcartItems = cart.map((cartItem) => {
        if (cartItem._id === item._id) {
          return {
            ...cartItem,
            count: (cartItem.count += itemcount),
          }
        } else {
          return { ...cartItem }
        }
      })
      setCart(endcartItems)
      totalItems(endcartItems)
      overAllPrice(endcartItems)
      AddTolocalStorage(endcartItems)
    } else {
      const newproduct = [...cart, { ...item, count: 1 }]
      setCart(newproduct)
      setCartsize((prevsize) => prevsize + 1)
      totalItems(newproduct)
      overAllPrice(newproduct)
      AddTolocalStorage(newproduct)
      // AddTolocalStorage([...cart, { ...item, count: 1 }])
    }
  }

  function emptycart(cb) {
    if (typeof window !== 'undefined') {
      const newcart = []
      let keysToRemove = ['cart', 'shipmentdetails']

      for (let key of keysToRemove) {
        localStorage.removeItem(key)
      }
      setCart(newcart)
      totalItems(newcart)
      overAllPrice(newcart)
    }
    // get the empty cart and set it into our app.
  }

  function removeCart(item) {
    // setCart((prevItems) => prevItems.filter((prod) => prod.id !== item.id))
    const newcart = cart.filter((cartitem) => cartitem._id != item._id)
    setCart(newcart)
    totalItems(newcart)
    overAllPrice(newcart)
    AddTolocalStorage(newcart)
  }

  function totalItems(items = cart) {
    // this method uses reduce to add all the quantity of product in the cart item
    const tot =
      items &&
      items.reduce((prev, current) => {
        return (prev += current.count)
      }, 0)

    setCartsize(tot)
  }

  // general function for built in methods
  function overAllPrice(items = cart) {
    // this method uses reduce to add all the quantity of product in the cart item
    const tot =
      items &&
      items.reduce((prev, current) => {
        return (prev += current.count * current.price)
      }, 0)

    setCartTotalPrice(tot)
  }

  const totalPrice = (items = cart) => {
    // this method uses reduce to add all the quantity of product in the cart item
    const tot =
      items &&
      items.reduce((prev, current) => {
        return (prev += current.count * current.price)
      }, 0)

    return tot
  }

  return (
    <Context.Provider
      value={{
        cart,
        cartsize,
        cartTotalPrice,
        menu,
        removeCart,
        emptycart,
        totalItems,
        addTocart,
        setMenu,
        isAuthenticated,
        authenticate,
        setApptoken,
        totalPrice,
        menuShow,
        setMenuShow,
        opTyp,
        setOpTyp,
        setReceipt,
        receipt,
        tableoverview,
        setTableOverview,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default ContextProvider
