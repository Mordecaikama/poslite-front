import React, { useContext, useEffect, useState } from 'react'
import ProductTable from './producttable'
import Toplayer from '../../../components/toplayer/toplayer'
import Alert from '../../../components/messages/alert'
import Addproduct from './addproduct'
import {
  DeleteManyProducts,
  deleteProduct,
  getProducts,
} from '../../services/menu'
import { Context } from '../../../context'
import Notification from '../../../components/notification/notification'
import { allCategory } from '../../services/category'

function Products() {
  const { isAuthenticated } = useContext(Context)
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState(null)
  // sets which notification
  const [hide, setHide] = useState({
    add: true,
    manydel: true,
    del: true,
  })

  // sets which notification
  const [notification, setNotification] = useState({
    delproduct: false,
    manydel: false,
  })
  const [categories, setCategories] = useState([])

  const [rad, setRad] = useState([]) // helps in grouping array of selected voters

  const user = isAuthenticated('user')

  useEffect(() => {
    getAllproducts()
  }, [])

  useEffect(() => {
    const timers = setTimeout(
      () =>
        setNotification({
          delproduct: false,
          manydel: false,
        }),
      6000
    )
    return () => clearTimeout(timers)
  }, [notification.delproduct, notification.manydel]) //query

  const getAllproducts = async () => {
    const res = await getProducts(user?._id)

    if (res) {
      if (res.data) {
        // console.log(res.data)
        setProducts(res.data?.products)
        getCat()
      }
    }
  }

  const getCat = async () => {
    const res = await allCategory(user?._id, user?.user)

    if (res) {
      // console.log(res.data)
      if (res.data) {
        setCategories(res.data?.category)
      }
      //
    }
  }

  const delproduct = async () => {
    const res = await deleteProduct(product?._id, user?._id, user?.user)

    // console.log(product?._id, user?._id, user?.user)

    if (res) {
      if (res.data) {
        // console.log(res.data)
        setHide({ ...hide, del: !hide.del })
        getAllproducts()
        setNotification({
          ...notification,
          delproduct: !notification.delproduct,
        })
      }
    }
  }
  const setOneproduct = (product) => {
    // console.log(product)
    setProduct(product)
    setHide({ ...hide, del: !hide.del })
  }

  const deleteManyproducts = async () => {
    const res = await DeleteManyProducts(user?._id, user?.user, { data: rad })

    if (res) {
      if (res.data) {
        setHide({ ...hide, manydel: !hide.manydel })
        getAllproducts()
        setNotification({ ...notification, manydel: !notification.manydel })
      } else {
        console.log(res.error)
      }
    }
  }

  return (
    <div className='container product__container'>
      <h1>product page</h1>

      {/* Delete MANY  notification*/}
      <Notification
        msg='success'
        title='Success'
        subtitle={`Selected Products  Deleted`}
        toggle={notification.manydel}
      />
      {/* Delete product notification*/}
      <Notification
        msg='success'
        title='Success'
        subtitle={`${product?.name}  Deleted`}
        toggle={notification.delproduct}
      />

      {/* delete MANY product alert message  */}
      <Toplayer
        state={hide.manydel}
        children={
          <Alert
            yes={deleteManyproducts}
            no={() => setHide({ ...hide, manydel: !hide.manydel })}
            msg={`Delete Selected Products `}
          />
        }
      />

      {/* delete product alert message  */}
      <Toplayer
        state={hide.del}
        children={
          <Alert
            yes={delproduct}
            no={() => {
              setHide({ ...hide, del: !hide.del })
            }}
            msg={`Delete ${product?.name} `}
          />
        }
      />

      {/*  add product top layer  */}
      <Addproduct
        state={hide.add}
        close={() => setHide({ ...hide, add: !hide.add })}
      />
      <ProductTable
        products={products}
        hide={hide}
        setHide={setHide}
        rad={rad}
        setRad={setRad}
        setOneproduct={setOneproduct}
        categories={categories}
      />
    </div>
  )
}

export default Products
