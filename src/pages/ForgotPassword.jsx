import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6"
import { getPasswordResetToken } from '../services/operations/authAPI'
const ForgotPassword = () => {
    const {loading}=useSelector((store)=>store.auth)
    const [emailSent, setEmailSent]=useState(false)
    const [email, setEmail]=useState("")
    const dispatch=useDispatch()
    function handleOnSubmit(event)
    {
        event.preventDefault()
        dispatch(getPasswordResetToken(email, setEmailSent))
    }
  return (
    <div className='text-richblack-5 flex justify-center items-center my-[100px] w-full'>
        {
            loading ? <div>Loading...</div> :
            <div className='max-w-[450px] '>
                <h1 className='text-richblack-5 text-[30px] font-semibold mb-3'>
                    {
                        !emailSent ?"Reset Your Password" : "Check Your Email"
                    }
                </h1>
                <p className='text-[18px] text-richblack-100 mb-[36px]'>
                    {
                        !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery":`We have sent the reset email to ${email}`
                    }
                </p>
                <form onSubmit={handleOnSubmit} >
                    {
                        !emailSent && (
                            <label htmlFor="" className='mb-[36px] flex flex-col'>
                                <p className='text-[14px] text-richblack-5 mb-1'>Email Address <span className='text-pink-200'>*</span> </p>
                                <input type="email" required name='email' className='p-3 text-[16px] outline-none font-medium text-richblack-5 rounded-lg bg-richblack-800 shadow-resetPasswordInput' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email address'/>
                            </label>
                        )
                    }
                <button className='p-3 bg-yellow-50 shadow-resetPasswordBtn mb-3 text-richblack-900 text-center font-medium text-[16px] w-full rounded-lg'>
                    {
                        !emailSent ? "Reset Password": "Resend Email"
                    }
                </button>
                </form>
                <div>
                    <Link to='/login' className='p-3'>
                        <p className='flex flex-row items-center gap-2'><FaArrowLeft/> Back to login</p>
                    </Link>
                </div>    
            </div>
        }
    </div>
  )
}

export default ForgotPassword