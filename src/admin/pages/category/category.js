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
  const { isAuthenticated } = useContext(Context)
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

  const [rad, setRad] = useState([]) // helps in grouping array of selected voters

  useEffect(() => {
    getAllCate()
  }, [])

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
    const res = await allCategory(user?._id, user.user)

    if (res) {
      console.log(res.data)
      if (res.data) {
        setCategories(res.data?.category)
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
      />
    </div>
  )
}

export default Category
