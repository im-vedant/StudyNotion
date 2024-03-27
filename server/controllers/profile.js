const course = require('../models/courseModel')
const profile=require('../models/profileModel')
const user=require('../models/userModel')
const courseProgess=require('../models/courseProgressModel')
const fileupload=require('express-fileupload')
const {deleteImage}=require('../utils/deleteFromCloudinary')
require('dotenv').config()
const {uploadImageToCloudinary}=require('../utils/imageUploader')
async function updateProfile(req,res)
{
    try{
        console.log(req.body)
        const {dateOfBirth="",firstName, lastName, about="",phoneNo,gender,countryCode="+91",}=req.body
       const id=req.body.user._id
       console.log(id)
      
        const userDetails=await user.findById(id)
        const profileId=userDetails.additionalDetails
        const profileDetails=await profile.findById(profileId)
        profileDetails.dateOfBirth=dateOfBirth
        profileDetails.about=about
        profileDetails.gender=gender
        profileDetails.contactNumber=phoneNo
        profileDetails.countryCode=countryCode
        userDetails.firstName=firstName
        userDetails.lastName=lastName
        userDetails.image=`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        await profileDetails.save()
        await userDetails.save()
        await userDetails.populate('additionalDetails')
        return res.status(200).json({
            success : true,
            message :"profile updated successfully",
            userDetails,
            profileDetails
        })
        
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({
            success : false,
            message : "Unable to update profile , please try again",
            error :error
        })
    }
}

async function deleteAccount(req,res)
{
    try{
      let id=req.body.id 
      console.log(req.body)
      const userDetails=await user.findById(id)
      if(!userDetails){
        return res.json({
            success : false,
            message : "User not found"
        })
      }

      await profile.findByIdAndDelete(userDetails.additionalDetails)
      const allCourses=await course.updateMany({ studentsEnrolled : { $elemMatch: { $eq: user.id } }},{$pull : {studentsEnrolled : user.id}},{new : true})
       await user.findByIdAndDelete(userDetails._id)
       return res.json({
        success : true,
        message : "User deleted successfully"
    })
    }
    catch(error) 
    {
        return res.status(500).json({
            success : false,
            message : "Cannot delete user, try again"
        })
    }
}

async function getAllUserDetail(req,res)
{
    try{
        const id=req.user.id
        const userDetails=await user.findById(id).populate("additionalDetails").populate('courseProgess').exec()
        return res.status(200).json({
            success : true,
            message : "User data fetched successfully",
            userDetails
        })
    }
    catch(error)
    {
        console.log(error)
        return res.status(402).json({
            success : false,
            message : "Error while fetching details"
        })
    }
}

async function updateProfileImage(req,res)
{
    try {
        const image=req.files.displayPicture
        const userDetails=await user.findById(req.user.id)
        if(!userDetails){
            return res.status(403).json({
                success : false,
                message : 'User not found'
            })
        }
        
        if(!userDetails.image.includes("dicebear"))
        {
           await deleteImage(userDetails.image)
        }
        const uploadDetails=await uploadImageToCloudinary(image,process.env.FOLDER_NAME)
        console.log(uploadDetails)
        userDetails.image=uploadDetails.secure_url
        await userDetails.save()
        await userDetails.populate("additionalDetails")
        return res.status(201).json({
            success : true,
            message : "Your profile image is successfully updated",
            userDetails
        })
    } catch (error) {
        console.log(error)
        return res.status(201).json({
            success : false,
            message : "Error while updating the image, please try again"
        }) 
    }
}

async function getEnrolledCourses(req,res)
{
    try {
        const id=req.user.id

        const userDetails=await user.findById(id).populate({
            path : "courses",
            populate : {
                path : "courseContent",
            }
        }).exec()
        if(!userDetails)
        {
            return res.status(501).json({
                message :"user not found",
                success : false
            })
        }
        const courses=userDetails.courses
        const completedVideos=await courseProgess.find({userId : id})

        return res.status(200).json({
            message :' Enrolled Courses fetched successfully',
            success : true,
            courses,
            completedVideos: completedVideos.flatMap(item=>item.completedVideos)
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message :"Error while fetching enrolled courses",
            success : false,
            error
        })
    }
}

async function getInstructorDashboard(req,res)
{
    try{
        const courseDetails = await course.find({ instructor: req.user.id })

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length
            const total = course.sold * course.price
            const courseDataWithStats = {
              _id: course._id,
              courseName: course.courseName,
              courseDescription: course.courseDescription,
              totalStudentsEnrolled,
              total,
            }
            return courseDataWithStats
          })
    res.status(200).json({ success : true,  courses: courseData })
    }catch(error)
    {
        console.log(error)
        res.status(500).json({
            success : false,
            message : "Error while fetching instructor statistics"
        })
    }
}
module.exports={getAllUserDetail,deleteAccount,updateProfile,updateProfileImage,getEnrolledCourses,getInstructorDashboard}