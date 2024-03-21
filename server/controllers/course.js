const course = require("../models/courseModel");
const category = require("../models/categoryModel");
const user = require("../models/userModel");
const section=require('../models/sectionModel')
const subSection=require('../models/subSectionModel')
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { deleteImage } = require("../utils/deleteFromCloudinary");
const courseProgress=require('../models/courseProgressModel');
const axios = require("axios");
const youtube_transcript=require('youtube-transcript')
const model=require('../utils/genai');
const { default: mongoose } = require("mongoose");
const output= { summary: "summary of the transcript" }
async function createCourse(req, res) {
  try {
    let {
      courseName,
      courseDescription,
      status,
      WhatWillYouLearn,
      price,
      tag,
      categoryId,
      instructions,
    } = req.body;
    const thumbnail = req.files.thumbnail;
    tag = JSON.parse(tag);
    instructions = JSON.parse(instructions);
    if (
      !courseName ||
      !courseDescription ||
      !status ||
      !WhatWillYouLearn ||
      !price ||
      !tag ||
      !thumbnail ||
      !instructions ||
      !categoryId
    ) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }
    const userId = req.user.id;
    const instructorDetails = await user.findById(userId);
    console.log("Instructor Description", instructorDetails);
    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor details not found",
      });
    }
    const categoryDetails = await category.findById(categoryId);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "category details not found",
      });
    }
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    const newCourse = await course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      status: status,
      WhatWillYouLearn: WhatWillYouLearn,
      price,
      tag: tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      instructions: instructions,
    });
    await user.findByIdAndUpdate(
      instructorDetails._id,
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );
    await category.findByIdAndUpdate(
      categoryDetails._id,
      {
        $push: { course: newCourse._id },
      },
      { new: true }
    );
    await newCourse.populate("category");
    return res.json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "course cannot be created, please try again",
    });
  }
}
async function showAllCourses(req, res) {
  try {
    const allCourses = await course.find({});
    return res.json({
      success: true,
      message: "Course data fetched successfully",
      data: allCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Cannot fetch course data, please try again",
    });
  }
}

async function getCourseDetails(req, res) {
  try {
    let {id}=req.body
    const courseDetails = await course
      .findById(id)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    if (!courseDetails)
      return res.status(500).json({
        success: false,
        message: "No course found",
        id,
      });
    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      courseDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Cannot fetch course data, please try again",
    });
  }
}

async function editCourse(req, res) {
  try {
    const { courseId } = req.body;
    const updates = req.body;
    const userId = req.user.id;
    const Course = await course.findById(courseId);
    if (!Course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const instructorDetails = await user.findById(userId);
    console.log("Instructor Description", instructorDetails);
    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor details not found",
      });
    }
    for (const key in updates) {
        if (key === "tag" || key === "instructions" ) {
          Course[key] = JSON.parse(updates[key]);
        } else {
          Course[key] = updates[key];
        }
      }
      console.log(req.files)
    if (req.files) {
      console.log("thumbnail update");
      const thumbnail = req.files.thumbnail;
        await deleteImage(Course.thumbnail);
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
        console.log(thumbnailImage)
      Course.thumbnail = thumbnailImage.secure_url;
    }
    await Course.save();
    const updatedCourse = await course
      .findOne({
        _id: courseId,
      })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    return res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "course cannot be created, please try again",
    });
  }
}

