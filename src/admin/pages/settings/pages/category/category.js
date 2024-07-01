function Category({ appsettings, handleChange, save }) {
  return (
    <div className='setting_users  settings'>
      <div className='body'>
        <article>
          <div className='info'>
            <h3>Number of Categories Per Page </h3>
          </div>
          <div class='settings__number'>
            <input
              type='number'
              min={1}
              // pattern='[0-9]*'
              value={appsettings?.catPerpage}
              onChange={handleChange('catPerpage')}
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
              value={appsettings?.catPaginate}
              onChange={handleChange('catPaginate')}
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

export default Category
