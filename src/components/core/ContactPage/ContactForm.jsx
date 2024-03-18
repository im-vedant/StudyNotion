import React, { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {submitContactForm} from '../../../services/operations/contactAPI'
import countryData from '../../../data/countrycode.json'
const ContactForm = ({title, desc}) => {
    const [loading,setLoading]=useState(false)
    const {register,handleSubmit,reset,formState :{errors, isSubmitSuccessful}}=useForm()
   
    useEffect(()=>{
        if(isSubmitSuccessful)
        {
            reset({
                email :"",
                firstName:"",
                lastName :"",
                message:"",
                phoneNo:"",
                phoneNumberCode :"+91"
            })
        }
    },[isSubmitSuccessful])
   function submitForm(data)
   {
    submitContactForm(data,setLoading)
   }
  return (
    <div className='mx-auto'>
        <h2 className='text-richblack-5 text-[36px] font-semibold leading-[44px] mb-3 text-center'>{title}</h2>
        <p className='text-richblack-300 text-center font-medium text-[16px] mb-8'>{desc}</p>
        <form onSubmit={handleSubmit(submitForm)} className='p-8 flex flex-col gap-y-4 max-w-[540px] mx-auto' >
            <div className='flex flex-row gap-x-5'>
            <label htmlFor="">
                <p className='text-[.875rem] leading-[1.375rem] text-richblack-5 mb-[6px]'>First Name </p>
                <input type="text" name='firstName' {...register("firstName", {required : true})}   className='w-full boxShadow p-[12px] bg-richblack-800 text-richblack-5 rounded-[.5rem]' required placeholder='Enter first name' />
                {
                    errors.firstName && <span>Please enter your first name</span>
                }
            </label>
            <label htmlFor="">
                <p className='text-[.875rem] leading-[1.375rem] text-richblack-5 mb-[6px]'>Last Name </p>
                <input type="text" name='lastName' {...register("lastName")}   className='w-full boxShadow p-[12px] bg-richblack-800 text-richblack-5 rounded-[.5rem]' placeholder='Enter last name' />
            </label>
            </div>
            <label>
                <p className='text-[.875rem] leading-[1.375rem] text-richblack-5 mb-[6px]'>Email Address</p>
                <input type="email" {...register('email',{required : true})} name='email'  className='w-full boxShadow p-[12px] bg-richblack-800 text-richblack-5 rounded-[.5rem]' placeholder='Enter email address' />
                {
                    errors.email && <span>Please enter your email address</span>
                }
            </label>
            <div className='flex flex-row space-x-5' >
                <select name="phoneNumberCode" defaultValue={"+91"} className='w-[85px] boxShadow p-[12px] bg-richblack-800 text-richblack-5 rounded-[.5rem]'  id="phoneNumberCode" {...register('phoneNumberCode',{required: true})} >
                   {
                    countryData.map((data,index)=>{
                        return <option key={index} value={data.code}>{data.code + ' - '+data.country}</option>
                    })
                   }
                </select>
                <input type="text" name="phoneNo" className='w-full boxShadow p-[12px] bg-richblack-800 text-richblack-5 rounded-[.5rem]' id="phoneNo" placeholder='12345567890'  {...register('phoneNo',{required:true, maxLength:{value:10, message :"Invalid phone number"},minLength:{value:7, message :"Invalid phone number"}})}/>
            </div>
            {
                errors.phoneNumberCode && <span>Please enter your phone number</span>
            }
            <label >
            <p className='text-[.875rem] leading-[1.375rem] text-richblack-5 mt-[16px] mb-[6px]'>Message</p>
               <textarea name="message" {...register('message',{required : true})}  id=""  className='w-full min-h-[100px] boxShadow p-[12px] bg-richblack-800 text-richblack-5 rounded-[.5rem]' placeholder='Enter your message' ></textarea>
               {
                errors.message && <span>Please enter your message</span>
               }
            </label>
            <button type='submit' className='bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-[16px] font-medium text-richblack-900'>
                Send Message
            </button>
        </form>
    </div>
  )
}

export default ContactForm