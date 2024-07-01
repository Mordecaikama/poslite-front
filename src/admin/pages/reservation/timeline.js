import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../../../context'
// import { listtable } from '../../services/table'

function Timeline() {
  const { menu, setMenu, isAuthenticated } = useContext(Context)

  const [tables, setTables] = useState(null)
  const [table, setTable] = useState(null)

  const user = isAuthenticated('user')

  useEffect(() => {
    // getAlltables()
    // loadStatusValues()
  }, [])

  // const getAlltables = async () => {
  //   const res = await listtable(user?._id)

  // }

  return (
    <div className='container timeline__container'>
      <div className='timeline__main'>
        <div className='header'>
          <div className='timeline__search'>
            <input type='text' className='search' />
            <span className='material-icons-sharp search__icon'>search</span>
          </div>

          <span className='material-icons-sharp menu'>menu</span>
        </div>

        <div className='timeline__floors'>
          <div className='floor active'>1st floor</div>
          <div className='floor'>2nd floor</div>
          <div className='floor'>3rd floor</div>

          <input type='date' className='date' />
        </div>

        <div className='timeline__area'>
          <table>
            <thead>
              <tr>
                <th>10:00</th>
                <th>11:00</th>
                <th>12:00</th>
                <th>13:00</th>
                <th>14:00</th>
                <th>15:00</th>
                <th>16:00</th>
                <th>17:00</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
                <td>9</td>
                <td>10</td>
                <td>11</td>
                <td>12</td>
                <td>13</td>
                <td>14</td>
                <td>15</td>
              </tr>
              <tr>
                <td>A1</td>
              </tr>
              <tr>
                <td>B1</td>
                <td></td>
                <td>
                  <div className='td__data td__active'>
                    <span className='td__name'>Alex</span>
                    <div className='td__info'>
                      <span className='material-icons-sharp td__icon'>
                        people_outline
                      </span>
                      <span className='td__no'>5</span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>B2</td>
              </tr>
              <tr>
                <td>C1</td>
              </tr>
              <tr>
                <td>C2</td>
              </tr>
              <tr>
                <td>D1</td>
              </tr>
              <tr>
                <td>D2</td>
              </tr>
              <tr>
                <td>E1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Timeline
