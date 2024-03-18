const express=require('express')
const router=express.Router()
const {auth, isInstructor}=require('../middlewares/auth')
const {getAllUserDetail,deleteAccount,updateProfile, updateProfileImage,getEnrolledCourses,getInstructorDashboard}=require('../controllers/profile')

router.get('/getEnrolledCourses',auth,getEnrolledCourses)
router.delete('/deleteProfile',auth,deleteAccount)
router.put('/updateProfile',auth,updateProfile)
router.get('/getUserDetails',auth,getAllUserDetail)
router.put('/updateDisplayPicture',auth, updateProfileImage)
router.get("/instructorDashboard", auth, isInstructor, getInstructorDashboard)

module.exports=router
