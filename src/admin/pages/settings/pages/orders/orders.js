function Orders({ appsettings, handleChange, save }) {
  return (
    <div className='setting_orders settings'>
      <div className='body'>
        <article>
          <div className='info'>
            <h3>Number of Orders Per Page </h3>
          </div>
          <div class='settings__number'>
            <input
              type='number'
              min={1}
              // pattern='[0-9]*'
              value={appsettings?.ordersPerpage}
              onChange={handleChange('ordersPerpage')}
            />
          </div>
        </article>
        <article>
          <div className='info'>
            <h3>Pagination </h3>
          </div>
          <div class='settings__number'>
            <input
              type='number'
              min={1}
              // pattern='[0-9]*'
              value={appsettings?.ordersPaginate}
              onChange={handleChange('ordersPaginate')}
            />
          </div>
        </article>
        <button className='btn-reset' onClick={save}>
          Save
        </button>
      </div>
    </div>
  )
}

export default Orders
