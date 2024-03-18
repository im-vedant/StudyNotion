import React from 'react'
import { useLocation } from 'react-router-dom'
import {  useSelector } from 'react-redux'
import EditBtn from '../ProfilePage/EditBtn'
const Profile = () => {
  const location =useLocation()
  const currentSelected=location.pathname.split('/')[2].replace('-',' ')
  const {user}=useSelector((store)=>store.profile)
  const {image,firstName,lastName,email,contactNumber,additionalDetails}=user
  return (
    <div className='bg-richblack-900 w-full mb-[100px] '>
     <div className='p-6'>
      <p className='text-[14px] leading-[22px] mb-3 text-richblack-300'>Home / Dashboard / <span className='capitalize text-yellow-50'>{currentSelected}</span></p>
     <h2 className='text-richblack-5 font-medium text-[30px] leading-[38px]'>My Profile</h2>\
     </div>
      <div className='flex flex-col mt-8 ml-[100px] w-[70%]'>
        <div className='p-6 flex flex-row items-center justify-between w-full border border-solid border-richblack-700 rounded-[8px] bg-richblack-800'>
             <div className='flex flex-row space-x-6 items-center'>
             <img src={image} className='rounded-full object-cover w-[80px] h-[80px]' alt="" />
              <div className=''>
                <p className='text-richblack-5 font-semibold text-[18px] '>{firstName} {" "}{lastName}</p>
                <p className='text-richblack-300 text-[14px]'>{email}</p>
              </div>
           
             </div>
             <EditBtn/>

        </div>
        <div className='p-6 bg-richblack-800 border border-richblack-700 border-solid rounded-[8px] mt-5 flex flex-col space-y-5'>
          <div className='flex flex-row justify-between items-center'>
          <h2 className='text-richblack-5 text-[18px] font-semibold '>About</h2>
          <EditBtn/>
          </div>
          <p className='text-[14px] text-richblack-300 '>
            {additionalDetails.about || "Write something about yourself"}
          </p>
        </div>
        <div className='p-6 bg-richblack-800 border border-richblack-700 border-solid rounded-[8px] mt-5 flex flex-col space-y-5'>
          <div className='flex flex-row justify-between items-center'>
          <h2 className='text-richblack-5 text-[18px] font-semibold '>Personal Details</h2>
          <EditBtn/>
          </div>
          <div className='flex flex-row justify-between text-[14px] text-richblack-600'>
            <div className='flex-1'>
                <p>First Name</p>
                <p className='text-richblack-5 font-medium'>{firstName}</p>
            </div>
            <div className='flex-1'>
              <p>Last Name</p>
              <p className='text-richblack-5 font-medium'>{lastName}</p>
            </div>
          </div>
          <div className='flex flex-row justify-between text-[14px] text-richblack-600'>
            <div className='flex-1'>
                <p>Email</p>
                <p className='text-richblack-5 font-medium'>{email}</p>
            </div>
            <div className='flex-1'>
              <p>Phone Number</p>
              <p className='text-richblack-5 font-medium'>({additionalDetails.countryCode}){" "} {additionalDetails.contactNumber}</p>
            </div>
          </div>
          <div className='flex flex-row justify-between text-[14px] text-richblack-600'>
            <div className='flex-1'>
                <p>Gender</p>
                <p className='text-richblack-5 capitalize font-medium'>{additionalDetails.gender || "None"}</p>
            </div>
            <div className='flex-1'>
              <p>Date of Birth</p>
              <p className='text-richblack-5 font-medium'>{additionalDetails.dateOfBirth || "None" }</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile