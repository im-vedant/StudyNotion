import React from 'react'
import {Swiper ,SwiperSlide} from 'swiper/react'
import CourseCard from './CourseCard'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

// import required modules
import { Pagination ,FreeMode} from 'swiper/modules';
const CourseSlider = ({data}) => {
  return (
    <div>
         <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        loop={true}
      
        modules={[Pagination,FreeMode]}  >
                {
                    data.map((item)=>{
                        return <SwiperSlide> <CourseCard item={item} height={250}/></SwiperSlide>
                    })
                }
              
            </Swiper>
    </div>
  )
}

export default CourseSlider