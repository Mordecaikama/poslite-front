import React, { useContext } from 'react'
import { S3PATH } from '../../config'
import { Context } from '../../context'

function Card({ product, items, icon, handleCategory }) {
  const { appsettings } = useContext(Context)
  return (
    <div className='category__card' onClick={() => handleCategory(product)}>
      <div className='icon'>
        {icon && appsettings?.catImage ? (
          <img src={`${S3PATH}/${icon}`} alt={icon} />
        ) : (
          <span className='material-icons-sharp'>restaurant</span>
        )}
      </div>

      <h4>{product?.name}</h4>

      <span className='items'>{items && items} items</span>
    </div>
  )
}

export default Card
