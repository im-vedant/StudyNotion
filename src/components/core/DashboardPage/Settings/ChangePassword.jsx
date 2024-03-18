import React from 'react'
import { AiOutlineEyeInvisible,AiOutlineEye } from 'react-icons/ai'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { updatePassword } from '../../../../services/operations/settingAPI'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
const ChangePassword = () => {
    const {user}=useSelector((store)=>store.profile)
    const { token } = useSelector((store) => store.auth)
    const [showPassword,setShowPassword]=useState(false)
    const [showNewPassword,setShowNewPassword]=useState(false)
    const navigate=useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
      } = useForm({
        defaultValues: {
            oldPassword :"",
            newPassword :""
        },
      });
      useEffect(()=>{
        if(isSubmitSuccessful)
        {
            reset({
               oldPassword :"",
               newPassword :""
            })
        }
    },[isSubmitSuccessful])
    function handlePasswordChange(data){
        try {
            console.log(token)
            console.log(user)
          updatePassword(user.email,data ,token)
        } catch (error) {
          
        }
      }
  return (
    <form onSubmit={handleSubmit(handlePasswordChange)} className="p-6 mt-[20px]  w-full border border-solid border-richblack-700 rounded-[8px] bg-richblack-800">
    <h2 className="text-[18px] text-richblack-5 font-semibold">
          Password
        </h2>
        <div className='flex flex-row w-full gap-x-4 my-5'>
       <label className="relative flex-1 "><p className='text-[.875rem] leading-[1.375rem] text-richblack-5 mb-1'>Old Password</p>
   
   <input  className='w-full boxShadow p-[12px] bg-richblack-700 text-richblack-5 rounded-[.5rem]' {...register('oldPassword')}  type={showPassword ? ("text") : ("password")}  placeholder='Enter Password' />
       <span className='absolute right-3 z-10 top-[38px] cursor-pointer' onClick={()=>setShowPassword(!showPassword)}>
       {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}</span> 
       </label>
       <label className='relative flex-1'>< p className='text-[.875rem] leading-[1.375rem] text-richblack-5 mb-1'>New Password</p>
   <input  type={showNewPassword ? ("text") : ("password")} {...register('newPassword')} className='w-full boxShadow p-[12px] bg-richblack-700 text-richblack-5 rounded-[.5rem]' placeholder='New Password' />
       <span className='absolute z-10 right-3 top-[38px] cursor-pointer ' onClick={()=>setShowNewPassword(!showNewPassword)}>
       {showNewPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}</span> 
       </label> 
       </div>
       <div className="flex items-center gap-x-4 ">
        <button
          onClick={() => navigate("/dashboard/my-profile")}
          className="cursor-pointer rounded-md bg-richblack-200 py-2 px-5 font-semibold text-richblack-900"
        >
          Cancel
        </button>
        <button
          type='submit'
          className="cursor-pointer rounded-md py-2 px-5 font-semibold text-richblack-900 bg-yellow-50"
        >
          Save
        </button>
      </div>
      </form>
  )
}

export default ChangePassword