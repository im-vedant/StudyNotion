import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import apiConnector from '../../../../services/apiConnector';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import {settingsEndpoints} from '../../../../services/api'
const AddCategory = () => {
    const {token}=useSelector((store)=>store.auth)
    const navigate=useNavigate()
    const [loading, setLoading]=useState(false)
   
    const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  async function submitForm(){
    const formData=getValues()
    const toastId=toast.loading("loading...")
    setLoading(true)
    try {
       const response=await apiConnector("POST",settingsEndpoints.CREATE_CATEGORY_API, {name : formData.category, description : formData.description },{Authorization : `Bearer ${token}`} )
       if(response.data.status)
       {
        toast.success("Category Added")
       } 
    } catch (error) {
        console.log(error)
        toast.error("Unable to add category")
    }
    setLoading(false)
    toast.dismiss(toastId)
}
  return (
    <div className='bg-richblack-900 w-full mb-[100px] '>
     <div className='p-6'>
      <p className='text-[14px] leading-[22px] mb-3 text-richblack-300'>Home / Dashboard / <span className='capitalize text-yellow-50'>Admin Panel</span></p>
     <h2 className='text-richblack-5 font-medium text-[30px] leading-[38px]'>Admin Panel</h2>\
     </div>
      <div className='flex flex-col mt-8 ml-[100px] w-[70%]'>
      <form
          onSubmit={handleSubmit(submitForm)}
          className="p-6 bg-richblack-800 border border-richblack-700 border-solid rounded-[8px] mt-5 flex flex-col space-y-5"
        >
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-richblack-5 text-[18px] font-semibold ">
              Add Category
            </h2>
          </div>
          <div className="flex flex-col justify-between space-y-3 text-[14px] text-richblack-5">
            <label className="flex-1">
            <p className="text-richblack-5 mb-[6px] text-[16px]">
          {" "}
          Category <sup className="text-pink-200">*</sup>
        </p>
              <input
                type="text"
                placeholder='Enter category'
                {...register("category", { required: true })}
                className="w-full my-[6px] focus:outline-none boxShadow p-[12px] bg-richblack-700 text-richblack-5 rounded-[.5rem]"
              />
              {
                errors.category && <span>Description is required**</span>
              }
            </label>
            <label className="flex-1">
            <p className="text-richblack-5 mb-[6px] text-[16px]">
          {" "}
          Description <sup className="text-pink-200">*</sup>
        </p>
              <textarea
               placeholder='Enter description for category'
                {...register("description", { required: true })}
                className="w-full my-[6px] focus:outline-none boxShadow min-h-[100px] p-[12px] bg-richblack-700 text-richblack-5 rounded-[.5rem]"
              />
              {
                errors.description && <span>Description is required**</span>
              }
            </label>
       
          </div>
       
      
          <div className="flex items-center gap-x-4">
            <button
            disabled={loading}
              onClick={() => navigate("/dashboard/my-profile")}
              className="cursor-pointer rounded-md bg-richblack-200 py-2 px-5 font-semibold text-richblack-900"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              type="submit"
              className="cursor-pointer rounded-md py-2 px-5 font-semibold text-richblack-900 bg-yellow-50"
            >
              Create Category
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCategory