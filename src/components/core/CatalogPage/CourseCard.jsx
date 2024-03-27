import React from 'react'
import RatingStars from '../../common/RatingStars'
import { Link } from 'react-router-dom'

const CourseCard = ({item, height}) => {
    function GetAvgRating(ratingArr) {
        if (ratingArr?.length === 0) return 0
        const totalReviewCount = ratingArr?.reduce((acc, curr) => {
          acc += curr.rating
          return acc
        }, 0)
      
        const multiplier = Math.pow(10, 1)
        const avgReviewCount =
          Math.round((totalReviewCount / ratingArr?.length) * multiplier) / multiplier
      
        return avgReviewCount
      }

      let reviewCount=GetAvgRating(item?.ratingAndReviews)
  return (
    <Link to={`/courses/${item._id}`}>
      <div className=''>
        <img src={item.thumbnail} alt="" className='w-full object-cover rounded-lg' style={{height : `${height}px`}} />
        <h2 className='mt-[20px] mb-[9px] text-richblack-5 text-[16px] font-medium'>{item.courseName}</h2>
        <RatingStars Star_Size={22} Review_Count={reviewCount}/>
        <p className='text-richblack-5 text-[20px] font-semibold mt-[9px]'>Rs. {item.price}</p>
    </div>
    </Link>
  )
}

export default CourseCard