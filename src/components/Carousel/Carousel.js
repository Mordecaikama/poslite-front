import React from 'react'
import Slider from 'react-slick'
import './carousel.css'
import NextArrow from './NextArrow'
import PrevArrow from './PrevArrow'

function Carousel({
  products,
  slidesToScroll = 2,
  slidesToShow = 2,
  responsive = [],
}) {
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

    responsive: responsive,
  }
  // style={{ margin: '30px' }}

  return (
    <div>
      <Slider {...settings}>{products}</Slider>
    </div>
  )
}

export default Carousel
