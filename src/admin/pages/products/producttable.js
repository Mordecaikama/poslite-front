import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FILE } from '../../../config'

function ProductTable({
  products,
  hide,
  setHide,
  rad,
  setRad,
  setOneproduct,
  categories,
}) {
  const [hovered, setHovered] = useState(false)
  const [cVoterRow, setCVoterRow] = useState(null)
  function handleClick() {
    console.log('nothing')
  }

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
                      src={`${FILE}/images/${product?.img[0]}`}
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
                        <i className='fal fa-pen-square' onClick={() => {}}></i>
                      </Link>
                    </div>
                    {/* )} */}
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
      {/* {JSON.stringify(categories)} */}
    </div>
  )
}

export default ProductTable
