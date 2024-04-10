import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'
import {passwordReset} from '../services/operations/authAPI'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa6'
const UpdatePassword = () => {
    const dispatch=useDispatch()
    const [isPasswordChanged, setIsPasswordChanged]=useState(false)
    const [formData, setFormData]=useState({newPassword : "", confirmNewPassword :""})
    const {loading}=useSelector((store)=>store.auth)
    const [showPassword,setShowPassword]=useState(false)
    const [showConfirmPassword,setShowConfirmPassword]=useState(false)
    const {token}=useParams()
    function handleChange(e)
    {
        setFormData((prevData)=>( {...prevData, [e.target.name] : e.target.value}))
    }
    function submitHandler(e)
    {
        e.preventDefault()
        dispatch(passwordReset(formData.newPassword, formData.confirmNewPassword,token,setIsPasswordChanged))
    }
  return (
   <div className='flex flex-col justify-center items-center my-[100px]'>
    {
        loading ? <h2>loading...</h2> : !isPasswordChanged ?
        <div className='max-w-[450px]'>
        <h3 className='text-richblack-5 text-[30px] font-semibold mb-3'>Choose new password</h3>
        <p className='text-[18px] text-richblack-100 mb-[24px]'>Almost done. Enter your new password and youre all set.</p>
        <form onSubmit={submitHandler} >
            <label className='relative mb-[20px] flex flex-col'>
                <p className='text-[14px] text-richblack-5 mb-1'>New password <span className='text-pink-200'>*</span></p>
                <input required type={showPassword ? ("text") : ("password")} name='newPassword' className='p-3 text-[16px] font-medium text-richblack-5 outline-none rounded-lg bg-richblack-800 shadow-resetPasswordInput' value={formData.newPassword} onChange={handleChange} />
                <span className='absolute right-3 top-[38px] z-[10] cursor-pointer' onClick={()=>setShowPassword(!showPassword)}>
            {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}</span>
            </label>
            <label className='relative mb-[24px] flex flex-col'>
            <p className='text-[14px] text-richblack-5 mb-1'>Confirm new password <span className='text-pink-200'>*</span></p>
                <input required type={showConfirmPassword ? ("text") : ("password")} className='p-3 text-[16px] font-medium text-richblack-5 rounded-lg outline-none bg-richblack-800 shadow-resetPasswordInput' name='confirmNewPassword' value={formData.confirmNewPassword} onChange={handleChange} />
                <span className='absolute right-3 top-[38px] z-[10] cursor-pointer' onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}</span>
            </label>
            
            <button className='p-3 bg-yellow-50 shadow-resetPasswordBtn mb-3 text-richblack-5 text-center font-medium text-[16px] w-full rounded-lg'>
                    Reset Password
            </button>
        </form>
        <div>
             <Link to='/login' className='p-3 text-richblack-5'>
                        <p className='flex flex-row items-center gap-2'><FaArrowLeft/> Back to login</p>
                    </Link>
                </div>  
     </div> 
     :
     <div>
      <h2>Reset Complete!</h2>
      <p></p>
     </div>
    }
   </div>
  )
}

export default UpdatePassword