function NextArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={`${className} nextArrow`}
      onClick={onClick}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',

        background: 'white',
      }}
    >
      <span
        className='material-icons-sharp'
        style={{ fontSize: '1.5rem', fontWeight: '600' }}
      >
        keyboard_arrow_right
      </span>
    </div>
  )
}

export default NextArrow
