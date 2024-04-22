import React, { useContext, useState, useEffect, useRef } from 'react'
import {
  getTableStatusValues,
  listtable,
  createTable,
  updateTable,
  Tableoverview,
  deleteTable,
} from '../../services/table'
import { Context } from '../../../context'
import AddTable from './add'
import Toplayer from '../../../components/toplayer/toplayer'
import Alert from '../../../components/messages/alert'

function Table() {
  const { menu, setMenu, isAuthenticated } = useContext(Context)
  const [values, setValues] = useState({
    name: '',
    number: 0,
    error: '',
  })
  // toggles dropdown to off or on
  const [toggle, setToggle] = useState(false)

  const vertRef = useRef([])

  const [hide, setHide] = useState({
    add: false, //table order view status
    addalert: true,
    delalert: true,
  })

  const [tables, setTables] = useState(null)
  const [table, setTable] = useState(null)
  const [tableoverview, setTableOverview] = useState(null)

  const [filters, setFilters] = useState({ status: 'all' })

  //for table ranges
  const [statusvalues, setStatusvalues] = useState([])

  const user = isAuthenticated('user')

  useEffect(() => {
    getAlltables()
    loadStatusValues()
    getTableOverview()
  }, [filters])

  useEffect(() => {
    mouseEnterOut()
  }, [])

  const handleVert = (e) => {
    // const res = vertRef.current?.some((items) => items['_id'] === tables?._id)
    console.log(e.target, 'event')
    const res =
      vertRef.current &&
      vertRef.current?.some((item) => !item?.current?.contains(e.target))

    if (toggle) {
      if (res) {
        setToggle(false)
        setTable(null)
      }
    }
  }

  const mouseEnterOut = () => {
    document.addEventListener('mousedown', handleVert)

    return () => {
      document.removeEventListener('mousedown', handleVert)
    }
  }

  const getAlltables = async () => {
    // console.log(filters)
    const res = await listtable(user?._id, user?.user, filters)
    // console.log(res)

    if (res) {
      // console.log(res.data[0]?.tables)
      if (res.data) {
        setTables(res.data[0]?.tables)
      }
      //  setOrders(res.data[0]?.orders)
    } else {
      console.log(res)
    }
  }

  const getTableOverview = async () => {
    // console.log(filters)
    const res = await Tableoverview(user?._id, user?.user)
    // console.log(res)

    if (res) {
      // console.log(res.data)
      if (res.data) {
        setTableOverview(res.data)
      }
      //  setOrders(res.data[0]?.orders)
    } else {
      console.log(res)
    }
  }

  const loadStatusValues = async () => {
    const res = await getTableStatusValues()

    if (res) {
      // console.log(res.data)
      if (res.data) {
        const values = res.data.push('all')
        setStatusvalues(res.data)
      }
    }
  }

  const handleTabUpdate = () => {
    // updates field
    console.log('edit clicked and updated ')
    setHide({ ...hide, add: !hide.add })
    setToggle(!toggle)
  }

  const handleTabdel = (tab) => {
    // updates field
    // console.log(cat)
    setTable(tab)
    setHide({ ...hide, delalert: !hide.delalert })
    setToggle(!toggle)
  }

  const addtab = async () => {
    let val = { name: values.name + values.number }
    // console.log(val)
    const res = await createTable(user?._id, user?.user, val)
    // console.log(res)

    if (res) {
      // console.log(res.data)
      if (res.data) {
        setHide({ ...hide, add: !hide.add })
        getAlltables()
        getTableOverview()
      } else {
        setValues({ ...values, error: res?.errors?.name })
      }
    }
  }

  const uptab = async (values) => {
    let val = { name: values.name + values.number }
    const res = await updateTable(table?._id, user?.user, val)

    // console.log(res)
    if (res) {
      // console.log(res.data)
      if (res.data) {
        setHide({ ...hide, add: !hide.add })
        getAlltables()
        getTableOverview()
      }
    } else {
      console.log(res)
    }
  }

  const deltab = async () => {
    const res = await deleteTable(table?._id, user?._id, user?.user)
    if (res) {
      if (res.data) {
        getAlltables()
        setHide({ ...hide, delalert: !hide.delalert })
      } else {
        console.log(res)
      }
    }
  }

  const handleFilters = (name) => (event) => {
    // console.log(event.target.value)
    setFilters({ status: event.target.value })
  }

  const showStatus = () => {
    // console.log(Object.values(filters)[0])
    // const newStatusvalues = AddTo(statusvalues, o.status)

    return (
      <div className='login-password'>
        {/* <span>{o.status}</span> */}
        <select
          className='search-select status-select '
          value={Object.values(filters)[0]}
          onChange={handleFilters('filters')}
        >
          {/* <option value={Object.values(filters)[0]}>
            {Object.values(filters)[0]}
          </option> */}
          {statusvalues &&
            statusvalues.map((status, i) => (
              <option key={i} value={status}>
                {status}
              </option>
            ))}
        </select>
      </div>
    )
  }

  const handleVertClick = (tab) => {
    setTable(tab)
    setToggle(!toggle)
  }

  const resetTable = () => {
    setTable(null)
    setToggle((prevToggle) => !prevToggle)
  }

  return (
    <div className='container tablemgmt__container'>
      <div className='reservation__main'>
        <div className='reservation__floors'>
          <input type='date' className='date' />

          {showStatus()}

          <span
            className='material-icons-sharp add'
            onClick={() => setHide({ ...hide, add: !hide.add })}
          >
            add
          </span>
        </div>

        <div
          className={` ${
            tables && tables.length < 1
              ? 'food__container no__item'
              : 'reservation__area '
          }`}
        >
          {tables && tables.length < 1 ? (
            <>
              <span className='material-icons-sharp no__bag'>
                table_restaurant
              </span>
              <p>No Tables in Our Department.</p>
              <p>Add new tables.</p>
            </>
          ) : (
            tables?.map((tab, ind) => {
              return (
                <div
                  className={`reserved__table table__${tab.status}`}
                  key={ind}
                  // onClick={() => handleTabClick(table)}
                >
                  <span className='table__name'>{tab.name}</span>
                  <span className='table__status'>{tab.status}</span>
                  <span className='reserved__time'>{tab.time} </span>

                  {table && table?._id === tab._id ? (
                    <span
                      className='material-icons-sharp tb_more'
                      onClick={resetTable}
                    >
                      close
                    </span>
                  ) : (
                    <span
                      className='material-icons-sharp tb_more'
                      onClick={() => handleVertClick(tab)}
                    >
                      more_vert
                    </span>
                  )}

                  <div
                    className={`dropdown ${
                      table && table._id === tab._id && toggle && 'off'
                    }`}
                    ref={(vertRef.current[ind] = React.createRef())}
                    // onClick={handleVert}
                  >
                    <a onClick={handleTabUpdate}>
                      <span className='material-icons-sharp'>edit</span>
                      <small>Edit</small>
                    </a>
                    <a onClick={() => handleTabdel(tab)}>
                      <span className='material-icons-sharp'>delete</span>
                      <small>Delete</small>
                    </a>
                  </div>
                </div>
              )
            })
          )}
          {/* <div className='reserved__table table__reserved'>
            <span className='table__name'>A1</span>
            <span className='table__status'>Reserved</span>
            <span className='reserved__time'>6:30</span>
          </div>
          <div className='reserved__table table__checkedin'>
            <span className='table__name'>B2</span>
            <span className='table__status'>Reserved</span>
            <span className='reserved__time'>7:30</span>
          </div>
          <div className='reserved__table table__free'>
            <span className='table__name'>A1</span>
            <span className='table__status'>free</span>
            <span className='reserved__time'>-</span>
          </div> */}
        </div>

        <div className='reservation__footer'>
          <div className='reservation__status'>
            <div className='status__left__container'>
              <p>Seats</p>
              <div className='status__left'>
                {tableoverview &&
                  tableoverview?.map((st, ind) => {
                    return (
                      <div className='status'>
                        <p className={`status__color ${st?._id}`}> </p>
                        <span>{st?._id}</span>
                        <span className='status__no'>{st?.count}</span>
                      </div>
                    )
                  })}

                {/* <div className='status'>
                  <p className='status__color reserved'> </p>
                  <span>reserved</span>
                  <span className='status__no'>18</span>
                </div>
                <div className='status'>
                  <p className='status__color checkedin'> </p>
                  <span>Checked in</span>
                  <span className='status__no'>18</span>
                </div> */}
              </div>
            </div>
            <div className='status__right'>
              <div className='seat__status'>
                <p>Table: 33/48</p>
                <progress id='file' value='32' max='50'>
                  {' '}
                  22%{' '}
                </progress>
              </div>
              <div className='seat__status'>
                <p>Seats: 33/48</p>
                <progress id='file' value='32' max='100'>
                  {' '}
                  32%{' '}
                </progress>
              </div>
            </div>
          </div>
        </div>
        <span>{JSON.stringify(toggle)}</span>
      </div>

      <AddTable
        state={hide.add}
        close={() => setHide({ ...hide, add: !hide.add })}
        addtab={addtab}
        uptab={uptab}
        table={table}
        setTable={setTable}
        values={values}
        setValues={setValues}
      />

      {/* delete product alert message  */}
      <Toplayer
        state={hide.delalert}
        children={
          <Alert
            yes={deltab}
            no={() => {
              setHide({ ...hide, delalert: !hide.delalert })
            }}
            msg={`Delete Table ${table?.name} `}
          />
        }
      />

      {/* {JSON.stringify(filters)} */}
    </div>
  )
}

export default Table
