import React, { useState } from 'react'
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { login } from '../../../services/operations/authAPI'
import './LoginForm.css'
import { useDispatch } from 'react-redux'
function LoginForm(props) {
  const dispatch=useDispatch()
  const navigate=useNavigate()
    const [formData, setFormData]=useState({email:"", password:""})
   function changeHandler(event){
    let {name,value}=event.target
    setFormData((prevData)=>{
       return {
            ...prevData, [name]:value
        }
    })
}
function submitHandler(event)
{
  event.preventDefault()
  dispatch(login(formData.email,formData.password,navigate))
  
}
const [showPassword,setShowPassword]=useState(false)
  return (
    <form onSubmit={submitHandler} className='mt-6 flex flex-col gap-y-4 w-full'>
      <label className='' >
        <p className='text-[.875rem] leading-[1.375rem] text-richblack-5 mb-1'>Email Address <sup className='text-pink-200'>*</sup></p>
       
        
      <input onChange={changeHandler} value={formData.email} required type="email" name='email' className='w-full boxShadow p-[12px] bg-richblack-800 text-richblack-5 rounded-[.5rem]'  placeholder='Enter email address' />
      </label>  
        <label htmlFor="password" className=' relative '><p className='text-[.875rem] mb-1 leading-[1.375rem] text-richblack-5'>Password<sup className='text-pink-200'>*</sup></p>
        
        <input onChange={changeHandler} required type={showPassword ? ("text") : ("password")} name='password' value={formData.password} placeholder='Enter Password' className='w-full pr-12 boxShadow p-[12px] bg-richblack-800 text-richblack-5 rounded-[.5rem]' />
            <span className='absolute right-3 top-[38px] z-[10] cursor-pointer' onClick={()=>setShowPassword(!showPassword)}>
            {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}</span>
            <Link to='/forgot-password'>
              <p className='ml-auto max-w-max text-blue-100 text-xs mt-1'>Forgot Password</p>
            </Link>
            </label>
            <button className='bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900'>
              Sign In 
            </button>
    </form>
  )
}

export default LoginForm