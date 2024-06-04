import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../context'
import {
  allCategory,
  createCategory,
  deleteCategory,
  updateCategory,
  DeleteManyCategory,
} from '../../services/category'
import Categorytable from './categorytable'
import AddCategory from './add'
import Alert from '../../../components/messages/alert'
import Toplayer from '../../../components/toplayer/toplayer'

function Category() {
  const { isAuthenticated, appsettings } = useContext(Context)
  const [value, setValues] = useState('')
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState(null)
  const user = isAuthenticated('user')

  const [hide, setHide] = useState({
    view: true,
    add: false,
    del: true,
    addalert: true,
    bulkalert: true,
  })

  const [query, setQuery] = useState({
    limit: 0,
    skip: 0,
  })

  const [catlength, setCatlength] = useState(null)

  const [rad, setRad] = useState([]) // helps in grouping array of selected voters

  useEffect(() => {
    setQuery({ ...query, limit: appsettings?.catPerpage })
  }, [])

  useEffect(() => {
    getAllCate()
  }, [query])

  const handleChange = (name) => (event) => {
    // updates field

    setValues(event.target.value)
  }
  const handleCatClick = (cat) => {
    // updates field
    // console.log(cat)
    setCategory(cat)
    setHide({ ...hide, add: !hide.add })
  }
  const handleCatdel = (cat) => {
    // updates field
    // console.log(cat)
    setCategory(cat)
    setHide({ ...hide, addalert: !hide.addalert })
  }
  const handlebulkdel = () => {
    // updates field
    setHide({ ...hide, bulkalert: !hide.bulkalert })
  }

  const getAllCate = async () => {
    const res = await allCategory(user?._id, user.user, query)

    if (res) {
      if (res.data) {
        // setCategories(res.data?.category)
        // console.log(res.data)
        setCategories(res.data?.[0]?.totalData)
        setCatlength(res.data?.[0]?.pagination?.[0]?.total)
      }
    }
  }

  const addCat = async (values) => {
    // console.log(values, 'values')
    const res = await createCategory(user?._id, user?.user, values)

    if (res) {
      // console.log(res)
      if (res.data) {
        setHide({ ...hide, add: !hide.add })
        getAllCate()
      }
    }
  }
  const upCat = async (values) => {
    const res = await updateCategory(category?._id, user?.user, values)

    if (res) {
      // console.log(res.data)
      if (res.data) {
        setHide({ ...hide, add: !hide.add })
        getAllCate()
      }
    }
  }
  const delBulk = async () => {
    // console.log(rad)
    const res = await DeleteManyCategory(user?._id, user?.user, { data: rad })

    if (res) {
      // console.log(res.data)
      if (res.data) {
        setHide({ ...hide, bulkalert: !hide.bulkalert })
        getAllCate()
      } else {
        setHide({ ...hide, bulkalert: !hide.bulkalert })
      }
    }
  }
  const delCat = async () => {
    const res = await deleteCategory(category?._id, user?._id, user?.user)

    if (res) {
      // console.log(res.data)
      if (res.data) {
        if (res.data) {
          setHide({ ...hide, addalert: !hide.addalert })
          getAllCate()
          setCategory(null)
        }
      }
    }
  }

  const pagesToshow = () => {
    // checks items per page and divides the length of items by it
    // e.g itesm = 10; items per page = 5; total paginate= 2
    // show btns to more paginate if results from divide is greater
    // than division.
    var ppage = appsettings ? appsettings?.catPerpage : 5
    const res = Math.ceil(catlength / ppage)

    return parseInt(res)
  }

  const defaultPagination = () => {
    var ppage = appsettings ? appsettings?.catPerpage : 5
    const res = Math.ceil(catlength / ppage)

    let v = 0

    if (res < appsettings?.catPaginate) {
      v = res
    } else {
      v = appsettings?.catPaginate
    }
    return parseInt(v)
  }

  const checkifMorepages = () => {
    // if more products than the pagination
    // it shows more by clicking the next arrow

    var ppage = appsettings?.catPerpage
    const res = Math.ceil(catlength / ppage)

    if (defaultPagination() < res) {
      return parseInt(res)
    }
  }

  return (
    <div className='container category__container'>
      <h1>category </h1>

      {/* delete product alert message  */}
      <Toplayer
        state={hide.bulkalert}
        children={
          <Alert
            yes={delBulk}
            no={() => {
              setHide({ ...hide, bulkalert: !hide.bulkalert })
            }}
            msg={`Delete Selected Categories`}
          />
        }
      />

      {/* delete product alert message  */}
      <Toplayer
        state={hide.addalert}
        children={
          <Alert
            yes={delCat}
            no={() => {
              setHide({ ...hide, addalert: !hide.addalert })
            }}
            msg={`Delete ${category?.name} `}
          />
        }
      />

      <AddCategory
        state={hide.add}
        close={() => setHide({ ...hide, add: !hide.add })}
        addcat={addCat}
        upcat={upCat}
        cate={category}
        setCate={setCategory}
      />

      <Categorytable
        categories={categories}
        handleCatClick={handleCatClick}
        handleCatdel={handleCatdel}
        hide={hide}
        setHide={setHide}
        rad={rad}
        setRad={setRad}
        query={query}
        setQuery={setQuery}
        appsettings={appsettings}
        pages={pagesToshow}
        showmore={checkifMorepages}
        defaultPagination={defaultPagination}
      />
      {/* {JSON.stringify(pagesToshow())} */}
      {/* {2} */}
    </div>
  )
}

export default Category
