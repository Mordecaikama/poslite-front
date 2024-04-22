import React, { useState } from 'react'
import { FILE } from '../../../config'

function Categorytable({
  categories,
  handleCatClick,
  handleCatdel,
  hide,
  setHide,
  rad,
  setRad,
}) {
  const [hovered, setHovered] = useState(false)
  const [cVoterRow, setCVoterRow] = useState(null)

  function handleClick() {
    console.log('nothing')
  }

  const AddRemoveCategory = (cate) => (e) => {
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
    <div className='container categorytable__container'>
      <div className='title'>
        <div className='left'>
          <span className='material-icons-sharp'>group_add</span>
          <h3>Categories</h3>
        </div>
        <div className='options'>
          <div className='btn-group'>
            <button
              className='btn-reset'
              onClick={() => setHide({ ...hide, add: !hide.add })}
            >
              <span className='material-icons-sharp'>add</span>
              Add Category
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
                checked={rad.length === categories.length}
                onClick={() =>
                  categories && rad.length === categories.length
                    ? setRad([])
                    : setRad(categories)
                }
                onChange={() => {}}
              />
            </th>
            <th>image</th>
            <th>Name</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((category, ind) => {
              return (
                <tr
                  onMouseEnter={() => handleMouseEnterState(category)}
                  onMouseLeave={() => handleMouseLeaveState(category)}
                >
                  <td>
                    <input
                      type='checkbox'
                      checked={rad.some((el) => el._id === category._id)}
                      value='voted'
                      onChange={AddRemoveCategory(category)}
                      data-for='tip'
                      data-tip={`select to add election to frontend`}
                    />
                  </td>
                  <td className='table-img'>
                    <img
                      src={`${FILE}/images/${category?.img}`}
                      alt={category?.name}
                    />
                  </td>
                  <td>{category.name}</td>
                  <td>
                    {/* {rad.length < 2 && hovered && cVoterRow._id === voter._id && ( */}

                    <div
                      className={`btn-group ${
                        rad.length < 2 &&
                        hovered &&
                        cVoterRow._id === category._id &&
                        'btn__show'
                      }`}
                    >
                      <i
                        className='fas fa-trash'
                        onClick={() => handleCatdel(category)}
                      ></i>

                      <i
                        className='fal fa-pen-square'
                        onClick={() => handleCatClick(category)}
                      ></i>
                    </div>
                    {/* )} */}
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

export default Categorytable
