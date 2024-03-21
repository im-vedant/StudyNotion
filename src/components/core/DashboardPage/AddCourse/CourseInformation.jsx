import React, { useRef, useState } from "react";
import Spinner from '../../../../utils/Spinner'
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { useEffect } from "react";
import apiConnector from "../../../../services/apiConnector";
import { catalogData } from "../../../../services/api";
import { RxCross2 } from "react-icons/rx";
import { FiUploadCloud } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-hot-toast'
import { setStep,setCourse } from "../../../../slices/courseSlice";
import { MdNavigateNext } from "react-icons/md"
import { addCourseDetails,editCourseDetails } from "../../../../services/operations/courseAPI";
const CourseInformation = () => {
  const dispatch=useDispatch()
  const [isDataFetching, setIsDataFetching]=useState(false)
  const {editCourse ,course}=useSelector((store)=>store.course)
  const {token}=useSelector((store)=>store.auth)
  const {register,handleSubmit,reset,setValue,getValues,formState :{errors, isSubmitSuccessful}}=useForm()
  const [subLinks, setSubLinks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [values, setValues] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const [instructions,setInstructions]=useState([])
  const [inputInstruction,setInputInstruction]=useState("")
  const [loading,setLoading]=useState(false)
  let ref = useRef(null);
  function handleRemoveInstruction(index)
  {
    const newInstructions = [...instructions];
    newInstructions.splice(index, 1);
    setInstructions(newInstructions);
  }
  function addInstructions(e)
  {
    e.preventDefault()
    if (inputInstruction.trim() !== "") {
      setInstructions([...instructions, inputInstruction.trim()]);
      setInputInstruction("");
    }

  }
  function handleClick(e) {
    e.preventDefault();
    if (ref.current) ref.current.click();
  }
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  }
  function previewFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  }
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      if (inputValue.trim() !== "") {
        setValues([...values, inputValue.trim()]);
        setValue('tag',[...values,inputValue.trim()])
        setInputValue("");
      }
    }
  };

  const handleRemoveValue = (index) => {
    const newValues = [...values];
    newValues.splice(index, 1);
    setValues(newValues);
  };
  async function getCatalog() {
    
    setIsDataFetching(true)
    try {
      const result = await apiConnector("GET", catalogData.CATEGORIES_API);
      setSubLinks(result.data.allCategory);
      console.log(result.data.allCategory)
    } catch (error) {
      console.log("Could not fetch the category list");
    }
    if(editCourse)
    {
      setValue('courseTitle',course.courseName)
      setValue('courseDescription',course.courseDescription)
      setValue('price',course.price)
      setValue('benefits',course.WhatWillYouLearn)
      setValue('category',course?.category?._id) 
      console.log(course.category._id)
      setValues(course.tag)
      setInstructions(course.instructions)
      setPreviewSource(course.thumbnail)
    }
    setIsDataFetching(false)
   
  }

  useEffect( () => {
    getCatalog()
    
  }, []);
  const isFormUpdated = () => {
    const currentValues = getValues()
    console.log("changes after editing form values:", currentValues)
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseDescription !== course.courseDescription ||
      currentValues.price !== course.price ||
      values.toString() !== course.tag.toString() ||
      course.WhatWillYouLearn.includes(currentValues.benefits)!==currentValues.benefits.includes(course.WhatWillYouLearn) ||
      currentValues.category !== course.category?._id ||
      instructions.toString() !==
        course.instructions.toString() ||
      previewSource !== course.thumbnail
    ) {
      return true
    }
    return false
  }

 async function onSubmit(data){
  if(!editCourse)
  {
    const formData=new FormData()
    formData.append('courseName',data.courseTitle)
    formData.append('courseDescription',data.courseDescription)
    formData.append('price',data.price)
    formData.append('categoryId',data.category)
    formData.append('tag',JSON.stringify(values))
    formData.append('thumbnail',imageFile)
    formData.append('WhatWillYouLearn',data.benefits)
    formData.append('instructions',JSON.stringify(instructions))
    formData.append('status','Draft')
  setLoading(true)
    const response=await addCourseDetails(formData, token)
    if(response)
    {
      dispatch(setStep(2))
      dispatch(setCourse(response))
    }
    setLoading(false)
    return ;
  }
  else{
    if(isFormUpdated())
    {
      const currentValues = getValues()
      let formData = new FormData()
      // console.log(data)
      formData.append("courseId", course._id)
      if (currentValues.courseTitle !== course.courseName) {
        formData.append("courseName", data.courseTitle)
      }
      if (currentValues.courseDescription !== course.courseDescription) {
        formData.append("courseDescription", data.courseDescription)
      }
      if (currentValues.price !== course.price) {
        formData.append("price", data.price)
      }
      if (values.toString() !== course.tag.toString()) {
        formData.append("tag", JSON.stringify(values))
      }
      if (currentValues.benefits !== course.WhatYouWillLearn) {
        formData.append("WhatYouWillLearn", data.benefits)
      }
      if (currentValues.category!== course.category?._id) {
        formData.append("categoryId", data.courseCategory)
      }
      if (
        instructions.toString() !==
        course.instructions.toString()
      ) {
        formData.append(
          "instructions",
          JSON.stringify(instructions)
        )
      }
      if (previewSource !== course.thumbnail) {
        formData.append("thumbnail", imageFile)
      }
      setLoading(true)
      const result = await editCourseDetails(formData, token)
      setLoading(false)
      if (result) {
        dispatch(setStep(2))
        dispatch(setCourse({...course, ...result}))
      }
    } else {
      toast.error("No changes made to the form")
    }
    return
    }
  }
  if(isDataFetching)
  return <div className="flex justify-center items-center mt-4">
    <Spinner size={70}/>
  </div>
  return (
    <form onKeyDown={(e)=>{
      if(e.key==="Enter")
      e.preventDefault()}} onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col space-y-[26px] rounded-lg border border-solid border-richblack-700 bg-richblack-800">
      <div>
        <p className="text-richblack-5 mb-[6px] text-[14px] ">
          Course Title <sup className="text-pink-200">*</sup>
        </p>
        <input
          type="text"
          placeholder="Enter Course Title"
          style={{
            boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
          }}
          {...register('courseTitle',{required : true})}
          className="rounded-lg w-full text-richblack-200 p-3 focus:outline-none bg-richblack-700 "
        />
         {
          errors.courseTitle && <span>Course Title is required**</span>
        }
      </div>
      <div>
        <p className="text-richblack-5 mb-[6px] text-[14px] ">
          Course Short Description <sup className="text-pink-200">*</sup>
        </p>
        <textarea
        {...register('courseDescription',{required : true})}
          placeholder="Enter Description"
          style={{
            boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
          }}
          className="rounded-lg w-full min-h-[150px] text-richblack-200 p-3 focus:outline-none bg-richblack-700 "
        />
         {
          errors.courseDescription && <span>Course Description is required**</span>
        }
      </div>
      <div className="relative">
        <p className="text-richblack-5 mb-[6px] text-[14px]">
          {" "}
          Price <sup className="text-pink-200">*</sup>
        </p>
        <HiOutlineCurrencyRupee
          size={22}
          className="absolute top-[40px] left-3 text-richblack-200"
        />
        <input
        {...register('price')}
          type="number"
          placeholder="Enter Price"
          style={{
            boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
          }}
          className="rounded-lg pl-10 w-full text-richblack-200 p-3 focus:outline-none bg-richblack-700 "
        />
        {
          errors.price && <span>Price is required**</span>
        }
      </div>
      <div>
        <p className="text-richblack-5 mb-[6px] text-[14px] ">
          Category <sup className="text-pink-200">*</sup>
        </p>
        <select
          style={{
            boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
          }}
          {...register('category',{required : true})}
          className="rounded-lg w-full text-richblack-200 p-3 focus:outline-none bg-richblack-700 "
        >
          <option value="" disabled selected>
            Choose a Category
          </option>
          {subLinks.length > 0 ? (
            subLinks.map((item, index) => {
              return (
                <option
                  className="rounded-lg w-full text-richblack-200 p-3 focus:outline-none bg-richblack-700"
                  key={index}
                  value={item._id}
                >
                  {item.name}
                </option>
              );
            })
          ) : (
            <div></div>
          )}
        </select>
        {
          errors.category && <span>Course category is required**</span>
        }
      </div>
      <div>
        <p className="text-richblack-5 mb-[6px] text-[14px] ">
          Tags <sup className="text-pink-200">*</sup>
        </p>
        <input
          style={{
            boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
          }}
          className="rounded-lg w-full text-richblack-200 p-3 focus:outline-none bg-richblack-700 "
          type="text"
          value={inputValue}
          id="tag"
          name="tag"
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Add tags and press Enter"
        />
        <div className="flex flex-row flex-wrap gap-3">
          {values.map((value, index) => (
            <div className="px-3 mt-2 bg-yellow-200 text-richblack-5 py-1 rounded-lg flex flex-row justify-center space-x-1 items-center">
              <span key={index}>{value}</span>
              <button
                onClick={() => handleRemoveValue(index)}
                className="flex justify-center items-center"
              >
                <RxCross2 size={16} />
              </button>
            </div>
          ))}
        </div>
           {
            errors.tag && <span>Tag is required**</span>
          }
        
      </div>
      <div>
        <p className="text-richblack-5 mb-[6px] text-[14px] ">
          Course Thumbnail <sup className="text-pink-200">*</sup>
        </p>
        <input
          type="file"
          ref={ref}
          id="courseImage"
          name="courseImage"
          onChange={handleFileChange}
          accept="image/png, image/gif, image/jpeg"
          className="hidden w-0 h-0"
        />
          <div
        style={{
          boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
        }}
        className="rounded-lg   w-full text-richblack-200 py-8 px-3 focus:outline-none text-[12px] bg-richblack-700 "
      >
        {previewSource === null && (
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
        {previewSource !== null && (
          <div className="flex flex-col space-y-2 justify-center items-center">
            <img src={previewSource} className="w-full h-[300px] aspect-video object-contain" alt="" />
            <button
            className=" w-fit text-[16px] font-medium"
              onClick={(e) => {
                e.preventDefault()
                setImageFile(null);
                setPreviewSource(null);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      </div>
    
      <div>
        <p className="text-richblack-5 mb-[6px] text-[14px] ">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </p>
        <textarea
        {...register('benefits')}
          placeholder="Enter Benefits of the course"
          style={{
            boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
          }}
          className="rounded-lg w-full min-h-[150px] text-richblack-200 p-3 focus:outline-none bg-richblack-700 "
        />
         {errors.benefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>
      <div>
        <p className="text-richblack-5 mb-[6px] text-[14px] ">
          Requirements/Instructions <sup className="text-pink-200">*</sup>
        </p>
        <input
          style={{
            boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
          }}
          className="rounded-lg w-full text-richblack-200 p-3 focus:outline-none bg-richblack-700 "
          type="text"
          value={inputInstruction}
          onChange={(event)=>setInputInstruction(event.target.value)}
          placeholder="Enter instructions"
          id="instructions"
          name="instructions"
        />
        <button onClick={addInstructions} className="text-[16px] font-bold text-yellow-50 mt-[10px]">Add</button>
        <div className="flex flex-col text-left">
          {instructions.map((value, index) => (
            <div className="text-richblack-5 rounded-lg flex flex-row  text-left space-x-3 ">
              <span key={index}>{value}</span>
              <button
                onClick={() => handleRemoveInstruction(index)}
                className="flex text-richblack-500 justify-center items-center"
              >
                clear
              </button>
            </div>
          ))}
        </div>
        {errors.instructions && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Instructions are required
          </span>
        )}
      </div>
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Without Saving
          </button>
        )}
        <button
        disabled={loading}
        type='submit'
        className="cursor-pointer flex flex-row items-center rounded-md py-2 px-5 font-semibold text-richblack-900 bg-yellow-50"
      >
        {!editCourse ? "Next" : "Save Changes"}
        <MdNavigateNext />
      </button>
          
      </div>
    </form>
  );
};

export default CourseInformation;
