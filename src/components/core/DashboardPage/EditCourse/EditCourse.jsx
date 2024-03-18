import { useParams } from "react-router-dom";
import RenderSteps from "../AddCourse/RenderSteps";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";
import React, { useEffect, useState } from 'react'
import { getCourseDetails } from "../../../../services/operations/courseAPI";
import { useDispatch, useSelector } from "react-redux";
const EditCourse = () => {
  const {id}=useParams()
  console.log(useParams())
  const {token}=useSelector((store)=>store.auth)
  const [loading,setLoading]=useState(false)
  const dispatch=useDispatch()
  async function getCourse(){
    setLoading(true)
    const response=await getCourseDetails(id,token)
    if(response)
    {
      dispatch(setEditCourse(true))
      dispatch(setCourse(response))
    }
    setLoading(false)
  }
  useEffect(()=>{
    getCourse()
  },[])
  if(loading)
  {
    return <div>Loading...</div>
  }
  return (
    <div className='w-full p-8 max-w-[700px] mx-auto'>
        <h2 className='text-richblack-5 font-medium text-[30px] mb-10 '>Edit Course</h2>
        <RenderSteps/>
    </div>
  )
}

export default EditCourse