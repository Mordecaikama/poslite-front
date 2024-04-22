import React, { useState, useEffect, useContext } from 'react'

import {
  createOperator,
  updateOperator,
  getUsers,
  deleteUser,
  DeleteManyOps,
} from '../../services/user'
import { Context } from '../../../context'
import Operatortable from './operatortable'
import AddOperator from './add'
import Toplayer from '../../../components/toplayer/toplayer'
import Alert from '../../../components/messages/alert'

function Operator() {
  const { isAuthenticated } = useContext(Context)
  const [operators, setOperators] = useState([])
  const [operator, setOperator] = useState(null)

  const [rad, setRad] = useState([]) // helps in grouping array of selected operators

  const [hide, setHide] = useState({
    view: true,
    add: false,
    del: true,
    addalert: true,
    bulkalert: true,
  })

  const user = isAuthenticated('user')

  const getAllOp = async () => {
    const res = await getUsers(user?._id, user?.user, {
      permission: 'operator',
    })
    // console.log(res)

    if (res) {
      // console.log(res.data)
      if (res.data) {
        setOperators(res.data?.users)
      }
    }
  }

  const addOp = async (values) => {
    const res = await createOperator(user?._id, user?.user, values)

    if (res) {
      console.log(res)
      if (res.data) {
        setHide({ ...hide, add: !hide.add })
        getAllOp()
      }
    } else {
      console.log(res)
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
    } else {
      console.log(res)
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

  useEffect(() => {
    getAllOp()
  }, [])

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
      />

      <Operatortable
        operators={operators}
        handleOpClick={handleOpClick}
        handleOpdel={handleOpdel}
        hide={hide}
        setHide={setHide}
        rad={rad}
        setRad={setRad}
      />
    </div>
  )
}

export default Operator
