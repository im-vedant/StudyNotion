import React, { useDebugValue, useState } from 'react'
import { FaArrowPointer } from "react-icons/fa6";
import { GrCertificate } from "react-icons/gr";
import { MdDevices } from "react-icons/md";
import { FaRegShareSquare } from "react-icons/fa";
import {loadStripe} from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addToCart } from '../../../slices/cartSlice';
const AddToCart = ({data}) => {
    const [loading, setLoading]=useState(false)
    const {cart}=useSelector((store)=>store.cart)
    const {token}=useSelector((store)=>store.auth)
    const {user}=useSelector((store)=>store.profile)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    function handleCart()
    {
        if(token===null)
        {
            toast.error("Please login to add course to cart")
            navigate('/login')
         }
         dispatch(addToCart(data))

    }
 async function makePayment(){
    if(token===null)
 {
    toast.error("Please login to buy the course")
    navigate('/login')
 }
 setLoading(true)
 const toastId=toast.loading("Redirecting to payment page...")
const stripe = await loadStripe('pk_test_51OPrXESACUyWX7X27qqfSRbC9Q8y6zBkGzUO3NuaWgkedIDwNqA97cOzCiOhGTT7i3HlntxVL1r2KRJ6vIIjNpqk0022qshto1');
const body={
    courses :[data._id]
}
const headers={
    'Content-Type':"application/json",
    Authorization :`Bearer ${token}`
}
const response=await fetch(`${process.env.REACT_APP_BASE_URL}/payment/capturePayment`,{
    method :"POST",
    headers : headers,
    body:JSON.stringify(body)
})
const {message}=await response.json()
console.log(message.id)
toast.dismiss(toastId)
setLoading(false)
const result =stripe.redirectToCheckout({
    sessionId : message.id
})
if(result.error)
console.log(result.error)

 }

  return (
    <div className='border -translate-y-[45%] h-fit bg-richblack-600 rounded-lg w-[32%] overflow-hidden'>
      <img src={data.thumbnail} className='h-[220px] p-3 w-full object-cover' alt="" />  
       <div className='p-6 flex flex-col space-y-4 '>
        <h2 className='text-richblack-5 text-[30px] font-bold'>Rs. {data.price}</h2>
        <div className='flex flex-col space-y-3'>
      {
        (!data?.studentsEnrolled.includes(user?._id) && ( <button onClick={handleCart} disabled={loading} className='w-full text-center px-6 py-3 text-richblack-900 text-[16px] font-medium rounded-lg bg-yellow-50' >
        Add to Cart
    </button>)) 
      }
        <button disabled={loading} onClick={
            user && data?.studentsEnrolled.includes(user?._id) ? ()=>navigate('/dashboard/enrolled-courses') : makePayment
        } style={{boxShadow: "-2px -2px 0px 0px rgba(255, 255, 255, 0.18) inset"
}} className='w-full text-center px-6 py-3 text-richblack-5 text-[16px] font-medium rounded-lg bg-richblack-800' >
           {  user && data?.studentsEnrolled.includes(user?._id) ? "Go to Course"  : "Buy Now" }
        </button>
        <p className='text-richblack-25 text-[14px] text-center'>30-Day Money-Back Guarantee</p>
        </div>
        <div className='text-[14px] font-medium text-caribbeangreen-100'>
            <h2 className='text-[16px] text-richblack-5  mb-2'>This course includes:</h2>
            <ul className='list-none flex flex-col space-y-2'>
                <li className='flex items-center flex-row space-x-2'>
                    <FaArrowPointer size={15}/>
                    <p>Full Lifetime access</p>
                </li>
                <li className='flex items-center flex-row space-x-2'>
                    <MdDevices size={15}/>
                    <p>Access on Mobile and TV</p>
                </li>
                <li className='flex items-center flex-row space-x-2'>
                    <GrCertificate size={15}/>
                    <p>Certificate of completion</p>
                </li>
            </ul>
        </div>
        <button className='py-3 flex flex-row items-center space-x-2 justify-center px-6 text-center w-full text-[16px] text-yellow-100'>
          <FaRegShareSquare size={16}/>
           <p>Share</p>
        </button>
        </div> 
    </div>
  )
}

export default AddToCart