const section=require('../models/sectionModel')
const course=require('../models/courseModel')
const subSection = require('../models/subSectionModel')
const { deleteImage } = require('../utils/deleteFromCloudinary')
async function createSection(req,res)
{
    try {
        let {sectionName, courseId}=req.body
        if(!sectionName || !courseId)
        {
            return res.json({
                success : false,
                message : "Missing properties"
            })
        }
        const newSection=await section.create({sectionName})
        const updatedCourseDetails=await course.findByIdAndUpdate(courseId,{$push :{courseContent : newSection._id }},{new: true}).populate({path : 'courseContent',populate : { path : 'subSection'}}).exec()
        return res.status(200).json({
            success : true,
            message :"Section created successfully",
            updatedCourseDetails
        })
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success : false,
            message : "Unable to create section , please try again"
        })
    }
}
async function updateSection(req,res)
{
    try {
        let {sectionName, sectionId} =req.body 
        if(!sectionName || !sectionId)
        {
            return res.json({
                success : false,
                message : "Missing properties"
            })
        }
        const updatedSection=await section.findByIdAndUpdate(sectionId, {sectionName: sectionName},{new : true}).populate({path :'subSection'}).exec()
        return res.status(200).json({
            success : true,
            message :"Section updated successfully",
            updatedSection
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success : false,
            message : "Unable to update section , please try again"
        })
    }
}

async function deleteSection(req,res)
{
    try {
        let {courseId,sectionId}=req.body
        if( !sectionId || !courseId)
        {
            return res.status(500).json({
                success : false,
                message : "Section id or course id is missing"
            })
        }
        const Section =await section.findById(sectionId)
        if(Section.subSection.length>0)
        {
            Section.subSection.forEach(async(subSectionId)=>{
                const subSectionDetails=await subSection.findById(subSectionId)
                await deleteImage(subSectionDetails?.videoUrl , 'video')
                await subSection.findByIdAndDelete(subSectionId)
            })
        }
        const deleteSection=await section.findByIdAndDelete(sectionId)
        if(!deleteSection)
        {
            return res.status(404).json({
                success : false,
                message : "Section not found",
            })
        }
        const updatedCourseDetails=await course.findByIdAndUpdate(courseId, {$pull :{courseContent : sectionId}},{new : true}).populate({path : 'courseContent',populate : { path : 'subSection'}}).exec()
        if(!updatedCourseDetails)
        {
            return res.status(404).json({
                success : false,
                message : "Course not found"
            })
        }

        return res.status(200).json({
            success : true,
            message :"Section deleted successfully",
            updatedCourseDetails

        })
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Unable to delete section , please try again"
        })
    }
}

module.exports={deleteSection,updateSection,createSection}