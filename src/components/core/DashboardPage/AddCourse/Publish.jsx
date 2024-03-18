import React, { useEffect, useState } from 'react'
import { setEditCourse,setStep } from '../../../../slices/courseSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { resetCourseState } from '../../../../slices/courseSlice';
import { useNavigate } from 'react-router-dom';
import { editCourseDetails } from '../../../../services/operations/courseAPI';
const Publish = () => {
  const [loading ,setLoading]=useState(false)
  const {course}=useSelector((store)=>store.course)
  const {token}=useSelector((store)=>store.auth)
  const dispatch=useDispatch() 
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  useEffect(()=>{
    let val
    if(course.status==='Draft')
    val=false
  else
  val=true
    setValue('status',)
  },[])
  function goToCourses()
  {
    dispatch(resetCourseState())
    navigate('/dashboard/my-courses')
  }
  async function handleCoursePublish(data)
  {
    if((course.status==='Published' && data.status===true) || (course.status==='Draft' && data.status===false))
    {
      goToCourses()
      return ;
    }
    else{
      let formData=new FormData()
      formData.append('courseId',course._id)
      let status=data.status===true ? "Published" : "Draft"
      formData.append('status',status)
      setLoading(true)
      const result =await editCourseDetails(formData,token)
      if(result){
        goToCourses()
      }
      setLoading(false)
    }
  }
  return (
    <div>
    <div className="p-6 border rounded-lg border-richblack-700 bg-richblack-800">
    <h1 className="mb-[26px] text-[24px] text-richblack-5 font-semibold ">
      Publish Settings
    </h1>
    <form onSubmit={handleSubmit(handleCoursePublish)}>
      <div className='flex flex-row space-x-2 items-center'>
      <input type="checkbox" id='status' {...register('status')}  className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
 />
      <label className='text-richblack-400 text-[16px] font-medium' htmlFor="status">Make this Course Public</label>
      </div>
      <div className="flex justify-end space-x-2 mt-[50px] gap-x-2">
      <button
        onClick={() => {
          dispatch(setEditCourse(true));
          dispatch(setStep(2));
        }}
        disabled={loading}
    
        className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-medium text-richblack-900`}
      >
       <MdKeyboardArrowLeft/>
       <p>Back</p>
      </button>
      <button
      disabled={loading}
  type='submit'
        className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-50 py-[8px] px-[20px] font-semibold text-richblack-900`}
      >
       <p>Save Changes</p>
      </button>
    </div>
    </form>
    </div>
 
  </div>
  )
}

export default Publish