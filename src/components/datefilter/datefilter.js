import DatePicker from 'react-multi-date-picker'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'

function DateFilter({ items, handleDateClick, currentdate, dt, setdt }) {
  // const [dt, setdt] = useState(new Date())
  return (
    <div className='date__container'>
      <div className='date__header'>
        <span className='material-icons-sharp'>event</span>
        <DatePicker
          inputClass='custom-input'
          value={dt}
          range={true}
          onChange={setdt}
          // onMonthChange={setdt}
          // format='DD MMM YYYY HH:mm:ss'
          dateSeparator=' - '
          onlyMonthPicker={currentdate === 'months' ? true : false}
          onlyYearPicker={currentdate === 'year' ? true : false}
          plugins={[
            <TimePicker position='bottom' hStep={2} mStep={3} sStep={4} />,
          ]}
        />
        <span className='material-icons-sharp'>keyboard_arrow_down</span>
      </div>

      <div className='date__dropdown'>
        <div className='date__top'>
          <div className='login-password'>
            <input type='text' placeholder='30' value='select' disabled />
          </div>
          <div className='button days'>
            <span>{currentdate}</span>
            <span className='material-icons-sharp'>keyboard_arrow_down</span>
            <div className='item__dropdown'>
              {items?.map((item, ind) => {
                return (
                  <div
                    className='item'
                    key={ind}
                    onClick={() => handleDateClick(item)}
                  >
                    {item === currentdate ? (
                      <span className='material-icons-sharp done'>
                        done_outline
                      </span>
                    ) : (
                      <input type='radio' />
                    )}
                    <span>{item}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DateFilter
