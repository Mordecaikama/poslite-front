import { ArrowBackIos } from '@mui/icons-material'

function PrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={`${className} Prevarrow`}
      onClick={onClick}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
      }}
    >
      <span
        class='material-icons-sharp'
        style={{ color: 'black', fontSize: '1.5rem', textAlign: 'center' }}
      >
        keyboard_arrow_left
      </span>
    </div>
  )
}

export default PrevArrow
