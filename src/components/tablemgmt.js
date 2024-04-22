import React from 'react'

function Tablemanagement({
  hide, // table status to hide and unhide
  setHide, // hides n unhide for a table to be set
  tables, // all checked in table
  tbst, // selected checkedin table data
  setTbst, // sets particular table to be active
  confirmCheckIn, // confirms and checkin table
  deleteCheckIn, // confirms checkin delete
  editTable, // edit reservation
  option = 'reserved',
  no, // declines check in
  yes, // update check
  checkinyes, // chckin yes redirects to menu page to order for a user
}) {
  return (
    <div className='tablemanagement__container'>
      <div className='header'>
        <div className='header__left'>
          <h4>Table Management</h4>
          <p>16 Sept 2023 . 8:23</p>
        </div>
        <div className='header__right'>
          <span
            className='material-icons-sharp add'
            onClick={() => {
              setHide({ ...hide, addreserve: !hide.addreserve })
              setTbst(null)
            }}
          >
            add
          </span>
        </div>
      </div>

      <div className='main'>
        <h2>Reservations</h2>

        <div className='items'>
          {tables
            ?.filter((table) => table.status === option)
            .map((table, ind) => {
              return (
                <div
                  className={`item ${tbst?._id === table._id && 'active'}`}
                  key={ind}
                  onClick={() => setTbst(table)}
                >
                  <div className='tb'>
                    <div className='tb__id'>{table.name}</div>
                    <div className='client__name'>{table.customer}</div>
                  </div>
                  <div className='detail'>
                    <div className='number'>x3</div>
                    <div className='time'>{table.time}</div>
                  </div>
                </div>
              )
            })}
        </div>

        {tbst?._id && (
          <div className='bottom buttons'>
            <button className='cancel' onClick={editTable}>
              Edit
            </button>
            <button className='cancel' onClick={deleteCheckIn}>
              Delete
            </button>
            <button className='checkin' onClick={confirmCheckIn}>
              Check-In
            </button>
          </div>
        )}

        <div className={`alert ${tbst?.status === 'checkedIn' && 'showcheck'}`}>
          <h3>Are you sure you want to Check In Reservation</h3>
          <div className='buttons'>
            <button className='cancel' onClick={no}>
              No
            </button>
            <button className='checkin' onClick={checkinyes}>
              Yes
            </button>
          </div>
        </div>
        <div className={`alert ${tbst?.status === 'free' && 'showdel'}`}>
          <h3>Are you sure you want to Delete Reservation</h3>
          <div className='buttons'>
            <button className='cancel' onClick={no}>
              No
            </button>
            <button className='checkin' onClick={yes}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tablemanagement
