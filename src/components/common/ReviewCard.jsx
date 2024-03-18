import React from 'react'
import RatingStars from './RatingStars'

const ReviewCard = ({review}) => {
    const truncateWords=50
  return (
    <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
        <div className='flex items-center gap-4'>
            <img src={ review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}  className="h-9 w-9 rounded-full object-cover" alt="" />
            <div className='flex flex-col'>
                <h2 className='font-semibold text-richblack-5'>{review?.user?.firstName} {review?.user?.lastName}</h2>
                <p className='text-[12px] font-medium text-richblack-500'>{review?.course?.courseName}</p>
            </div>
        </div>
        <div className='font-medium text-richblack-25'>
        {review?.review.split(" ").length > truncateWords
                      ? `${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.review}`}
        </div>
        <div className="flex items-center  gap-x-2">
           <p className="font-semibold text-[18px] text-yellow-100"> {review.rating} </p>
           <RatingStars Review_Count={review.rating} Star_Size={20}/>
        </div>
    </div>
  )
}

export default ReviewCard