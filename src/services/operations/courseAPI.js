import apiConnector from "../apiConnector";
import { courseEndpoints, profileEndpoints } from "../api";
import {toast} from 'react-hot-toast'
export async function addCourseDetails(formData,token)
{
    let result = null
  const toastId = toast.loading("Loading...")
    try {
        const response =await apiConnector("POST",courseEndpoints.CREATE_COURSE_API,formData,{"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`})
        console.log("CREATE COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
          throw new Error("Could Not Add Course Details")
        }
        toast.success("Course Details Added Successfully")
        result = response?.data?.data

    } catch (error) {
        console.log("CREATE COURSE API ERROR............", error)
    toast.error(error.message)  
    }
    toast.dismiss(toastId)
    return result
}
export async function editCourseDetails(formData,token)
{
    let result = null
  const toastId = toast.loading("Loading...")
    try {
        const response =await apiConnector("POST",courseEndpoints.EDIT_COURSE_API,formData,{"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`})
        console.log("EdIT COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
          throw new Error("Could Not Edit Course Details")
        }
        toast.success("Course Details Edited Successfully")
        result = response?.data?.data

    } catch (error) {
        console.log("EDIT COURSE API ERROR............", error)
    toast.error(error.message)  
    }
    toast.dismiss(toastId)
    return result
}

export async function getCourseDetails(id)
{
  
    let result = null
  const toastId = toast.loading("Loading...")
    try {
      console.log(id)
        const response =await apiConnector("POST",courseEndpoints.COURSE_DETAILS_API,{id :id})
        console.log("GET COURSE DETAILS API RESPONSE............", response)
        if (!response?.data?.success) {
          throw new Error("Could Not Get Course Details")
        }
        toast.success("Course Details Fetched Successfully")
        result = response?.data?.courseDetails

    } catch (error) {
        console.log("GET COURSE DETAILS API ERROR............", error)
    toast.error(error.message)  
    }
    toast.dismiss(toastId)
    return result
}


export async function deleteCourse(data,token)
{
    let result = null
  const toastId = toast.loading("Loading...")
    try {
        const response =await apiConnector("DELETE",courseEndpoints.DELETE_COURSE_API,data,{ Authorization: `Bearer ${token}`})
        console.log("DELETE COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
          throw new Error("Could Not Delete Course ")
        }
        toast.success("Course Deleted Successfully")
        result = response?.data?.success

    } catch (error) {
        console.log("DELETE COURSE API ERROR............", error)
    toast.error(error.message)  
    }
    toast.dismiss(toastId)
    return result
}


export async function createSection(data,token)
{
  let result=null
  const toastId = toast.loading("Loading...")
  try {
    const response =await apiConnector("POST",courseEndpoints.CREATE_SECTION_API,data,{ Authorization: `Bearer ${token}`})
    console.log("CREATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could not create section")
    }
    toast.success("Section created Successfully")
  
    result= response.data.updatedCourseDetails 
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error)
    toast.error(error.message)  
  }
  toast.dismiss(toastId)
  return result
}

export async function updateSection(data,token)
{
  let result=null
  const toastId = toast.loading("Loading...")
  try {
    const response =await apiConnector("POST",courseEndpoints.UPDATE_SECTION_API,data,{ Authorization: `Bearer ${token}`})
    console.log("UPDATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could not create section")
    }
    toast.success("Section updated Successfully")
  
    result= response.data.updatedSection 
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error)
    toast.error(error.message)  
  }
  toast.dismiss(toastId)
  return result
}
export async function deleteSection(data,token)
{
  let result=null
  const toastId = toast.loading("Loading...")
  try {
    const response =await apiConnector("DELETE",courseEndpoints.DELETE_SECTION_API,data,{ Authorization: `Bearer ${token}`})
    console.log("DELETE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could not delete section")
    }
    toast.success("Section deleted Successfully") 
    result=response.data.updatedCourseDetails
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export async function createSubSection(formData,token)
{
  let result=null
  const toastId = toast.loading("Loading...")
  try {
    const response =await apiConnector("POST",courseEndpoints.CREATE_SUBSECTION_API,formData,{"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`})
    console.log("CREATE SUBSECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could not create subsection")
    }
    toast.success("Sub Section created Successfully")
    result= response.data.updatedSection
  } catch (error) {
    console.log("CREATE SUBSECTION API ERROR............", error)
    toast.error(error.message)  
  }
  toast.dismiss(toastId)
  return result
}

export async function editSubSection(formData,token)
{
  let result=null
  const toastId = toast.loading("Loading...")
  try {
    const response =await apiConnector("POST",courseEndpoints.UPDATE_SUBSECTION_API,formData,{"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`})
    console.log("UPDATE SUBSECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could not update  subsection")
    }
    toast.success("Sub Section Updated Successfully")
    result= response.data.updatedSection
  } catch (error) {
    console.log("UPDATE SUBSECTION API ERROR............", error)
    toast.error(error.message)  
  }
  toast.dismiss(toastId)
  return result
}


export async function deleteSubSection(data,token)
{
  let result=null
  const toastId = toast.loading("Loading...")
  try {
    const response =await apiConnector("DELETE",courseEndpoints.DELETE_SUBSECTION_API,data,{ Authorization: `Bearer ${token}`})
    console.log("DELETE SUBSECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could not delete Subsection")
    }
    toast.success("Subsection deleted Successfully") 
    result=response.data.updatedSection
  } catch (error) {
    console.log("DELETE SUBSECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export async function getAllInstructorCourses(token)
{
  let result =null
  const toastId=toast.loading("Loading...")
  try {
    const response =await apiConnector("GET",courseEndpoints.GET_ALL_INSTRUCTOR_COURSES_API,null,{ Authorization: `Bearer ${token}`})
    console.log("GET ALL INSTRUCTOR COURSES API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could not get all instructor courses")
    } 
    result=response.data.courses
  } catch (error) {
    console.log("GET ALL INSTUCTOR API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


export async function fetchFullCourseDetails(id,token)
{
  
    let result = null
  const toastId = toast.loading("Loading...")
    try {
      console.log(id)
        const response =await apiConnector("POST",courseEndpoints.GET_FULL_COURSE_DETAILS_AUTHENTICATED,{courseId : id},{Authorization : `Bearer ${token}`})
        console.log("GET FULL COURSE DETAILS API RESPONSE............", response)
        if (!response?.data?.success) {
          throw new Error("Could Not Get Full Course Details")
        }
        toast.success("Full Course Details Fetched Successfully")
        result=response.data.data
    } catch (error) {
        console.log("GET FULL COURSE DETAILS API ERROR............", error)
    toast.error(error.message)  
    }
    toast.dismiss(toastId)
    return result
}

export async function markLectureAsCompleted(subSectionId,courseId,token)
{
   let result = null
  const toastId = toast.loading("Loading...")
    try {
      const response =await apiConnector("POST",courseEndpoints.LECTURE_COMPLETION_API,{courseId : courseId,subSectionId : subSectionId},{Authorization : `Bearer ${token}`})
        console.log("LECTURE COMPLETION API RESPONSE............", response)
        if (!response?.data?.success) {
          throw new Error("Could Not able to mark lecture as completed")
        }
        toast.success("Lecture Marked As Completed")
        result=response.data.completedVideos
    } catch (error) {
        console.log("LECTURE COMPLETION API ERROR............", error)
    toast.error(error.message)  
    }
    toast.dismiss(toastId)
    return result
}


export async function createReview(body , token)
{
   let result = null
  const toastId = toast.loading("Loading...")
    try {
      const response =await apiConnector("POST",courseEndpoints.CREATE_RATING_API,body,{Authorization : `Bearer ${token}`})
        console.log("CREATE RATING API RESPONSE............", response)
        if (!response?.data?.success) {
          throw new Error("Could Not Create Rating")
        }
        toast.success("Rating Created Successfully")
        result=response.data.completedVideos
    } catch (error) {
        console.log("CREATE RATING API ERROR............", error)
    toast.error(error.message)  
    }
    toast.dismiss(toastId)
    return result
}

export async function addAiCourseDetails(data,token)
{
    let result = null
  const toastId = toast.loading("Loading...")
    try {
        const response =await apiConnector("POST",courseEndpoints.CREATE_AI_COURSE_API,data,{ Authorization: `Bearer ${token}`})
        console.log("CREATE AICOURSE  API RESPONSE............", response)
        if (!response?.data?.success) {
          throw new Error("Could Not Add Ai Course Details")
        }
        toast.success("Ai Course Details Added Successfully")
        result = response?.data?.data

    } catch (error) {
        console.log("CREATE AI COURSE API ERROR............", error)
    toast.error(error.message)  
    }
    toast.dismiss(toastId)
    return result
}

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try{
    const response = await apiConnector("GET", profileEndpoints.GET_INSTRUCTOR_DATA_API, null, 
    {
      Authorization: `Bearer ${token}`,
    })

    console.log("GET_INSTRUCTOR_API_RESPONSE", response);
    result = response?.data?.courses

  }
  catch(error) {
    console.log("GET_INSTRUCTOR_API ERROR", error);
    toast.error("Could not Get Instructor Data")
  }
  toast.dismiss(toastId);
  return result;
}

export const fetchInstructorCourses = async (token) => {
  let result = []
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector(
      "GET",
      courseEndpoints.GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("INSTRUCTOR COURSES API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses")
    }
    result = response?.data?.courses
  } catch (error) {
    console.log("INSTRUCTOR COURSES API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


