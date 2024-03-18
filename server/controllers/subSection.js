const subSection = require('../models/subSectionModel')
const section = require('../models/sectionModel')
const mongoose=require('mongoose')
const {uploadImageToCloudinary} = require('../utils/imageUploader')
const { deleteImage } = require('../utils/deleteFromCloudinary')
require('dotenv').config()
async function createSubSection(req, res) {
    try {
        const { sectionId, title, description } = req.body
        console.log(sectionId)
        const video = req.files.videoFile
        if (!sectionId || !title || !description || !video) {
            return res.json({
                success: false,
                message: "All fields are required"
            })
        }
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)
        console.log(uploadDetails)
        let subSectionDetails = await subSection.create({
            title: title, description: description, videoUrl: uploadDetails.secure_url,timeDuration : uploadDetails.duration
        })
        let updatedSection = await section.findOneAndUpdate({_id : sectionId}, { $push: { subSection: subSectionDetails._id } }, { new: true }).populate({path : 'subSection'}).exec()
        return res.status(200).json({
            success: true,
            message: "Sub section created successfully",
            subSectionDetails,
            updatedSection
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "Unable to create sub section , please try again"
        })
    }
}
async function updateSubSection(req, res) {
    try {
        const dataToBeUpdated = req.body
        const { subSectionId ,sectionId} = req.body
        const video = (req.files) ? req.files.videoData : null
        let uploadDetails
        if (video)
            uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)
        let updatedData = await subSection.findById(subSectionId)
        if (!updatedData) {
            return res.json({
                success: false,
                message: "Wrong sub section id"
            })
        }
        if (dataToBeUpdated.title)
            updatedData.title = dataToBeUpdated.title
        if (dataToBeUpdated.description)
            updatedData.description = dataToBeUpdated.description
            if (uploadDetails)
                updatedData.videoUrl = uploadDetails.secure_url
        await updatedData.save()
        const updatedSection=await section.findById(sectionId).populate({path : "subSection"}).exec()
        return res.status(200).json({
            success: true,
            message: "Sub section updated successfully",
            updatedData,
            updatedSection

        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "Unable to update sub section , please try again"
        })
    }
}
async function deleteSubSection(req, res) {
    try {
        const {sectionId,subSectionId}= req.body
        let subSectionDetails=await subSection.findById(subSectionId)
        await deleteImage(subSectionDetails.videoUrl,'video')
        let deletedData = await subSection.findByIdAndDelete(subSectionId)
        if(!deletedData)
        {
            return res.status(404).json({
                success : false,
                message : "Subsection not found"
            })
        }
        let updatedSection=await section.findByIdAndUpdate(sectionId, {$pull : {subSection : subSectionId}}, {new : true}).populate({path : "subSection"})
        if(!updatedSection)
        {
            return res.status(404).json({
                success : false,
                message : "Section not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Sub section deleted successfully",
            updatedSection
        })
    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "Unable to delete sub section , please try again"
        })
    }
}

module.exports={createSubSection,updateSubSection,deleteSubSection}