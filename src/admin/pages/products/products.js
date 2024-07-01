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
import { allCat } from '../../services/category'

function Products() {
  const { isAuthenticated, appsettings } = useContext(Context)
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState(null)
  // sets which notification
  const [hide, setHide] = useState({
    add: true,
    manydel: true,
    del: true,
  })

  const [query, setQuery] = useState({
    limit: 0,
    skip: 0,
  })

  // sets which notification
  const [notification, setNotification] = useState({
    delproduct: false,
    manydel: false,
  })
  const [categories, setCategories] = useState([])

  const [productslength, setProductslength] = useState([])

  const [rad, setRad] = useState([]) // helps in grouping array of selected voters

  const user = isAuthenticated('user')

  useEffect(() => {
    setQuery({ ...query, limit: appsettings?.productPerpage })
  }, [])

  useEffect(() => {
    getAllproducts()
  }, [query])

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
    // setQuery({ ...query, limit: appsettings?.productPerpage })

    const res = await getProducts(user?._id, query)

    if (res) {
      if (res.data) {
        setProducts(res.data?.[0]?.totalData)
        setProductslength(
          res.data?.[0]?.pagination?.[0]?.total
            ? res.data?.[0]?.pagination?.[0]?.total
            : 0
        )
        getCat()
      }
    }
  }

  const getCat = async () => {
    const res = await allCat(user?._id, user?.user)

    if (res) {
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

  // pagination
  const deleteManyproducts = async () => {
    const res = await DeleteManyProducts(user?._id, user?.user, { data: rad })

    if (res) {
      if (res.data) {
        setHide({ ...hide, manydel: !hide.manydel })
        getAllproducts()
        setNotification({ ...notification, manydel: !notification.manydel })
      }
    }
  }

  const pagesToshow = () => {
    // checks items per page and divides the length of items by it
    // e.g itesm = 10; items per page = 5; total paginate= 2
    // show btns to more paginate if results from divide is greater
    // than division.
    var ppage = appsettings ? appsettings?.productPerpage : 5
    const res = Math.ceil(productslength / ppage)

    return parseInt(res)
  }

  const defaultPagination = () => {
    var ppage = appsettings ? appsettings?.productPerpage : 5
    const res = Math.ceil(productslength / ppage)

    let v = 0

    if (res < appsettings?.productPaginate) {
      v = res
    } else {
      v = appsettings?.productPaginate
    }
    return parseInt(v)
  }

  const checkifMorepages = () => {
    // if more products than the pagination
    // it shows more by clicking the next arrow

    var ppage = appsettings ? appsettings?.productPerpage : 5
    const res = Math.ceil(productslength / ppage)

    if (defaultPagination() < res) {
      return parseInt(res)
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
        query={query}
        setQuery={setQuery}
        appsettings={appsettings}
        productslength={pagesToshow}
        showmore={checkifMorepages}
        defaultPagination={defaultPagination}
      />
      {/* {JSON.stringify(productslength)} */}
    </div>
  )
}

export default Products
