import React, { useState } from 'react'

function Billing() {
  const [pricing, setPricing] = useState({
    '1 to 20': 'free',
    '21 to 100': 19,
    '101 to 300': 36,
    '301 to 500': 49,
    '501 to 750': 75,
    '751 to 1000': 90,
    '0.09/Voter': '0.09/Voter',
  })

  const ks = pricing && Object.keys(pricing)
  // console.log(ks)

  // useEffect(() => {
  //   console.log('fetch data from db')
  // }, [])

  return (
    <div className='container billing_container '>
      <div className='title'>
        <i className='fal fa-money-check'></i>
        <h2>Billing </h2>
      </div>

      <div className='body'>
        <h2>Your Plan: Pay Per Election</h2>
        <p>
          With the <b> Pay-Per-Election</b> plan you pay for
          <b>each election</b>
          based on the total number of eligible voters assigned to the election.
          The first 20 <b>eligible voters</b> in an election are free. Elections
          with more than 20 eligible voters will require payment during the
          election launch process.
        </p>

        <table>
          <tbody>
            <tr>
              <td>Voters</td>
              <td>Price</td>
            </tr>
            {ks &&
              ks.map((val, ind) => {
                // console.log(pricing[val])

                return (
                  <tr key={ind}>
                    <td>{val} </td>
                    <td>
                      {typeof ks && pricing[val] === 'free' ? '' : '$'}
                      {ks && pricing[val]}
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
        {/* <div className='table-class'> 
          </div> */}
      </div>
    </div>
  )
}

export default Billing
