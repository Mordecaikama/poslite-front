import React, { useState, useEffect, useContext } from 'react'

import {
  createOperator,
  updateOperator,
  getOperators,
  deleteUser,
  DeleteManyOps,
} from '../../services/user'
import { Context } from '../../../context'
import Operatortable from './operatortable'
import AddOperator from './add'
import Toplayer from '../../../components/toplayer/toplayer'
import Alert from '../../../components/messages/alert'

function Operator() {
  const { isAuthenticated, appsettings } = useContext(Context)
  const [operators, setOperators] = useState([])
  const [operator, setOperator] = useState(null)

  const [rad, setRad] = useState([]) // helps in grouping array of selected operators

  const [query, setQuery] = useState({
    limit: appsettings?.usersPerpage,
    skip: 0,
  })

  const [error, setError] = useState({ email: '', name: '', password: '' })

  const [opslength, setopslength] = useState(null)

  const [hide, setHide] = useState({
    view: true,
    add: false,
    del: true,
    addalert: true,
    bulkalert: true,
  })

  const user = isAuthenticated('user')

  const getAllOp = async () => {
    const queryfilter = { ...query, permission: 'operator' }

    const res = await getOperators(user?._id, user?.user, {
      permission: 'operator',
      ...query,
    })

    if (res) {
      if (res.data) {
        const lent = res.data?.[0]?.pagination?.[0]?.total - 1
        // setOperators(res.data?.users)
        setOperators(res.data?.[0]?.totalData)
        setopslength(lent)
      }
    }
  }

  const addOp = async (values) => {
    const res = await createOperator(user?._id, user?.user, values)

    if (res) {
      if (res.data) {
        setHide({ ...hide, add: !hide.add })
        getAllOp()
        clearErrors()
      } else {
        console.log(res.errors)
        setError({ ...error, email: res.errors?.email })
      }
    }
  }
  const upOp = async (values) => {
    const res = await updateOperator(operator?._id, user?._id, values)
    // console.log(res)

    if (res) {
      // console.log(res.data)
      setHide({ ...hide, add: !hide.add })
      getAllOp()
    } else {
      console.log(res)
    }
  }

  const delOp = async () => {
    // console.log(operator)
    const res = await deleteUser(user?.user, user?._id, operator)

    if (res) {
      // console.log(res.data)
      if (res.data) {
        setHide({ ...hide, addalert: !hide.addalert })
        getAllOp()
        setOperator(null)
      }
    }
  }

  const delBulk = async () => {
    // console.log(rad)
    const res = await DeleteManyOps(user?._id, user?.user, { data: rad })

    if (res) {
      // console.log(res.data)
      if (res.data) {
        setHide({ ...hide, bulkalert: !hide.bulkalert })
        getAllOp()
      }
    } else {
      // console.log(res)
      setHide({ ...hide, bulkalert: !hide.bulkalert })
    }
  }

  const handleOpClick = (op) => {
    // updates field
    // console.log(cat)
    setOperator(op)
    setHide({ ...hide, add: !hide.add })
  }
  const handleOpdel = (op) => {
    // updates field
    // console.log(cat)
    setOperator(op)
    setHide({ ...hide, addalert: !hide.addalert })
  }

  const pagesToshow = () => {
    // checks items per page and divides the length of items by it
    // e.g itesm = 10; items per page = 5; total paginate= 2
    // show btns to more paginate if results from divide is greater
    // than division.
    var ppage = appsettings ? appsettings?.usersPerpage : 5
    const res = Math.ceil(opslength / ppage)

    return parseInt(res)
  }

  const defaultPagination = () => {
    var ppage = appsettings?.usersPerpage
    const res = Math.ceil(opslength / ppage)

    let v = 0

    if (res < appsettings?.usersPaginate) {
      v = res
    } else {
      v = appsettings?.usersPaginate
    }
    return parseInt(v)
  }

  const checkifMorepages = () => {
    // if more products than the pagination
    // it shows more by clicking the next arrow

    var ppage = appsettings?.usersPerpage
    const res = Math.ceil(opslength / ppage)

    if (defaultPagination() < res) {
      return parseInt(res)
    }
  }

  const clearErrors = () => {
    setError({ name: '', email: '', password: '' })
  }
  useEffect(() => {
    setQuery({ ...query, limit: appsettings?.usersPerpage })
  }, [])

  useEffect(() => {
    getAllOp()
  }, [query])

  return (
    <div className='container operator__container'>
      <h2> operator page</h2>

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
            yes={delOp}
            no={() => {
              setHide({ ...hide, addalert: !hide.addalert })
            }}
            msg={`Delete ${operator?.name} `}
          />
        }
      />

      <AddOperator
        state={hide.add}
        close={() => setHide({ ...hide, add: !hide.add })}
        addOp={addOp}
        upOp={upOp}
        opera={operator}
        setOp={setOperator}
        error={error}
        clearError={clearErrors}
      />

      <Operatortable
        operators={operators}
        handleOpClick={handleOpClick}
        handleOpdel={handleOpdel}
        hide={hide}
        setHide={setHide}
        rad={rad}
        setRad={setRad}
        query={query}
        setQuery={setQuery}
        appsettings={appsettings}
        opslength={pagesToshow}
        showmore={checkifMorepages}
        defaultPagination={defaultPagination}
      />
    </div>
  )
}

export default Operator
