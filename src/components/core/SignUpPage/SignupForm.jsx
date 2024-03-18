import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai'
import './SignupForm.css'
import { useNavigate } from 'react-router-dom'
import { setSignUpData } from '../../../slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { sendOTP, signUp } from '../../../services/operations/authAPI'
function SignupForm(props) {
    const dispatch=useDispatch()
    const navigate = useNavigate();
    const {signupData}=useSelector((store)=>store.auth)
    const [formData, setFormData]=useState({firstName:'', lastName:'',email:'', password:'', confirmPassword:'',accountType:'student'})
    const [showPassword,setShowPassword]=useState(false)
    const [showConfirmPassword,setShowConfirmPassword]=useState(false)
    function changeHandler(event){
        const {name,value}=event.target
        setFormData((prevData)=>{
            return{
                ...prevData,
                [name]:value
            }
        })
    }
    function submitHandler(event)
    {
        event.preventDefault()
        console.log(formData.confirmPassword , formData.password)
        if(formData.confirmPassword!==formData.password)
        {
            toast.error("Password do not match")
            return ;
        }
       dispatch(setSignUpData({...formData})) 
       console.log(signupData)
       dispatch(sendOTP(formData.email, navigate)) 
       setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        accountType : "student"
      })

    }
   const [isActive, setIsActive]=useState(true)
   const [prev, setPrev]=useState('student')

   function clickHandler(event){
    
    if(prev===event.target.name)
    return ;
    else
    {
        setFormData((prevData)=>{
            return {
                ...prevData,
                accountType : event.target.name
            }
        })
        setPrev(event.target.name)
        setIsActive(!isActive)
    }
   }
  return (
    <div>
        <div className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max'>
            <button onClick={clickHandler} name='student' className={isActive ? 'bg-richblack-900 text-richblack-5 py-2 px-5 rounded-full transition-all duration-200' :'bg-transparent text-richblack-5 py-2 px-5 rounded-full transition-all duration-200'} >
                Student
            </button>
            <button onClick={clickHandler} className={!isActive ? 'bg-richblack-900 text-richblack-5 py-2 px-5 rounded-full transition-all duration-200' :'bg-transparent text-richblack-5 py-2 px-5 rounded-full transition-all duration-200'} name='instructor'>
                Instructor
            </button>
        </div>
        <form onSubmit={submitHandler} className='mt-6 flex flex-col gap-y-4 w-full' >
            <div className='flex flex-row gap-x-4'>
            <label htmlFor="">
                <p className='text-[.875rem] leading-[1.375rem] text-richblack-5 mb-1'>First Name <sup className='text-pink-200'>*</sup></p>
                <input type="text" name='firstName' onChange={changeHandler} value={formData.firstName} className='w-full boxShadow p-[12px] bg-richblack-800 text-richblack-5 rounded-[.5rem]' required placeholder='Enter first name' />
            </label>
            <label htmlFor="">
                <p className='text-[.875rem] leading-[1.375rem] text-richblack-5 mb-1'>Last Name <sup className='text-pink-200'>*</sup></p>
                <input type="text" name='lastName'required value={formData.lastName} onChange={changeHandler} className='w-full boxShadow p-[12px] bg-richblack-800 text-richblack-5 rounded-[.5rem]' placeholder='Enter last name' />
            </label>
            </div>
            <label>
                <p className='text-[.875rem] leading-[1.375rem] text-richblack-5 mb-1'>Email Address<sup className='text-pink-200'>*</sup></p>
                <input type="email" name='email'required value={formData.email} onChange={changeHandler} className='w-full boxShadow p-[12px] bg-richblack-800 text-richblack-5 rounded-[.5rem]' placeholder='Enter email address' />
            </label>
           <div className='flex flex-row gap-x-4'>
           <label className="relative "><p className='text-[.875rem] leading-[1.375rem] text-richblack-5 mb-1'>Enter Password  <sup className='text-pink-200'>*</sup></p>
       
       <input onChange={changeHandler} value={formData.password} className='w-full boxShadow p-[12px] bg-richblack-800 text-richblack-5 rounded-[.5rem]' required type={showPassword ? ("text") : ("password")} name='password' placeholder='Enter Password' />
           <span className='absolute right-3 z-10 top-[38px] cursor-pointer' onClick={()=>setShowPassword(!showPassword)}>
           {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}</span> 
           </label>
           <label className='relative'>< p className='text-[.875rem] leading-[1.375rem] text-richblack-5 mb-1'>Confirm Password<sup className='text-pink-200'>*</sup></p>
       <input onChange={changeHandler} value={formData.confirmPassword} required type={showConfirmPassword ? ("text") : ("password")} className='w-full boxShadow p-[12px] bg-richblack-800 text-richblack-5 rounded-[.5rem]' name='confirmPassword'  placeholder='Confirm Password' />
           <span className='absolute z-10 right-3 top-[38px] cursor-pointer ' onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
           {showConfirmPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}</span> 
           </label> 
           </div>
            <button type='submit' className='bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900'>
                Create Account
            </button>
        </form>
    </div>
  )
}

export default SignupForm