async function getAllInstructorCourses(req,res)
{
  try{
    let userId=req.user.id
    console.log(userId)
    let courses=await course.find({instructor : userId}).sort({createdAt : -1})
   return  res.status(200).json({
      success : true,
      message : "Instructor courses fetched Successfully",
      courses
    })
  }
  catch(error)
  {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}

async function deleteCourse(req,res)
{
  try{
    let {courseId,userId}=req.body 
    const Course = await course.findById(courseId)
    if (!Course) {
      return res.status(404).json({ message: "Course not found" })
    }
   let studentsEnrolled=Course.studentsEnrolled
   for( let student in studentsEnrolled)
   {
    const updatedStudentDetails=await user.findByIdAndUpdate(studentsEnrolled[student],{ $pull:{courses : courseId}})
   }
   let courseSections=await Course.courseContent
   if(courseSections.length>0)
   {
   
   for(let x in courseSections )
   {
    let sectionDetails=await section.findById(courseSections[x])
    if(sectionDetails)
    {
      let subSections=sectionDetails.subSection
      for(let y in subSections)
      {
        let subSectionDetails=await subSection.findById(subSections[y])
        await deleteImage(subSectionDetails.videoUrl,'video')
        await subSection.findByIdAndDelete(subSections[y])
      }
    }
    await section.findByIdAndDelete(courseSections[x])
   }
   }
   await deleteImage(Course.thumbnail)
   await course.findByIdAndDelete(courseId)
   await user.findByIdAndUpdate(userId ,{$pull :{courses : courseId}})
   return res.status(200).json({
    success: true,
    message: "Course deleted successfully",
   })
  }
  catch(error)
  {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}
async function getFullCourseDetails(req,res)
{
  try {
    const {courseId}=req.body
    const userId=req.user.id 
    const courseDetails=await course.findById(courseId).populate({
      path : "courseContent",
      populate : {
        path : "subSection"
      }
    })
    .populate({
		  path: "instructor",
		  populate: {
			path: "additionalDetails",
		  },
		})
		.populate("category")
		.populate("ratingAndReviews").exec()
    const courseProgressDetails=await courseProgress.findOne({userId : userId,courseId : courseId}).exec()
     
	  if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
      }    
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds;
      })
      })
    
     
    
      return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDurationInSeconds,
        completedVideos: courseProgressDetails?.completedVideos
        ? courseProgressDetails?.completedVideos
        : ["none"],
      },
      })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      })
  }
}

async function markLectureAsCompleted(req,res){
  try {
    const {courseId, subSectionId}=req.body 
    const userId=req.user.id
    const courseProgressDetails=await courseProgress.findOneAndUpdate({userId : userId, courseId : courseId},{$push : {completedVideos : subSectionId}},{new : true})
    if(!courseProgressDetails)
    {
      return res.status(400).json({
        success: false,
        message: `Could not find course progress}`,
      })
    }
    return res.status(200).json({
      success: true,
      completedVideos : courseProgressDetails.completedVideos
      })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: error.message,
      })
  }
}
async function createAiCourse(req, res) {
  try {
    const categoryId=new mongoose.Types.ObjectId('65f84bfd7efec197785edb25')
    let {
      courseName,
      courseDescription,
      WhatWillYouLearn,
      tag,
      instructions,
      thumbnail,
      units
    } = req.body;
    if (
      !courseName ||
      !courseDescription ||
      !WhatWillYouLearn ||
      !tag ||
      !thumbnail ||
      !instructions ||
      !units
    ) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }
    const userId = req.user.id;
    const instructorDetails = await user.findById(userId);
    console.log("Instructor Description", instructorDetails);
    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor details not found",
      });
    }
    const newCourse = await course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      status: "Draft",
      WhatWillYouLearn: WhatWillYouLearn,
      price : 0,
      tag: tag,
      thumbnail: thumbnail,
      instructions: instructions,
      category : categoryId
    });
    await user.findByIdAndUpdate(
      instructorDetails._id,
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );
    await category.findByIdAndUpdate(
      categoryId,
      {
        $push: { course: newCourse._id },
      },
      { new: true }
    );
   try{
    let promises = units.map((item)=>fetchSectionData(item.title,item.chapters))
    const allData=await Promise.all(promises)
    console.log(allData)
     promises= allData.map((item)=>{return { func : createAiSection, sectionName: item.sectionName, subSectionData : item.subSectionData }} )
    for (const {func, sectionName, subSectionData} of promises) {
      const response=await func(sectionName, newCourse._id, subSectionData);
    }
   }

   catch(error){
    console.log("Error while creating sections",error)
   }
    return res.json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "course cannot be created, please try again",
    });
  }
}
async function fetchSectionData(sectionName, chapters)
{
try {
  const promises= chapters.map((item)=>fetchSubSectionData(item.chapter_title,item.youtube_search_query ))
  const response=await Promise.all(promises)
  return { sectionName : sectionName, subSectionData : response }
} catch (error) {
  console.log(error)
}

async function fetchSubSectionData ( title,youtube_search_query)
{
 try {
  let videoData=await getYoutubeUrl(youtube_search_query)
  let desc=await getDescription(videoData.id.videoId)
  console.log("Description ", desc)
  console.log("Videodata",videoData)
  return { title : title, description : desc,videoUrl: `https://www.youtube.com/embed/${videoData.id.videoId}`}
 } catch (error) {
  console.log(error)
 }
}

}
async function createAiSection(sectionName, courseId, subSectionData)
{
    try {
      console.log(sectionName, courseId, subSectionData)
        if(!sectionName || !courseId || !subSectionData)
        {
          console.log("Missing fields")
          return ;
        }
        const newSection=await section.create({sectionName})
        const updatedCourseDetails=await course.findByIdAndUpdate(courseId,{$push :{courseContent : newSection._id }},{new: true}).populate({path : 'courseContent',populate : { path : 'subSection'}}).exec()  
        // const promises= chapters.map((item)=>createAiSubSection(newSection._id, item.chapter_title,item.youtube_search_query ))
        // const response=await Promise.all(promises)
        const promises= subSectionData.map((item)=>{return { func : createAiSubSection, id :newSection._id, title : item.title, description : item.description , videoUrl : item.videoUrl}}
        )
        for (const {func, id, title, description , videoUrl} of promises) {
          const response=await func(id, title, description, videoUrl)
        }  
    } catch (error) {
        console.log(error)
    }
}
async function createAiSubSection(sectionId, title,description, videoUrl) {
  try {
      if (!sectionId || !title || ! description || ! videoUrl) {
              console.log("all fields are required")
              return ;
      }
      let subSectionDetails = await subSection.create({
          title: title, description: description, videoUrl: videoUrl ,timeDuration : 0
      })
      let updatedSection = await section.findOneAndUpdate({_id : sectionId}, { $push: { subSection: subSectionDetails._id } }, { new: true }).populate({path : 'subSection'}).exec()
  } catch (error) {
      console.log(error)
  }
}

