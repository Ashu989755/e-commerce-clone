import React from 'react'
import { screen, screen1, screen2, screen3, screen4 } from '../assets/image';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Screenshot_slider() {
    var settings = {
        dots: true,
        autoplay: true,
        speed: 2500,
        autoplaySpeed: 1500,
        slidesToShow: 5,
        pauseOnHover: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              slidesToShow: 3,
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
      };
  return (
    <>
     <Slider {...settings}>
      
      <div className='px-5 itm flex justify-center'>
        <img src={screen} alt="" />
      </div>

      <div className='px-5 itm flex justify-center'>
      <img src={screen1} alt="" />
      </div>

      <div className='px-5 itm flex justify-center'>
      <img src={screen2} alt="" />
      </div>

      <div className='px-5 itm flex justify-center'>
      <img src={screen3} alt="" />
      </div>

      <div className='px-5 itm flex justify-center'>
      <img src={screen4} alt="" />
      </div>
    </Slider>
    </>
  )
}

export default Screenshot_slider
