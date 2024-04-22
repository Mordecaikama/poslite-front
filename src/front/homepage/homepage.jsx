import React from 'react'
import Header from './header'

export default function Homepage() {
  return (
    <div className='container'>
      <section className='jumbotron'>
        <Header />

        <main>
          <div className='left'>
            <h4>Simplify your operations, amplify your profits</h4>
            <h1>Efortlessly manage your POS with our reliable POS system</h1>
            <span>
              Streamline sales, track inventory and grow your business with ease
              - all in one place
            </span>

            <button className='moreBtn'>Get Started</button>
          </div>

          <div className='right'>
            <img src={require('../../assets/images/books.jpg')} alt='' />
          </div>
        </main>
      </section>

      <section className='feature__1'>
        <div className='top'>
          <p>Take Your Restaurant to the Next level with KamaPOS</p>
          <span>
            Effortlessly manage your restaurant or shop inventory, sales and
            customer relationships with kamaPOS user-friendly platform
          </span>
        </div>
        <div className='bottom'>
          <div className='card'>
            <span class='material-icons-sharp'>approval</span>
            <h4>Efficient inventory management</h4>
            <p>
              KamaPOS simplifies books inventory management with features such
              as stock tracking, automatic reordering, and low stock
              notifications.
            </p>
          </div>
          <div className='card'>
            <span class='material-icons-sharp'>approval</span>
            <h4>Increased Sales</h4>
            <p>
              KamaPOS sales tracking features provide users with valuable
              insights into product performance, slaes trends and customer
              behaviour.
            </p>
          </div>
          <div className='card'>
            <span class='material-icons-sharp'>approval</span>
            <h4>Efficient Customer management</h4>
            <p>
              KamaPOS simplifies customer mangement with easy access to customer
              data, purchase history and other relevant information.
            </p>
          </div>
        </div>
      </section>

      <section className='feature__2'>
        <p>Streamline Your Restaurant Operation with KamaPOS</p>
        <span>
          Simplify Restaurant Operations and Free Up Time with KamaPOS system
        </span>
      </section>

      <section className='feature__3'>
        <div className='left'>
          <h2>Stock Management</h2>
          <p>
            Eliminate Restaurant Stock Outs and Overstocking with KamaPOS
            Avanced Stock Management Tools
          </p>
          <span>Learn more </span>
          <span className='materials-icons-sharp'>arrow</span>
        </div>
        <div className='left'>
          <h2>Analytics Orders</h2>
          <p>
            Track Restaurant Performance with kamaPOS Advanced Sales Reporting
            and Analysys Features.
          </p>
          <span>Learn more </span>
          <span className='materials-icons-sharp'>arrow</span>
        </div>
      </section>
    </div>
  )
}
