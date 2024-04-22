import React, { useState } from 'react'
import { FILE } from '../../../config'

function Operatortable({
  operators,
  handleOpClick,
  handleOpdel,
  hide,
  setHide,
  rad,
  setRad,
}) {
  const [hovered, setHovered] = useState(false)
  const [cVoterRow, setCVoterRow] = useState(null)

  const AddRemoveOpertor = (cate) => (e) => {
    e.stopPropagation()
    // if item in array select else remove from array
    const res = rad.some((item) => item._id === cate._id)
    if (res) {
      const r = rad.filter((item) => item._id !== cate._id)
      setRad(r)
    } else {
      setRad([...rad, cate])
    }
    // console.log(rad)
  }

  const handleMouseEnterState = (cate) => {
    // this handles current voter row when mouse hovers over the row
    setHovered(true)
    setCVoterRow(cate)
    // console.log(hovered, product._id)
  }
  const handleMouseLeaveState = (cate) => {
    // this handles current voter row when mouse hovers over the row
    setHovered(false)
    setCVoterRow(null)
  }

  return (
    <div className='container operatortable__container'>
      <div className='title'>
        <div className='left'>
          <span className='material-icons-sharp'>group_add</span>
          <h3>Operators</h3>
        </div>
        <div className='options'>
          <div className='btn-group'>
            <button
              className='btn-reset'
              onClick={() => setHide({ ...hide, add: !hide.add })}
            >
              <span className='material-icons-sharp'>add</span>
              Add Operator
            </button>

            {rad.length > 1 && (
              <button
                className='btn-group btn-outline trash'
                onClick={() => setHide({ ...hide, bulkalert: !hide.bulkalert })}
              >
                <i className='fas fa-trash' title='Delete selected voters'></i>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
      <table className='voters__table'>
        <thead>
          <tr>
            <th>
              <input
                type='checkbox'
                checked={rad.length === operators.length}
                onClick={() =>
                  operators && rad.length === operators.length
                    ? setRad([])
                    : setRad(operators)
                }
                onChange={() => {}}
              />
            </th>
            <th>image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {operators &&
            operators.map((operator, ind) => {
              return (
                <tr
                  key={operator?._id}
                  onMouseEnter={() => handleMouseEnterState(operator)}
                  onMouseLeave={() => handleMouseLeaveState(operator)}
                >
                  <td>
                    <input
                      type='checkbox'
                      checked={rad.some((el) => el._id === operator._id)}
                      value='voted'
                      onChange={AddRemoveOpertor(operator)}
                      data-for='tip'
                      data-tip={`select to add election to frontend`}
                    />
                  </td>
                  <td className='table-img'>
                    <img
                      src={`${FILE}/images/${operator?.img}`}
                      alt={operator?.name}
                    />
                  </td>
                  <td>{operator.name}</td>
                  <td>{operator.email}</td>
                  <td>
                    <div
                      className={`btn-group ${
                        rad.length < 2 &&
                        hovered &&
                        cVoterRow._id === operator._id &&
                        'btn__show'
                      }`}
                    >
                      <i
                        className='fas fa-trash'
                        onClick={() => handleOpdel(operator)}
                      ></i>

                      <i
                        className='fal fa-pen-square'
                        onClick={() => handleOpClick(operator)}
                      ></i>
                    </div>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
      {/* {JSON.stringify(rad)} */}
    </div>
  )
}

export default Operatortable

/* {rad.length < 2 && hovered && cVoterRow._id === voter._id && ( */
