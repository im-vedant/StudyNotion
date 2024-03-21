import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { getAllInstructorCourses } from '../../../services/operations/courseAPI';
import { useSelector } from 'react-redux';
import CourseTable from './InstructorCourses/CourseTable';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../utils/Spinner';

const MyCourses = () => {
    const {token}=useSelector((store)=>store.auth)
    const [courses,setCourses]=useState([])
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
    async function fetchInstructorCourses()
    {
        setLoading(true)
        let result=await getAllInstructorCourses(token)
        if(result)
        setCourses(result)
        setLoading(false)
    }
    useEffect(()=>{
       fetchInstructorCourses()
    },[])
  return (

   <div className='w-full'>
     <div className='bg-richblack-900 w-full max-w-[1000px] mb-[100px]   '>
     <div className='p-6'>
      <p className='text-[14px] leading-[22px] mb-3 text-richblack-300'>Home / Dashboard / <span className='capitalize text-yellow-50'>My Courses</span></p>
        <div className='flex flex-row justify-between items-center'>
        <h2 className='text-richblack-5 font-medium text-[30px] leading-[38px]'>My Courses</h2>
        <button onClick={()=>navigate("/dashboard/add-course")} disabled={loading} className='px-5 flex flex-row items-center space-x-2 font-medium text-[16px]  text-richblack-900 py-3 rounded-lg bg-yellow-50'>
            <p>Add Courses</p>
            <FaPlus size={18}/>
        </button>
        </div>
     </div>
     {
        loading ? <div className='flex justify-center items-center mt-8'> <Spinner size={70}/></div> : 
       <CourseTable courses={courses} setCourses={setCourses}/>
     }
    
    </div>
   </div>
  )
}

export default MyCourses