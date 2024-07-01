import React, { useState } from 'react'
import { S3PATH } from '../../../config'

function Categorytable({
  categories,
  handleCatClick,
  handleCatdel,
  hide,
  setHide,
  rad,
  setRad,
  query,
  setQuery,
  pages, //same as cat length
  showmore,
  appsettings,
}) {
  const [hovered, setHovered] = useState(false)
  const [cVoterRow, setCVoterRow] = useState(null)

  const [rangeslice, setRangeslice] = useState({
    start: 0,
    end: parseInt(appsettings?.catPaginate), // work on pagination
  })

  const { start, end } = rangeslice

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

  const nextProduct = () => {
    // if clicked check if current length < productslength
    if (end < pages()) {
      setQuery({ ...query, skip: start + 1 })
      setRangeslice({ start: start + 1, end: end + 1 })
    } else {
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
      <div
        className={` ${
          categories && categories.length < 1 && 'food__container no__item'
        }`}
      >
        {categories && categories.length > 0 ? (
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
                          src={`${S3PATH}/${category?.img}`}
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
        ) : (
          <>
            <span className='material-icons-sharp no__bag'>category</span>
            <p>No Categories in Your Organisation.</p>
            <p>Add new Category.</p>
          </>
        )}
      </div>
      <div className='paginate__range'>
        {showmore() && (
          <button className='btn-outline vt_btn' onClick={prevProduct}>
            <span className='material-icons-sharp kl'>keyboard_arrow_left</span>
          </button>
        )}
        {[...Array(pages()).keys()].slice(start, end).map((it, ind) => {
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
      {/* {JSON.stringify(pages)} */}
    </div>
  )
}

export default Categorytable
