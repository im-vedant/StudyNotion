import {setLoading,setSignUpData,setToken} from '../../slices/authSlice'
import { setUser } from '../../slices/profileSlice'
import apiConnector from '../apiConnector'
import { endpoints } from "../api"
import {toast} from 'react-hot-toast'
import { resetCart } from '../../slices/cartSlice'
const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints
export function sendOTP(email,navigate)
{
  return async (dispatch)=>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response=await apiConnector("POST",SENDOTP_API,{email})
      console.log("SENDOTP API RESPONSE............", response)
      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}
export function signUp(firstName,lastName,email,accountType,password, confirmPassword,otp,navigate)
{
  return async (dispatch)=>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response=await apiConnector("POST",SIGNUP_API,{firstName,lastName,email,accountType,password,confirmPassword,otp})
      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}
export function login(email,password,navigate){
  return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response=await apiConnector("POST",LOGIN_API,{email,password})
      console.log("LOGIN API RESPONSE.....", response)
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      dispatch(setToken(response.data.token))
      const userImage = response.data?.user?.image
      ? response.data.user.image
      : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
    dispatch(setUser({ ...response.data.user, image: userImage }))
    localStorage.setItem("token", JSON.stringify(response.data.token))
    localStorage.setItem("user", JSON.stringify(response.data.user))
    navigate("/dashboard/my-profile")
      toast.success("Login Successful")
      navigate('/dashboard/my-profile')
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}
export function logout(navigate)
{
  return async(dispatch)=>{
    try {
     dispatch( setToken(null))
     dispatch(setUser(null))
     localStorage.removeItem('token')
     localStorage.removeItem('user')
     dispatch(resetCart())
      toast.success('Logged Out')
      navigate('/')
    } catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to logout");
    }
  }
}
export function passwordReset(password,confirmPassword,token,setIsPasswordChanged)
{
    return async (dispatch)=>{
        dispatch(setLoading(true))
        try {
            const response =await apiConnector("POST",RESETPASSWORD_API,{password,confirmPassword,token})
            console.log("RESET Password RESPONSE ... ", response);
      if(!response.data.success) {
        throw new Error(response.data.message);
      }
      setIsPasswordChanged(true)
      toast.success("Password has been reset successfully");
        } catch (error) {
            console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
        }
        dispatch(setLoading(false))
    }
}
export function getPasswordResetToken(email,setEmailSent)
{
    return async (dispatch)=>
    {
        dispatch(setLoading(true))
        try {
            const response =await apiConnector("POST",RESETPASSTOKEN_API,{email })
            console.log("RESET PASSWORD TOKEN RESPONSE....", response);
            if(!response.data.success) {
                throw new Error(response.data.message);
              }
              toast.success("Reset Email Sent");
              setEmailSent(true);
        
        } catch (error) {
            console.log("RESET PASSWORD TOKEN Error", error);
            toast.error("Failed to send email for resetting password");
        }
        dispatch(setLoading(false))
        
    }
}