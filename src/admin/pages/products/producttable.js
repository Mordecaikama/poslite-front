import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { S3PATH } from '../../../config'

function ProductTable({
  products,
  hide,
  setHide,
  rad,
  setRad,
  setOneproduct,
  categories,
  query,
  setQuery,
  productslength,
  showmore,
  appsettings,
  defaultPagination,
}) {
  const [hovered, setHovered] = useState(false)
  const [cVoterRow, setCVoterRow] = useState(null)

  const [rangeslice, setRangeslice] = useState({
    start: 0,
    end: parseInt(appsettings?.productPaginate), // work on pagination
  })

  const { start, end } = rangeslice

  const AddRemoveProduct = (product) => (e) => {
    e.stopPropagation()
    // if item in array select else remove from array
    const res = rad.some((item) => item._id === product._id)
    if (res) {
      const r = rad.filter((item) => item._id !== product._id)
      setRad(r)
    } else {
      setRad([...rad, product])
    }
    // console.log(rad)
  }

  const handleproductMouseEnterState = (product) => {
    // this handles current voter row when mouse hovers over the row
    setHovered(true)
    setCVoterRow(product)
    // console.log(hovered, product._id)
  }
  const handleproductMouseLeaveState = (product) => {
    // this handles current voter row when mouse hovers over the row
    setHovered(false)
    setCVoterRow(null)
  }

  const nextProduct = () => {
    // if clicked check if current length < productslength
    if (end < productslength()) {
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
    <div className='container  producttable__container'>
      <div className='title'>
        <div className='left'>
          <span className='material-icons-sharp'>group_add</span>
          <h3>Products</h3>
        </div>
        <div className='options'>
          <div className='btn-group'>
            <Link className='btn-reset' to='/companyname/products/addnew'>
              Add Product
            </Link>

            {rad.length > 1 && (
              <button
                className='btn-group btn-outline trash'
                onClick={() => setHide({ ...hide, manydel: !hide.manydel })}
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
          products && products.length < 1 && 'food__container no__item'
        }`}
      >
        {products && products.length > 0 ? (
          <table className='voters__table'>
            <thead>
              <tr>
                <th>
                  <input
                    type='checkbox'
                    checked={rad.length === products.length}
                    onClick={() =>
                      products && rad.length === products.length
                        ? setRad([])
                        : setRad(products)
                    }
                    onChange={() => {}}
                  />
                </th>
                <th>image</th>
                <th>Name</th>
                <th>price</th>
                <th>category</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products?.map((product, ind) => {
                  return (
                    <tr
                      key={product?._id}
                      onMouseEnter={() => handleproductMouseEnterState(product)}
                      onMouseLeave={() => handleproductMouseLeaveState(product)}
                    >
                      <td>
                        <input
                          type='checkbox'
                          checked={rad.some((el) => el._id === product._id)}
                          value='voted'
                          onChange={AddRemoveProduct(product)}
                          data-for='tip'
                          data-tip={`select to add election to frontend`}
                        />
                      </td>

                      <td className='table-img'>
                        <img
                          src={`${S3PATH}/${product?.img[0]}`}
                          alt={product?.name}
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>
                        {categories
                          ?.filter((cat) => cat?._id === product.category)
                          .map((item, ind) => item.name)}
                      </td>
                      <td>{product.description}</td>
                      <td>
                        {/* {rad.length < 2 && hovered && cVoterRow._id === voter._id && ( */}

                        <div
                          className={`btn-group ${
                            rad.length < 2 &&
                            hovered &&
                            cVoterRow._id === product._id &&
                            'btn__show'
                          }`}
                        >
                          <i
                            className='fas fa-trash'
                            onClick={() => setOneproduct(product)}
                          ></i>

                          <Link
                            to='/companyname/products/addnew'
                            state={{ data: product }}
                          >
                            <i
                              className='fal fa-pen-square'
                              onClick={() => {}}
                            ></i>
                          </Link>
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
            <span className='material-icons-sharp no__bag'>fastfood</span>
            <p>No Products in Your Organisation.</p>
            <p>Add new Product.</p>
          </>
        )}
      </div>
      <div className='paginate__range'>
        {showmore() && (
          <button className='btn-outline vt_btn' onClick={prevProduct}>
            <span className='material-icons-sharp kl'>keyboard_arrow_left</span>
          </button>
        )}

        {[...Array(productslength()).keys()]
          .slice(start, end)
          .map((it, ind) => {
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

export default ProductTable
