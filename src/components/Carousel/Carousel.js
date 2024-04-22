import React from 'react'
import Slider from 'react-slick'
import './carousel.css'
import NextArrow from './NextArrow'
import PrevArrow from './PrevArrow'

function Carousel({ products, slidesToScroll = 2, slidesToShow = 3 }) {
  // you have to pass iterated data as an {obj} for it to show up in the slider obj
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow,
    slidesToScroll,
    lazyLoad: true,
    // autoplay: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,

    responsive: [
      {
        breakpoint: 320,
        settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 1, infinite: false },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 2, infinite: false },
      },
      {
        breakpoint: 1280,
        settings: { slidesToShow: 4, slidesToScroll: 2, infinite: false },
      },
    ],
  }
  // style={{ margin: '30px' }}

  return (
    <div>
      <Slider {...settings}>{products}</Slider>
    </div>
  )
}

export default Carousel
