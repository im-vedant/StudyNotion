import { settingsEndpoints } from "../api";
import apiConnector from "../apiConnector";
import {toast} from 'react-hot-toast'
import { setUser } from "../../slices/profileSlice";
import { logout } from "./authAPI";
export function updateProfile(data,user,token)
{
    return async (dispatch)=>{
     const toastId = toast.loading("Loading...")
    try{
        const response=await apiConnector("PUT",settingsEndpoints.UPDATE_PROFILE_API,{...data, user},{ Authorization: `Bearer ${token}`})
        console.log("UPDATE_PROFILE_API API RESPONSE............", response)
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        const userImage = response.data.userDetails.image
        ? response.data.userDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.userDetails.firstName} ${response.data.userDetails.lastName}`
        response.data.userDetails.image=userImage
        localStorage.setItem("user", JSON.stringify(response.data.userDetails))
      dispatch(
        setUser({ ...response.data.userDetails, image: userImage })
      )
      toast.success("Profile Updated Successfully")
    }
    catch(error)
    {
        console.log("UPDATE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Update Profile")
    }
    toast.dismiss(toastId)
    }
}
export function deleteProfile(navigate,token,id)
{

    return async(dispatch)=>{
        const toastId=toast.loading("Loading...")
        try{
            const response=await apiConnector("DELETE",settingsEndpoints.DELETE_PROFILE_API,{id :id},{Authorization : `Bearer ${token}`})
            console.log("DELETE_PROFILE_API API RESPONSE............", response)
            if (!response.data.success) {
              throw new Error(response.data.message)
            }
            toast.success("Profile deleted successfully")
            dispatch(logout(navigate))
        }
        catch(error)
        {
            console.log("DELETE_PROFILE_API API ERROR............", error)
            toast.error("Could Not Delete Profile")
        }
        toast.dismiss(toastId)
    }
}
export async function updatePassword(email,data,token)
{
  const toastId = toast.loading("Loading...")
    try {
      const response=await apiConnector("POST",settingsEndpoints.CHANGE_PASSWORD_API,{email,...data},{Authorization :`Bearer ${token}`})
      console.log("UPDATE PASSWORD API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Password changed successfully")
    } catch (error) {
      console.log("UPDATE PASSWORD API ERROR............", error)
      toast.error("Password changed failed")
    }
    toast.dismiss(toastId)
}

export function updateDisplayPicture(token ,formData)
{
  return async(dispatch)=>{
    const toastId=toast.loading("Loading...")
    try{
      const response=await apiConnector("PUT",settingsEndpoints.UPDATE_DISPLAY_PICTURE_API,formData,{ "Content-Type": "multipart/form-data",Authorization :`Bearer ${token}`})
      console.log("UPDATE DISPLAY PICTURE API RESPONSE............", response)
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      localStorage.setItem('user',JSON.stringify(response.data.userDetails))
      dispatch(setUser(response.data.userDetails))
      toast.success("Profile image updated successfully")
    }catch(error)
    {
      console.log("UPDATE PASSWORD API ERROR............", error)
      toast.error("Profile image update failed")
    }
    toast.dismiss(toastId)
  }
}