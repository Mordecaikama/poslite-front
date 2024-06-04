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
  query,
  setQuery,
  appsettings,
  opslength,
  showmore,
}) {
  const [hovered, setHovered] = useState(false)
  const [cVoterRow, setCVoterRow] = useState(null)

  const [rangeslice, setRangeslice] = useState({
    start: 0,
    end: parseInt(appsettings?.usersPaginate), // work on pagination
  })

  const { start, end } = rangeslice

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

  const nextProduct = () => {
    // if clicked check if current length < opslength
    if (end < opslength()) {
      setQuery({ ...query, skip: start + 1 })
      setRangeslice({ start: start + 1, end: end + 1 })
    }
  }

  const prevProduct = () => {
    if (start > 0) {
      setRangeslice({ start: start - 1, end: end - 1 })
      setQuery({ ...query, skip: start - 1 })
    }
  }

  const productnextProducts = (value) => {
    if (value + 1 === end) {
      nextProduct()
    } else if (value === start) {
      prevProduct()
    }
    setQuery({ ...query, skip: value })
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

      <div
        className={` ${
          operators && operators.length < 1 && 'food__container no__item'
        }`}
      >
        {operators && operators.length > 0 ? (
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
                <th>Status</th>
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
                        {operator.acc_setup ? (
                          <span className='material-icons-sharp success'>
                            check_circle
                          </span>
                        ) : (
                          <span className='material-icons-sharp danger'>
                            cancel
                          </span>
                        )}
                      </td>
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
        ) : (
          <>
            <span className='material-icons-sharp no__bag'>
              manage_accounts
            </span>
            <p>No Operator in Your Organisation.</p>
            <p>Add new Operator.</p>
          </>
        )}
      </div>

      <div className='paginate__range'>
        {showmore() && (
          <button className='btn-outline vt_btn' onClick={prevProduct}>
            <span className='material-icons-sharp kl'>keyboard_arrow_left</span>
          </button>
        )}
        {/* slice(start, end). */}
        {[...Array(opslength()).keys()].slice(start, end).map((it, ind) => {
          const numba = it + 1
          return (
            <button
              className={`btn-outline vt_btn ${
                query.skip + 1 === it + 1 && 'active'
              }`}
              key={it}
              onClick={() => productnextProducts(it)}
            >
              {it + 1}
            </button>
          )
        })}

        {showmore() && (
          <button className='btn-outline vt_btn' onClick={nextProduct}>
            <span className='material-icons-sharp kr'>
              keyboard_arrow_right
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Operatortable

/* {rad.length < 2 && hovered && cVoterRow._id === voter._id && ( */
