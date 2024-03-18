const ratingAndReviews = require('../models/ratingAndReviewModel')
const course = require('../models/courseModel')
const { default: mongoose } = require('mongoose')
async function createRating(req, res) {
    try {
        const userId = req.user.id
        const { rating, review, courseId } = req.body
        const courseDetail = await course.findOne({ _id: courseId, studentsEnrolled: { $elemMatch: { $eq: userId } } })
        if (!courseDetail)
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in the course"
            })
        //checking whether the student has already rated or not
        const ratingDetails = await ratingAndReviews.findOne({ user: userId, course: courseId })
        if (ratingDetails)
            return res.status(403).json({
                success: false,
                message: 'You have already given your feedback for this course'
            })
        const ratingReview = await ratingAndReviews.create({
            rating, review, course: courseId, user: userId
        })
        const updatedCourse = await course.findByIdAndUpdate(courseId, { $push: { ratingAndReviews: ratingReview._id } }, { new: true })
        console.log(updatedCourse)
        return res.status(200).json({
            success: true,
            message: "Rating and review created successfully"
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Could not create rating and review , please try again"
        })
    }
}

async function getAverageRating(req, res) {
    try {
        const { courseId } = req.body
        const avgRating = await ratingAndReviews.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId)
                }
            }, {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" }
                }
            }
        ])
        if (avgRating.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: avgRating[0].averageRating
            })
        }
        return res.status(200).json({
            success: true,
            averageRating: 0
        })
    }
    catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        })
    }
}

async function getAllRating(req, res) {
    try {
        const allRatings = await ratingAndReviews.find({}).populate({
            path: "user",
            select: "firstName lastName email image"
        }).populate({
            path: "course",
            select: "courseName"
        }).sort({ rating: -1 }).exec()
        return res.status(200).json({
            success: true,
            allRatings 
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err.message,
            success: false
        })
    }
}

module.exports={getAllRating,getAverageRating,createRating}
