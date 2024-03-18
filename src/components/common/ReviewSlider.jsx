import React from 'react'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import {Swiper ,SwiperSlide} from 'swiper/react'
import { Pagination ,FreeMode} from 'swiper/modules';
import ReviewCard from './ReviewCard';
const ReviewSlider = ({data}) => {
  return (
    <Swiper
    slidesPerView={4}
    spaceBetween={30}
    freeMode={true}
    loop={true}
  
    modules={[Pagination,FreeMode]}  >
            {
                data.slice(0,10).map((item,index)=>{
                    return <SwiperSlide key={index}><ReviewCard review={item}/></SwiperSlide>
                })
            }
          
        </Swiper>
  )
}

export default ReviewSlider