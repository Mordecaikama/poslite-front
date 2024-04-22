import React from 'react'

function Card({ product, items, icon, handleCategory }) {
  return (
    <div className='category__card' onClick={() => handleCategory(product)}>
      <div className='icon'>
        {icon ? icon : <span className='material-icons-sharp'>restaurant</span>}
      </div>

      <h4>{product?.name}</h4>

      <span className='items'>{items && items} items</span>
    </div>
  )
}

export default Card
