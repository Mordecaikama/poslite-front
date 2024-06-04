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
            <img src={require('../../assets/images/cosydash.png')} alt='' />
          </div>
        </main>
      </section>

      <section className='feature__1'>
        <div className='top'>
          <h1>Take Your Restaurant to the Next level with KamaPOS</h1>
          <p>
            Effortlessly manage your restaurant or shop inventory, sales and
            customer relationships with kamaPOS user-friendly platform
          </p>
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
            <h4>Filter by Product Category</h4>
            <p>
              Refine your search by selecting from a range of product categories
              to find exactly what your need.
            </p>
          </div>
          <div className='card'>
            <span class='material-icons-sharp'>approval</span>
            <h4>Intuitive Display</h4>
            <p>
              Intuitive displays for point of sales systems allow for easier and
              more efficient use in managing sales transactions
            </p>
          </div>
        </div>
      </section>

      <section className='latest__blog'>
        <div className='top'>
          <h1>Latest blog posts</h1>
          <button>view all posts</button>
        </div>

        <div className='featured__blog'>
          <div className='blog__card'>
            <img
              className='blog__img'
              src={require('../../assets/images/sales.jpg')}
              alt=''
            />
            <span className='title'>Restaurant</span>
            <h2>KAMAPos use in Restuarants</h2>
            <p>
              One of the bistros specializing in modern Japanese cuisine, Cafe
              kissa, offers a variety of Japenese ....
            </p>

            <div className='bottom'>
              <div className='img'>
                <img src={require('../../assets/images/sales.jpg')} alt='' />
              </div>
              <div className='info'>
                <h4>Jane Cooper</h4>
                <span>McDonalds</span>
              </div>
            </div>
          </div>
          <div className='blog__card'>
            <img
              className='blog__img'
              src={require('../../assets/images/sales2.jpg')}
              alt=''
            />
            <span className='title'>Clothing Store</span>
            <h2>Modern clothing Store</h2>
            <p>
              A vogue mom lists her avorite places to shop for childrens wear.
              shop her picks for the best kids...
            </p>

            <div className='bottom'>
              <div className='img'>
                <img src={require('../../assets/images/profile1.jpg')} alt='' />
              </div>
              <div className='info'>
                <h4>Tom Boldy</h4>
                <span>East Coasts</span>
              </div>
            </div>
          </div>
          <div className='blog__card'>
            <img
              className='blog__img'
              src={require('../../assets/images/sales1.jpg')}
              alt=''
            />
            <span className='title'>Restaurant</span>
            <h2>Odario's use in Restuarants</h2>
            <p>
              Shoe retailer payless recently had a bit of fun at the expense of
              some fashion infulencers in Santa ...
            </p>

            <div className='bottom'>
              <div className='img'>
                <img src={require('../../assets/images/profile.jpg')} alt='' />
              </div>
              <div className='info'>
                <h4>James Ander</h4>
                <span>Jean Pageat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='pricing'>
        <div className='top'>
          <h1>You are not mistaken</h1>
          <p>
            All our plans come with unlimited support hosting and maintenance.
            No extra costs, no limitations on features or data: enjoy real
            transparency!
          </p>
        </div>

        <div className='container pricing__cards grid__container'>
          <div className='card'>
            <div className='card__top'>
              <div className='info'>
                <span>One Free App</span>
                <span className='label'>popular</span>
              </div>

              <div className='price'>
                <span>$10</span> per month
              </div>

              <p>One app only unlimited users</p>
              <button className='active'>Get started</button>
              <button>Free trials</button>
            </div>

            <div className='features'>
              <h4>FEATURES</h4>
              <div className='item'>
                <span className='material-icons-sharp'>
                  check_circle_outline
                </span>
                <span>Access to basic features</span>
              </div>
              <div className='item'>
                <span className='material-icons-sharp'>
                  check_circle_outline
                </span>
                <span>Basic reporting and Analytics</span>
              </div>
              <div className='item'>
                <span className='material-icons-sharp'>
                  check_circle_outline
                </span>
                <span>Up to 10 individual users</span>
              </div>
              <div className='item'>
                <span className='material-icons-sharp'>
                  check_circle_outline
                </span>
                <span>Basic chat and email support</span>
              </div>
            </div>
          </div>
          <div className='card'>
            <div className='card__top'>
              <div className='info'>
                <span>Standard</span>
                <span className='label'>popular</span>
              </div>

              <div className='price'>
                <span>$20</span> per month
              </div>

              <p>One app only unlimited users</p>
              <button className='active'>Get started</button>
              <button>Free trials</button>
            </div>

            <div className='features'>
              <h4>FEATURES</h4>
              <div className='item'>
                <span className='material-icons-sharp'>
                  check_circle_outline
                </span>
                <span>Access to basic features</span>
              </div>
              <div className='item'>
                <span className='material-icons-sharp'>
                  check_circle_outline
                </span>
                <span>Basic reporting and Analytics</span>
              </div>
              <div className='item'>
                <span className='material-icons-sharp'>
                  check_circle_outline
                </span>
                <span>Up to 10 individual users</span>
              </div>
              <div className='item'>
                <span className='material-icons-sharp'>
                  check_circle_outline
                </span>
                <span>Basic chat and email support</span>
              </div>
            </div>
          </div>
          <div className='card'>
            <div className='card__top'>
              <div className='info'>
                <span>Custom</span>
                <span className='label'>popular</span>
              </div>

              <div className='price'>
                <span>$40</span> per month
              </div>

              <p>One app only unlimited users</p>
              <button className='active'>Get started</button>
              <button>Free trials</button>
            </div>

            <div className='features'>
              <h4>FEATURES</h4>
              <div className='item'>
                <span className='material-icons-sharp'>
                  check_circle_outline
                </span>
                <span>Access to basic features</span>
              </div>
              <div className='item'>
                <span className='material-icons-sharp'>
                  check_circle_outline
                </span>
                <span>Basic reporting and Analytics</span>
              </div>
              <div className='item'>
                <span className='material-icons-sharp'>
                  check_circle_outline
                </span>
                <span>Up to 10 individual users</span>
              </div>
              <div className='item'>
                <span className='material-icons-sharp'>
                  check_circle_outline
                </span>
                <span>Basic chat and email support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='testimony'>
        <div className='left'>
          <div className='ratings'>
            {[...Array(5)].map((item, ind) => {
              return <span className='material-icons-sharp'>star</span>
            })}
          </div>

          <h1>
            "Working with KAMAPos allowed us to digitize all our internal
            processes. We were able to become more efficient and achieve full
            traceability on our Product Lifecycle."
          </h1>
          <div className='info'>
            <h4>Joshua Linniker</h4>
            <span>254 BroomLane, Levensulme Manchester.</span>
          </div>
        </div>

        <div className='right'>
          <img src={require('../../assets/images/profile2.jpg')} alt='' />
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