async function getYoutubeUrl(searchTerm) {
  
  let result = null;
  try {
    const data = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=AIzaSyBnMQaJ7STJoYU8s0WzZ-d4FkkA4okN5SE&q=${searchTerm}&type=video&videoDuration=medium&videoEmbeddable=true&maxResults=1`
    );
    console.log("Youtube data" ,data.data)
    if (data.data) {
      result = data.data.items[0];
    }
  } catch (error) {
    console.log(error);
    return error
  }
  return result;
}

async function getDescription(videoId)
{
  try {
    let transcript_arr = await youtube_transcript.YoutubeTranscript.fetchTranscript(videoId, {
      lang: "en",
      country: "EN",
    });
    let transcript = "";
    for (let t of transcript_arr) {
      transcript += t.text + " ";
    }
    transcript= transcript.replaceAll("\n", "")
    let summary = await getSummary(transcript)
    return summary?.summary
  } catch (error) {
    console.log(error)
    return "Description";
  }
}
function isValidJSON(jsonString) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
}
async function getSummary(transcript)
{ 
  let summary={ summary : null}
  try{
    let validJson;
    do {
      let result =
        await model.generateContent(`You are an AI capable of summarising a youtube transcript. Summarise in 250 words or less and do not talk of the sponsors or anything unrelated to the main topic, also do not introduce what the summary is about ${transcript}\n
      You are to output an object in the following json format:\n
       ${JSON.stringify(output)}
      \nDo not put quotation marks or escape character \\ in the output fields.\n
      Generate a JSON object while preserving the keys provided without any modifications.`);
      const response = await result.response;
      validJson = isValidJSON(response.text());
      if (validJson) {
        summary=JSON.parse(response.text())
       console.log("Youtube Summary ",JSON.parse(response.text()))
      }
    } while (!validJson);
    return summary
  }
  catch(error){
    console.log(error)
    return summary
  }
}


module.exports = {createAiCourse, createCourse, getCourseDetails, showAllCourses,markLectureAsCompleted, editCourse,getAllInstructorCourses,deleteCourse,getFullCourseDetails };
