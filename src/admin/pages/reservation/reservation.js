import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Context } from '../../../context'
import Tablemanagement from '../../../components/tablemgmt'
import {
  listtable,
  getTableStatusValues,
  updateTable,
  Tableoverview,
} from '../../services/table'
import Add from './add'
import { FILE } from '../../../config'
import TablemgmtMobile from '../../../components/tablemgmtmobile'

function Reservation() {
  const {
    menu,
    setMenu,
    isAuthenticated,
    opTyp,
    tableoverview,
    setTableOverview,
  } = useContext(Context)
  const [tables, setTables] = useState(null)
  const [table, setTable] = useState(null)

  // sets table mgmt to ctive or null
  const [tbst, setTbst] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()

  //for table ranges
  const [statusvalues, setStatusvalues] = useState([])
  const [status, setStatus] = useState('')
  const [filters, setFilters] = useState({ sortBy: -1 })

  const [hide, setHide] = useState({
    addreserve: false, //table order view status
    hidereserve: false,
  })

  const user = isAuthenticated('user')

  useEffect(() => {
    getAlltables()
    loadStatusValues()
  }, [filters])

  const getAlltables = async () => {
    const res = await listtable(user?._id, user?.user)

    if (res) {
      if (res.data) {
        setTables(res.data[0]?.tables)
      }
    }
  }

  const loadStatusValues = async () => {
    const res = await getTableStatusValues()

    if (res) {
      if (res.data) {
        setStatusvalues(res.data)
      }
    }
  }

  const handleStatusChange = async (orderId) => {
    const { _id, ...rest } = orderId
    // console.log(rest)
    const res = await updateTable(_id, user?.user, rest)
    // console.log('trying .... to update')

    if (res) {
      if (res.data) {
        getAlltables()
        getTableOverview()
        setTbst(null)
      }
    }
  }

  const handleTableClick = (tb) => {
    setTbst(tb)
  }

  const handleTableCheckIn = () => {
    // console.log('something')
    setTbst({ ...tbst, status: 'checkedIn' })
  }
  const handleTableUpdate = () => {
    // editTable
    setHide({ ...hide, addreserve: !hide.addreserve })
  }
  const handleCheckInDel = () => {
    const dt = { ...tbst, status: 'free', customer: '', time: '-' }
    // console.log('delete', dt)
    setTbst(dt)
  }
  const handleTableNo = () => {
    setTbst({ ...tbst, status: '' })
  }
  const handleTableYes = async () => {
    // console.log('table updated ', tbst)

    // checks in and sets table to null
    // console.log(tbst, 'from handle')
    handleStatusChange(tbst)
      .then((data) => {
        // console.log(data)
        setTbst(null)
        getAlltables()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const handleTableCheckinYes = async () => {
    // console.log('table updated ', tbst)

    navigate('/companyname/menu', {
      state: { from: location, data: tbst },
    })

    // checks in and sets table to null
  }

  const getTableOverview = async () => {
    // called in getAlltables
    const res = await Tableoverview(user?._id, user?.user)
    // console.log(res)

    if (res) {
      if (res.data) {
        setTableOverview(res.data)
      }
    }
  }

  const resetToUpdateTable = async () => {
    const dt = { ...tbst, status: 'free', customer: '', time: '-' }
    // checks in and sets table to null
    // console.log(tbst, 'from handle')
    handleStatusChange(dt)
  }

  const showStatus = (o) => {
    return (
      <div className='login-password'>
        <h4>{o.status}</h4>
        {/* <select
          className='search-select status-select '
          value={o.status}
          onChange={(e) =>
            handleStatusChange(e, { _id: o._id, status: e.target.value })
          }
        >
          {statusvalues &&
            statusvalues.map((status, i) => (
              <option key={i} value={status}>
                {status}
              </option>
            ))}
        </select> */}
      </div>
    )
  }
  return (
    <div className='container reservation__container'>
      <div className='reservation__main'>
        <div className='header'>
          <span
            className='material-icons-sharp menu'
            onClick={() => setMenu(!menu)}
          >
            menu
          </span>

          <div
            className='cart__container calendar'
            onClick={() => setHide({ ...hide, hidereserve: !hide.hidereserve })}
          >
            <span className='material-icons-sharp '>calendar_month</span>
            {tableoverview &&
              tableoverview
                ?.filter((table) => table._id === 'reserved')
                ?.map((st, ind) => {
                  return (
                    <span key={ind} className='cart_count'>
                      {st?.count}
                    </span>
                  )
                })}
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

        <div className='reservation__floors'>
          <div className='floor active'>1st floor</div>
          <div className='floor'>2nd floor</div>
          <div className='floor'>3rd floor</div>

          <input type='date' className='date' />
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
            tables?.map((table, ind) => {
              return (
                <div
                  className={`reserved__table table__${table.status}`}
                  key={ind}
                  // onClick={() => handleTabClick(table)}
                >
                  <span className='table__name'>{table.name}</span>
                  <span className='table__status'>{showStatus(table)}</span>
                  <span className='reserved__time'>{table.time} </span>
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

          {/* {JSON.stringify(tbst)} */}
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
                  <p className='status__color free'> </p>
                  <span>free</span>
                  <span className='status__no'>18</span>
                </div>
                <div className='status'>
                  <p className='status__color reserved'> </p>
                  <span>reserved</span>
                  <span className='status__no'>18</span>
                </div>
                <div className='status'>
                  <p className='status__color checkedIn'> </p>
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
      </div>

      <Add
        state={hide.addreserve}
        close={() => setHide({ ...hide, addreserve: !hide.addreserve })}
        handleStatus={handleStatusChange}
        tables={tables}
        tbst={tbst}
        handleTableYes={resetToUpdateTable}
      />

      <Tablemanagement
        hide={hide}
        setHide={setHide}
        tables={tables}
        tbst={tbst}
        setTbst={handleTableClick}
        confirmCheckIn={handleTableCheckIn}
        deleteCheckIn={handleCheckInDel}
        no={handleTableNo}
        yes={handleTableYes}
        checkinyes={handleTableCheckinYes}
        editTable={handleTableUpdate}
      />

      <TablemgmtMobile
        hide={hide}
        setHide={setHide}
        tables={tables}
        tbst={tbst}
        setTbst={handleTableClick}
        confirmCheckIn={handleTableCheckIn}
        deleteCheckIn={handleCheckInDel}
        no={handleTableNo}
        yes={handleTableYes}
        checkinyes={handleTableCheckinYes}
        editTable={handleTableUpdate}
      />

      {/* <div className='tablemanagement__mobile'>
        <h2></h2>
      </div> */}
    </div>
  )
}

export default Reservation
