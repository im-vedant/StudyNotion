import React, { useState } from 'react'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import useOnOutsideClick from '../../../hooks/useOnOutsideClick'
import { useSelector } from 'react-redux'
import { FaStar } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5'
import { createReview } from '../../../services/operations/courseAPI'
const ReviewModal = ({isOpen,setIsOpen,courseId}) => {
    const {user}=useSelector((store)=>store.profile)
    const {token}=useSelector((store)=>store.auth)
    let ref=useRef(null)
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,
        formState: { errors, isSubmitSuccessful },
      } = useForm();
      const [rating, setRating] = useState(0);
      const handleClick = (star) => {
        setRating(star);
      };
      const [loading,setLoading]=useState(false)
      function clearData(){
        reset({
            review : ""
        })
        setRating(0)
        if(!loading)
        {
            setIsOpen(false)
        }
      }
      useOnOutsideClick(ref,clearData)
    if (!isOpen) 
    return null;

    async function onSubmit()
    {
        let currentValues=getValues()
        setLoading(true)
       await createReview({
        rating : rating ,
        review : currentValues.review,
        courseId : courseId
       },token)
        console.log("review submitted")
        setLoading(false)
        clearData()
    }
    return (
        <div  className="fixed top-0 left-0 right-0 -bottom-10 h-[100%] z-50 flex  items-center justify-center backdrop-filter backdrop-blur-sm">
        <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
       <div ref={ref}  className='w-[40%] h-fit z-20 max-h-[95%] '>
       <div className='py-4 rounded-t-lg px-6 flex flex-row justify-between items-center bg-richblack-700 text-richblack-5 text-[18px] font-semibold border-b border-richblack-600' >
      <p> Add Review</p>
        <button onClick={clearData} className='cursor-pointer'>
            <IoClose size={20} className='text-richblack-50'/>
        </button>
     </div>
     <form onSubmit={handleSubmit(onSubmit)} className='p-8 bg-richblack-800  rounded-b-lg'>
     <div className="flex items-center justify-center gap-x-4">
            <img
              src={user?.image}
              alt={user?.firstName + "profile"}
              className="aspect-square w-[50px] rounded-full object-cover"
            />
            <div className="">
              <p className="font-semibold text-richblack-5">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-5">Posting Publicly</p>
            </div>
          </div>
        <div className='flex flex-row space-x-[2px] mt-5 justify-center'>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FaStar
            key={index}
            onClick={() => handleClick(starValue)}
            color={starValue <= rating ? '#ffd700' : '#e4e5e9'}
            size={24}
            style={{ cursor: 'pointer' }}
          />
        );
      })}
    </div>
      <div className='my-6'>
          <p className="text-richblack-5 mb-[6px] text-[14px] ">
            Add Your Experience
            <sup className="text-pink-200">*</sup>
          </p>
          <textarea
        {...register('review',{required : true})}
          placeholder="Enter Your Experience"
          style={{
            boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
          }}
          className="rounded-lg w-full min-h-[150px] text-richblack-200 p-3 focus:outline-none bg-richblack-700 "
        />
          
          {errors.review && <span className='text-richblack-5'>Review is required**</span>}
        </div>
       <div className='flex w-fit space-x-4 ml-auto items-center flex-row'>
       <button
          
          className={`flex cursor-pointer items-center h-fit rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button>
     <button
        disabled={loading}
        type='submit'
        className="cursor-pointer  ml-auto flex flex-row items-center rounded-md py-2 px-5 font-semibold text-richblack-900 bg-yellow-50"
      >
        Save 
      </button>
       </div>
     </form>
    
       </div>
      </div>
      )
}

export default ReviewModal