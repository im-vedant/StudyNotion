import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdNavigateNext } from "react-icons/md";
import { useForm } from "react-hook-form";
import { FiPlusCircle } from "react-icons/fi";
import { toast } from "react-hot-toast";
import NestedView from "./NestedView";
import { createSection ,updateSection} from "../../../../../services/operations/courseAPI";
import { setStep, setEditCourse, setCourse } from "../../../../../slices/courseSlice";
const CourseBuilder = () => {
  const dispatch = useDispatch();
  const { course } = useSelector((store) => store.course);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const {token}=useSelector((store)=>store.auth)
  const [editSection, setEditSection] = useState(null);
  const [loading,setLoading]=useState(false)
  async function onSubmit(){
    console.log(editSection)
    let data=getValues()
    let result;
    if(editSection)
    {
      result =await updateSection({sectionName : data.sectionName,sectionId : editSection,courseId : course._id},token)
      let newCourseContent=course.courseContent.map((data)=>{
        if(data._id===result._id)
        return result
      return data
      })
      let newCourse={...course,courseContent : newCourseContent}
     
      if(result)
      result=newCourse
    }
    else
    {
      result =await createSection({sectionName : data.sectionName, courseId: course._id},token)
      console.log(result)
    }
    if(result)
    {
      dispatch(setCourse(result))
      setEditSection(null)
      setValue('sectionName',"")
    }
  }
  const handleChangeEditSection=(sectionId,sectionName)=>{
    if(editSection===sectionId)
    {
      setEditSection(null)
      setValue('sectionName','')
      return ;
    }
    else
    {
      setEditSection(sectionId)
      setValue('sectionName',sectionName)
    }
    
  }
  function handleNextStep()
  {
    if (course.courseContent.length === 0) {
      toast.error("Please add at least one Section");
      return;
    }
    if (
      course.courseContent.some((item) => {
        return item.subSection.length === 0;
      })
    ) {
      toast.error("Please add at least one lecture in each section");
      return;
    }
    console.log("click")
    dispatch(setStep(3));
  }
  function handleClick(e)
  {
    e.preventDefault()
    onSubmit()
  }
  return (
    <div className="p-6 border rounded-lg border-richblack-700 bg-richblack-800">
      <h1 className="mb-[26px] text-[24px] text-richblack-5 font-semibold ">
        Course Builder
      </h1>
      <form>
        <div>
          <p className="text-richblack-5 mb-[6px] text-[14px] ">
            Section Name
            <sup className="text-pink-200">*</sup>
          </p>
          <input
            type="text"
            placeholder="Add a section to build your course"
            style={{
              boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
            }}
            {...register("sectionName", { required: true })}
            className="rounded-lg w-full text-richblack-200 p-3 focus:outline-none bg-richblack-700 "
          />
          {errors.sectionName && <span>Section Name is required**</span>}
        </div>
        <div className="flex flex-row space-x-3 mt-5">
          <button onClick={handleClick} className="cursor-pointer flex flex-row items-center rounded-md py-2 px-5 font-medium text-yellow-50  border border-yellow-50">
            {editSection === null ? "Create Section" : "Edit Section Name"}
            <FiPlusCircle
              className="text-yellow-50 ml-2 font-medium"
              size={20}
            />
          </button>
          {editSection && (
            <button
              className="text-richblack-300"
              onClick={() => {
                setEditSection(null);
                setValue("sectionName", "");
              }}
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>
    {course.courseContent.length>0 &&  <NestedView  handleChangeEditSection={handleChangeEditSection} />}
      <div className="flex justify-end gap-x-2">
        <button
          onClick={() => {
            dispatch(setEditCourse(true));
            dispatch(setStep(1));
          }}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button>
        <button
          onClick={()=>handleNextStep()}
          className="cursor-pointer flex flex-row items-center rounded-md py-2 px-5 font-semibold text-richblack-900 bg-yellow-50"
        >
          Next
          <MdNavigateNext />
        </button>
      </div>
    </div>
  );
};

export default CourseBuilder;
