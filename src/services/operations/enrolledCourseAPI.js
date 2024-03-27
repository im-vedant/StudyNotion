import apiConnector from "../apiConnector";
import { profileEndpoints } from "../api";
import toast from "react-hot-toast";
export async function getUserEnrolledCourses(token)
{
    const toastId = toast.loading("Loading...")
    try {
       const response=await apiConnector("GET",profileEndpoints.GET_USER_ENROLLED_COURSES_API,null,{Authorization : `Bearer ${token}`})
       console.log("GET USER COURSES API RESPONSE............", response)
       if (!response?.data?.success) {
         throw new Error("Could Not get Enrolled Courses")
       }
       toast.success("Enrolled Courses Fetched Successfully")
      let result = response?.data 
      toast.dismiss(toastId)
      return result   
    } catch (error) {
        console.log("GET ENROLLED COURSES API ERROR............", error)
        toast.error(error.message) 
        toast.dismiss(toastId)
    }
   
}