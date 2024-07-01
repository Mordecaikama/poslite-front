import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Card from '../cards/catcard'

export default function Emblamenu({ slides, options, handleCategory }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className='embla '>
      {slides?.length > 0 && (
        <button
          onClick={scrollPrev}
          className='embla__button embla__button--prev'
        >
          <svg className='embla__button__svg' viewBox='0 0 532 532'>
            <path
              fill='currentColor'
              d='M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z'
            />
          </svg>
        </button>
      )}

      <div className='embla__viewport' ref={emblaRef}>
        <div className='embla__container'>
          {slides.map((product, ind) => {
            return (
              <div className='embla__slide' key={product?._id}>
                <Card
                  product={product}
                  icon={product?.img}
                  items='13'
                  handleCategory={handleCategory}
                />
              </div>
            )
          })}
        </div>
      </div>

      {slides?.length > 0 && (
        <button
          onClick={scrollNext}
          className='embla__button embla__button--next'
        >
          <svg className='embla__button__svg' viewBox='0 0 532 532'>
            <path
              fill='currentColor'
              d='M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z'
            />
          </svg>
        </button>
      )}
    </div>
  )
}
