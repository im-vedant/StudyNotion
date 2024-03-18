import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { IoClose } from "react-icons/io5";
import { FiUploadCloud } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { editSubSection,createSubSection } from '../../../../../services/operations/courseAPI';
import useOnOutsideClick from '../../../../../hooks/useOnOutsideClick'
import { setCourse } from '../../../../../slices/courseSlice';
const SubSectionModal = ({closeHandler,isSubSectionModalOpen,stage,subSectionData,sectionId}) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,
        formState: { errors, isSubmitSuccessful },
      } = useForm();
      const dispatch=useDispatch()
      const {course}=useSelector((store)=>store.course)
      const {token}=useSelector((store)=>store.auth)
      const [videoFile, setVideoFile] = useState(null);
      const [videoData, setVideoData] = useState(null);
      const [loading,setLoading]=useState(false)
     
   let ref=useRef(null)
   let inputRef=useRef(null)
    useOnOutsideClick(ref,closeHandler)
    useEffect(()=>{
      if(stage!=='add')
      {
       setValue('title',subSectionData.title)
       setValue('description',subSectionData.description)
       setVideoFile(subSectionData.videoUrl)
       setVideoData(subSectionData.videoUrl)
      }
      
   },[])
    if (!isSubSectionModalOpen) 
    return null;
    // Function to handle when a video file is selected
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setVideoFile(file);
  
        const reader = new FileReader();
        reader.onloadend = () => {
          setVideoData(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
    function handleClick(e) {
        e.preventDefault();
        if (inputRef.current) 
        inputRef.current.click();
      }
      const isFormUpdated=()=>{
        let currentValues=getValues()
        if(currentValues.title!==subSectionData.title || currentValues.description!==subSectionData.description || videoFile!==subSectionData.videoUrl )
        return true;
        else 
        return false
      }
  async function onSubmit(data)
  {
    
    if(stage==="edit")
    {
        if(isFormUpdated)
        {
            let formData=new FormData()
            let currentValues=getValues()
            formData.append('sectionId',sectionId)
            formData.append("subSectionId",subSectionData._id)
            if(currentValues.title!==subSectionData.title)
            formData.append('title',currentValues.title)
            if(currentValues.description!==subSectionData.description)
            formData.append('description',currentValues.description)
            if(videoFile!==subSectionData.videoUrl)
            formData.append('videoFile',videoFile)
            setLoading(true)
            const result=await editSubSection(formData,token)
            console.log(result)
            if(result)
            {
                let courseContent=course.courseContent.map((data)=>{
                    if(data._id===sectionId)
                    return result
                return data
                })
                dispatch(setCourse({...course ,courseContent:courseContent}))
            }
            setLoading(false)
            closeHandler()
        }
        else
        {
           toast.error("No changes made to the lecture")
        }
    }
    else 
    {
        let formData=new FormData()
        formData.append('sectionId',sectionId)
        formData.append('title',data.title)
        formData.append('description',data.description)
        formData.append('videoFile',videoFile)
        setLoading(true)
        const response=await createSubSection(formData,token)
        console.log(response)
        if(response)
        {
            let courseContent=course.courseContent.map((data)=>{
                if(data._id===sectionId)
                return response
              return data
            })
            dispatch(setCourse({...course ,courseContent:courseContent}))
        }
        setLoading(false)
        closeHandler()
    }
  }
  
  return (
    <div  className="fixed top-0 left-0 right-0 -bottom-10 h-[100%] z-10 flex  items-center justify-center backdrop-filter backdrop-blur-sm">
    <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
   <div ref={ref}  className='w-[40%] h-fit z-20 max-h-[95%] overflow-y-scroll'>
     <div className='py-4 rounded-t-lg px-6 flex flex-row justify-between items-center bg-richblack-700 text-richblack-5 text-[18px] font-semibold border-b border-richblack-600' >
      <p> {stage==="add" ? "Adding Lecture" : stage==="view" ? "Viewing Lecture"  : "Editing Lecture"}</p>
        <button onClick={closeHandler} className='cursor-pointer'>
            <IoClose size={20} className='text-richblack-50'/>
        </button>
     </div>
     <form onSubmit={handleSubmit(onSubmit)} className='p-8 bg-richblack-800'>
     <div>
        <p className="text-richblack-5 mb-[6px] text-[14px] ">
          Lecture Video <sup className="text-pink-200">*</sup>
        </p>
        <input
          type="file"
          ref={inputRef}
          id="courseImage"
          name="courseImage"
          onChange={handleFileChange}
          accept="video/*"
          className="hidden w-0 h-0"
        />
          <div
        style={{
          boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
        }}
        className="rounded-lg   w-full text-richblack-200 py-8 px-3 focus:outline-none text-[12px] bg-richblack-700 "
      >
        {videoData === null && (
          <div className="flex justify-center text-center items-center flex-col space-y-[6px]">
            <div className="w-[45px] p-3 h-[45px] rounded-full bg-pure-greys-800 flex justify-items-center">
              {" "}
              <FiUploadCloud size={24} className="text-yellow-50" />
            </div>
            <div >
              <p>
                Drag and drop an image, or{" "}
                <button
                  className="text-yellow-50 font-semibold"
                  onClick={handleClick}
                >
                  Browse{" "}
                </button>{" "}
              </p>
              <p>Max 6MB each (12MB for videos) </p>
            </div>
            <ul className="flex flex-row list-disc font-semibold justify-center space-x-10">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
        {videoData !== null && (
          <div className="flex flex-col space-y-2 justify-center items-center">
           {
            videoData.includes("youtube") ? <iframe src={videoData} className="w-full aspect-video object-contain" frameborder="0"></iframe> :<video src={videoData} className="w-full h-[150px] aspect-video object-contain" alt="" />
           } 
           { stage==="edit" &&
             <button
             className=" w-fit text-[16px] font-medium"
               onClick={(e) => {
                 e.preventDefault()
                 setVideoFile(null);
                 setVideoData(null);
               }}
             >
               Cancel
             </button>
           }
          </div>
        )}
      </div>
      </div>
      <div className='my-6'>
          <p className="text-richblack-5 mb-[6px] text-[14px] ">
            Lecture Title
            <sup className="text-pink-200">*</sup>
          </p>
          {
            stage==="view"?
            <input
            readOnly
            type="text"
            placeholder="Enter Lecture Title"
            style={{
              boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
            }}
            {...register("title", { required: true })}
            className="rounded-lg w-full text-richblack-200 p-3 focus:outline-none bg-richblack-700 "
          />
            :
            <input
            type="text"
            placeholder="Enter Lecture Title"
            style={{
              boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
            }}
            {...register("title", { required: true })}
            className="rounded-lg w-full text-richblack-200 p-3 focus:outline-none bg-richblack-700 "
          />
          }
          {errors.title && <span>Lecture title is required**</span>}
        </div>
        <div>
        <p className="text-richblack-5 mb-[6px] text-[14px] ">
          Lecture Description <sup className="text-pink-200">*</sup>
        </p>
       {
        stage==='view' ? 
        <textarea
        readOnly
        {...register('description',{required : true})}
          placeholder="Enter Lecture Description"
          style={{
            boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
          }}
          className="rounded-lg w-full min-h-[150px] text-richblack-200 p-3 focus:outline-none bg-richblack-700 "
        />:
        <textarea
        {...register('description',{required : true})}
          placeholder="Enter Lecture Description"
          style={{
            boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
          }}
          className="rounded-lg w-full min-h-[150px] text-richblack-200 p-3 focus:outline-none bg-richblack-700 "
        />
       }
         {
          errors.description && <span>Lecture Description is required**</span>
        }
      </div>
     {
        stage!=="view" && <button
        disabled={loading}
        type='submit'
        className="cursor-pointer mt-6 ml-auto flex flex-row items-center rounded-md py-2 px-5 font-semibold text-richblack-900 bg-yellow-50"
      >
       {
         stage==="edit" && loading ? "Saving Changes" : stage==="edit" ? "Save Changes" : stage=="add" && loading ? "Saving..." : "Save"
       }
      </button>
     }
     </form>

   </div>
  </div>
  )
}

export default SubSectionModal