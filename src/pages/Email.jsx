import  { useState } from 'react';
import React from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { FaClockRotateLeft,FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../services/operations/authAPI';
import { setSignUpData } from '../slices/authSlice';
import { sendOTP } from '../services/operations/authAPI';
const VerifyEmail = () => {
    const [otp, setOtp] = useState('')
    const navigate=useNavigate()
    const {loading,signupData}=useSelector((store)=>store.auth)
    const dispatch =useDispatch()
    function submitHandler(e){
e.preventDefault()
        dispatch(setSignUpData({...signupData, otp : otp}))
        dispatch(signUp(signupData.firstName,signupData.lastName,signupData.email,signupData.accountType, signupData.password,signupData.confirmPassword,otp,navigate))
    }
    function resendOTP(e)
    {
      e.preventDefault()
      dispatch(sendOTP(signupData.email,navigate))
    }
    if(loading)
   {
    return (
        <div>loading...</div>
        ) 
   }
else
  {
    return (
        <div className='text-richblack-5 max-w-[450px] mx-auto h-screen translate-y-[20%]'>
            <h2 className='text-[30px] font-semibold mb-3'>Verify email</h2>
            <p className='text-[18px] text-richblack-100 mb-6'>A verification code has been sent to you. Enter the code below</p>
          <form onSubmit={submitHandler}>
          <OtpInput
         
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>{""}</span>}
          renderInput={(props) =>  <input
            {...props}
            placeholder="-"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
          />}
          containerStyle={{
            justifyContent: "space-between",
            gap: "0 6px",
          }}
        />
          <button type='submit' className='p-3 mt-6 bg-yellow-50 shadow-resetPasswordBtn mb-3 text-richblack-900 text-center font-medium text-[16px] w-full rounded-lg'>
                       Verify email
                </button>
          </form>
                <div className='flex flex-row justify-between'>
                <Link to='/login' className='p-3 text-richblack-5'>
                            <p className='flex flex-row items-center gap-2'><FaArrowLeft/> Back to login</p>
                        </Link>
                        <button  className='p-3 text-blue-100'  onClick={resendOTP}>
                            <p className='flex flex-row items-center gap-2'><FaClockRotateLeft/> Resend it</p>
                        </button>
                </div>
        </div>
      )
  }
}

export default VerifyEmail