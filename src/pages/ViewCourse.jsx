import React, { useEffect, useRef, useState } from 'react'
import VideoSideBar from '../components/core/ViewCourse/VideoSideBar'
import { fetchFullCourseDetails, markLectureAsCompleted } from '../services/operations/courseAPI'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ReviewModal from '../components/core/ViewCourse/ReviewModal'
import ReactPlayer from 'react-player'
import Spinner from '../utils/Spinner'
const ViewCourse = () => {
    const {courseId}=useParams()
    const {token}=useSelector((store)=>store.auth)
    const [data,setData]=useState(null)
    const [sections,setSections]=useState(null)
    const [sectionIndex,setSectionIndex]=useState(0)
    const [subSectionIndex,setSubSectionIndex]=useState(0)
    const [loading,setLoading]=useState(false)
    const [isOpen, setIsOpen]=useState(false)
    const playerRef=useRef(null)
    async function fetchCourse(){
        const response =await fetchFullCourseDetails(courseId,token)  
        if(response===null)
     {
        console.log("Unable to fetch details")
        return 
     }
     
       setData(response)
       console.log(response.courseDetails.courseContent[0].subSection[0])
       setSections(response.courseDetails.courseContent.map((section)=>section.subSection))
    }
    const [showButtons, setShowButtons] = useState(false);
console.log(showButtons)
  // Function to handle the ended event of the video
  const handleVideoEnded = () => {
    console.log("video ended")
    setShowButtons(true);
  };

  // Function to handle the rewatch button click
  const handleRewatchClick = () => {
    setShowButtons(false); // Hide buttons
    // Reset the video to the beginning
    if (playerRef.current) {
      playerRef.current.seekTo(0);
    }

  };
    useEffect(()=>{
      fetchCourse()
    },[])
    
    function handlePrevious()
    {
      if(0===subSectionIndex)
      {
        setSectionIndex(sectionIndex-1)
        setSubSectionIndex(sections[sectionIndex-1].length-1)
      }
      else
      {
        setSubSectionIndex(subSectionIndex-1)
      }
      setShowButtons(false)
    }
    function handleNext()
    {
      if(sections[sectionIndex].length-1===subSectionIndex)
      {
        setSectionIndex(sectionIndex+1)
        setSubSectionIndex(0)
      }
      else 
      {
        setSubSectionIndex(subSectionIndex+1)
      }
      setShowButtons(false)
    }
    async function markAsCompleted()
    {
      setLoading(true)
      const response =await markLectureAsCompleted(sections[sectionIndex][subSectionIndex]._id,data.courseDetails._id,token)
      if(response)
      setData({...data, completedVideos : response})
      setLoading(false)
    }
    if(data===null)
    return  <div className=" h-[500px]  flex justify-center items-center" >
    <Spinner size={80}/>
 </div>
  return (
    <div className='flex flex-row justify-between '>
        <VideoSideBar setIsOpen={setIsOpen} sectionIndex={sectionIndex} subSectionId={sections[sectionIndex][subSectionIndex]._id} setSectionIndex={setSectionIndex} setSubSectionIndex={setSubSectionIndex}  data={data.courseDetails} completedVideos={data.completedVideos}/>
        <div className='w-[80%] relative'>
        {
       <div className='w-full aspect-video'> <ReactPlayer controls={true} ref={playerRef} onEnded={handleVideoEnded} url={sections[sectionIndex][subSectionIndex].videoUrl} width="100%" height="100%" /></div>
        }
          {showButtons && (
        <div
        style={{
          backgroundImage:
            "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
        }}
         className="absolute inset-0 flex justify-center z-30 items-center">
          <div className=" flex flex-col space-y-3 ">
          {!data.completedVideos.includes(sections[sectionIndex][subSectionIndex]._id) && (
               <button onClick={markAsCompleted} disabled={loading} className='text-xl font-medium text-richblack-900 bg-yellow-50 rounded-lg py-2 px-4'>{loading  ? "Loading":"Mark as Completed"}</button>
              )}
              <button disabled={loading} className="text-xl font-medium text-richblack-900 bg-yellow-50 rounded-lg py-2 px-4" onClick={handleRewatchClick}>
              Rewatch
            </button>
          {
          (sectionIndex===0 && subSectionIndex===0) ? null : 
          <button disabled={loading} onClick={handlePrevious} className="text-xl font-medium text-richblack-900 bg-yellow-50 rounded-lg py-2 px-4 ">
            Previous
          </button>
          }
            
           {
            (sectionIndex===sections.length-1 && subSectionIndex===sections[sections.length-1].length-1) ? null : <button disabled={loading} onClick={handleNext} className="text-xl font-medium text-richblack-900 bg-yellow-50 rounded-lg py-2 px-4">
            Next
            </button>
           }
          </div>
        </div>
      )}
        </div>
        {
          isOpen &&
          <ReviewModal isOpen={isOpen} setIsOpen={setIsOpen} courseId={data.courseDetails._id}/>
        }
    </div>
  )
}

export default ViewCourse