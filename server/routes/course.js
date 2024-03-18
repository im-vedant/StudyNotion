const express=require('express')
const router=express.Router()
const { getFullCourseDetails,createCourse,getCourseDetails,showAllCourses,editCourse, getAllInstructorCourses,deleteCourse, markLectureAsCompleted, createAiCourse}=require('../controllers/course')
const {showAllCategories,createCategory,categoryPageDetails,addCourseToCategory}=require('../controllers/category')
const {updateSection,createSection,deleteSection}=require('../controllers/section')
const {updateSubSection,createSubSection,deleteSubSection}=require('../controllers/subSection')
const {auth, isAdmin, isInstructor, isStudent}=require('../middlewares/auth')
const { createRating, getAverageRating, getAllRating } = require('../controllers/ratingAndReview')

router.post('/createCourse', auth, isInstructor,createCourse)
router.post('/editCourse',auth,isInstructor,editCourse)
router.delete('/deleteCourse',auth,isInstructor,deleteCourse)
router.post('/addSection',auth, isInstructor, createSection)
router.post('/updateSection', auth, isInstructor, updateSection)
router.delete('/deleteSection',auth, isInstructor,deleteSection)

router.post('/ai-course',auth, isInstructor,createAiCourse)


router.post('/updateSubSection',auth, isInstructor, updateSubSection)
router.delete('/deleteSubSection', auth, isInstructor,deleteSubSection)
router.post('/addSubSection',auth, isInstructor,createSubSection)

router.get('/getAllCourses',showAllCourses)
router.post('/getCourseDetails',getCourseDetails)
router.post('/getFullCourseDetails',auth,isStudent,getFullCourseDetails)
router.get('/getInstructorCourses',auth,isInstructor,getAllInstructorCourses)
router.post('/updateCourseProgress',auth,isStudent,markLectureAsCompleted)
router.post('/createCategory',auth, isAdmin, createCategory)

router.get('/showAllCategories', showAllCategories)
router.post('/getCategoryPageDetails',categoryPageDetails)

router.post('/addCourseToCategory',auth, isInstructor, addCourseToCategory)

router.post('/createRating', auth, isStudent, createRating)
router.get('/getAverageRating',getAverageRating)
router.get('/getReviews',getAllRating)
module.exports=router;

