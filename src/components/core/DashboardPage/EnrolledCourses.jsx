import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getUserEnrolledCourses } from '../../../services/operations/enrolledCourseAPI'
import Spinner from '../../../utils/Spinner'
const EnrolledCourses = () => {
    const {token}=useSelector((store)=>store.auth)
    const [completedVideos,setCompletedVides]= useState([])
    const [enrolledCourses,setEnrolledCourses]=useState([])
    const location =useLocation()
    const [loading,setLoading]=useState(false)
    const currentSelected=location.pathname.split('/')[2].replace('-',' ')
    async function getEnrolledCourses(){
        try {
          setLoading(true)
            const response=await getUserEnrolledCourses(token)
            setEnrolledCourses(response.courses)
            
            setCompletedVides(response.completedVideos)
        } catch (error) {
            console.log("Unable to fetch enrolled courses")
        }
        setLoading(false)
    }
    useEffect(()=>{
        getEnrolledCourses()
    },[])

    if(loading)
    {
      return <div className="flex w-full justify-center items-center">
      <Spinner></Spinner>
    </div>;
    }
  return (
    <div className='bg-richblack-900 w-full mb-[100px]  '>
     <div className='max-w-[1200px]'>
     <div className='p-6'>
      <p className='text-[14px] leading-[22px] mb-3 text-richblack-300'>Home / Dashboard / <span className='capitalize text-yellow-50'>{currentSelected}</span></p>
     <h2 className='text-richblack-5 font-medium text-[30px] leading-[38px]'>Enrolled Courses</h2>
     </div>
   
          {
          
            enrolledCourses?.length===0 ? <p>Your are not enrolled in any course</p> :
            <div className='overflow-hidden rounded-lg m-6 border border-richblack-700'>
              <div className='flex border-richblack-700 border-b text-richblack-50 flex-row p-4 bg-richblack-700'>
                <p className='w-[60%]'>Course Name</p>
                <p className='w-[20%]'>Durations</p>
                <p className='w-[20%]'>Progress</p>
              </div>
              {
                enrolledCourses.map((item)=>{
                  let progress=0
                  let count=0
                  let done=0
                  function getProgress(){
                    for(let x of item.courseContent)
                    {
                    
                      for(let y of x.subSection)
                      {
                        count++;
                        console.log(y)
                        if(completedVideos.includes(y))
                        done++
                      }
                    }
                  }
                  getProgress()
                  progress=Math.round((done/count)*100 )
                  console.log(progress, count)

                  return <div className='flex border-b border-richblack-700 text-richblack-50 flex-row p-4 '>
                 <Link to={`/view-course/${item._id}`} className='w-[60%]'>
                 
                 <div className='w-full flex flex-row space-x-5'>
                    <img src={item.thumbnail} className='w-[50px] rounded-lg h-[50px] object-cover' alt="" />
                    <div className='text-richblack-5 text-[16px] font-medium'>
                      <p>{item.courseName}</p>
                      <p className='text-richblack-300 font-normal'>{item.courseDescription.length>50 ? item.courseDescription.slice(0,50)+"..." : item.courseDescription}</p>
                    </div>
                  </div></Link>
                  <p className='w-[20%]'>{item?.duration || "2hr 30 mins"}</p>
                  <div className='w-[20%] '>
                    <p>Progess 
                      {" "} {progress || 0}%</p>
                      <div className='rounded-full mt-1 bg-richblack-700 w-[150px] h-2'>
                        <div style={{width : `${progress || 0}%`}} className='rounded-full h-2 bg-blue-100'></div>
                      </div>
                  </div>
                </div>
                })
              }
            </div>
          }
      
     </div>
    </div>
  )
}

export default EnrolledCourses