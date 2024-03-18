import React from 'react'
import frame from '../../assets/Images/frame.png'
import SignupForm from '../core/SignUpPage/SignupForm'
import LoginForm from '../core/LoginPage/LoginForm'
import {FcGoogle} from 'react-icons/fc'
function Template({title,desc1,desc2,image,formtype}) {
  return (
    <div className='flex max-w-[1160px] w-11/12 mx-auto py-12 flex-col-reverse justify-between gap-y-12 md:flex-row md:gap-x-12'>
        <div className='flex flex-col w-11/12 max-w-[450px] md:mx-0 mx-auto '>
            <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>{title}</h1>
            <p className='text-[1.125rem] leading-[1.625rem] mt-4 w-full'>
                <span className='text-richblack-100'>{desc1}</span>
                <br />
                <span className='text-blue-100 italic'>{desc2}</span>
            </p>
            {formtype==="signup" ?
            (<SignupForm  ></SignupForm>):
            (<LoginForm></LoginForm>)}
            <div className='flex flex-row justify-center items-center w-full gap-x-2 my-4'>
        <div className='w-full border-t border-richblack-700 max-h-max'></div>
        <p className='uppercase text-richblack-700 '>Or</p>
        <div className='w-full border-t max-h-max border-richblack-700'></div>
        </div>
        <button className='w-full flex justify-center items-center gap-x-2 py-[8px] px-[12px] rounded-[8px] mt-2 font-medium border border-richblack-700 text-richblack-100'>
        <FcGoogle className='w-[22px] h-[22px]'></FcGoogle>
        <p>Sign in with Google</p>
        </button>
        </div>
        
        <div className='relative w-11/12 max-w-[450px] mx-auto md:mx-0'>
            <img src={frame} width={558}  height={508} loading='lazy' alt="" />
            <img src={image} width={558} height={508} className='  absolute right-4 -top-4 ' loading='lazy' alt="" />
        </div>
    </div>
  )
}

export default Template