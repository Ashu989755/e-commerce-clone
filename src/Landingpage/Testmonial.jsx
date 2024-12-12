import React from 'react'
import Slider from 'react-slick'
import { ppl_icn, ppl_icn2, ppl_icn3, revw } from '../assets/image'

function Testmonial() {
    const settings = {
        dots: true,
        arrow: true,
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "20px",
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        responsive: [
          {

            breakpoint: 1024,
            settings: {
              arrows: false,
              slidesToShow: 3,
            },
          },
            {

              breakpoint: 768,
              settings: {
                arrows: false,
                slidesToShow: 2,
              },
            },

            {
              breakpoint: 480,
              settings: {
                arrows: false,
                slidesToShow: 1,
              },
            },
          ],
}
  return (
    <>
     <div className="slider-container">
      <Slider {...settings}>
      <div className='item p-8 rounded-lg m-4'>
            <div className="ppl_icn flex justify-center mb-3">
                <span><img src={ppl_icn} alt="" /></span>
            </div>
            <div className="text_desc">
                <h3 className='text-xl font-bold text-center'>Franz Bechnbauer</h3>
                <p className='text-dark_gray text-center'>Some people dream of success, while other
                     people get up every morning and make it happen.</p>
                <span className='flex justify-center my-3'><img src={revw} alt="" /></span>
            </div>
        </div>
        <div className='item p-8 rounded-lg m-4'>
            <div className="ppl_icn flex justify-center mb-3">
                <span><img src={ppl_icn2} alt="" /></span>
            </div>
            <div className="text_desc">
                <h3 className='text-xl font-bold text-center'>Franz Bechnbauer</h3>
                <p className='text-dark_gray text-center'>Some people dream of success, while other people get up 
                    every morning and make it happen.</p>
                <span className='flex justify-center my-3'><img src={revw} alt="" /></span>
            </div>
        </div>
        <div className='item p-8 rounded-lg m-4'>
            <div className="ppl_icn flex justify-center mb-3">
                <span><img src={ppl_icn3} alt="" /></span>
            </div>
            <div className="text_desc">
                <h3 className='text-xl font-bold text-center'>Franz Bechnbauer</h3>
                <p className='text-dark_gray text-center'>Some people dream of success, while other people get up every
                     morning and make it happen.</p>
                <span className='flex justify-center my-3'><img src={revw} alt="" /></span>
            </div>
        </div>
        <div className='item p-8 rounded-lg m-4'>
            <div className="ppl_icn flex justify-center mb-3">
                <span><img src={ppl_icn} alt="" /></span>
            </div>
            <div className="text_desc">
                <h3 className='text-xl font-bold text-center'>Franz Bechnbauer</h3>
                <p className='text-dark_gray text-center'>Some people dream of success, while other people get up 
                    every morning and make it happen.</p>
                <span className='flex justify-center my-3'><img src={revw} alt="" /></span>
            </div>
        </div>
      </Slider>
    </div> 
    </>
  )
}

export default Testmonial
