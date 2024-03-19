import React, { useState } from "react";
import { model } from "../services/operations/genai";
import axios from "axios";
import { Button } from "@mui/material";
import { PiLightningDuotone } from "react-icons/pi";
import handShake from '../assets/Images/ai-robot-hand-shaking-human-hand.jpg'
import { IoIosInformationCircleOutline } from "react-icons/io";
import CircularProgress from "@mui/material/CircularProgress";
import { setCourseData } from "../slices/aicourseSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import SubSection from "../components/core/AiCoursePage/SubSection";
import { addAiCourseDetails } from "../services/operations/courseAPI";
import {useNavigate} from 'react-router-dom'
const output_format = {
  courseName: "title of the course same as given by the user",
  courseDescription: "Description of the course. Do not give array.",
  WhatWillYouLearn: "Benefits of the course. Do not give array.",
  instructions: "Give an array of instruction for the people who will buy the course.Give one instruction in one value",
  tag :"Give an array of tags for the course",
  units: [
    {
      title: "Introduction to Calculus",
      chapters: [
        {
          youtube_search_query: "Introduction to Calculus",
          chapter_title: "Chapter 1 : What is Calculus?",
        },
        {
          youtube_search_query: "History of Calculus",
          chapter_title: "Chapter 2 : The History of Calculus",
        },
      ],
    },
    {
      title: "Differentiation",
      chapters: [
        {
          youtube_search_query: "Differentiation basics",
          chapter_title: "Chapter 1 : Basics of Differentiation",
        },
      ],
    },
  ],
};

const image_output_format = {
  image_search_term: "App development",
};
const AiCourse = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
    const [loading,setLoading]=useState(false)
  const [input, setInput] = useState("");
  const {token}=useSelector((store)=>store.auth)
 const {courseData}=useSelector((store)=>store.aicourse)
  function isValidJSON(jsonString) {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  }
 

  async function createCourse(title) {
    let courseDetails
    setLoading(true)
    let validJson=false;
    do {
     try{
      let result =
      await model.generateContent(`You are an AI capable of curating course content, coming up with relevant chapter titles, and finding relevant youtube videos for each chapter. \n
    You are to output an array of objects in the following json format:\n
     ${JSON.stringify(output_format)}
    \nDo not put quotation marks or escape character \\ in the output fields.\n
    Generate a JSON object while preserving the keys provided without any modifications.\n
    It is your job to create a course about ${input}. The user has requested to create chapters for each of the units. Then, for each chapter, provide a detailed youtube search query that can be used to find an informative educational video for each chapter. Each query should give an educational informative course in youtube. Also give chapter number in each unit.`);
    const response = await result.response;
    validJson = isValidJSON(response.text());
    if (validJson) {
      courseDetails=JSON.parse(response.text())
     console.log(JSON.parse(response.text()))
    }
  }
    catch(error)
    {
      console.log(error)
    }
    } while (!validJson);
let imageUrl;
    do {
      let imageResult =
        await model.generateContent(`you are an AI capable of finding the most relevant image for a course \n
        You are to output in the following in json format:\n
        ${JSON.stringify(image_output_format)}
       \nDo not put quotation marks or escape character \\ in the output fields.\n
        Please provide a good image search term for the title of a course about ${input}. This search term will be fed into the unsplash API, so make sure it is a good search term that will return good results`);
      let imageResponse = await imageResult.response;
      console.log(imageResponse.text());
      validJson = isValidJSON(imageResponse.text());
      if (validJson) {
        const query = JSON.parse(imageResponse.text());
        console.log(query.image_search_term);
        const { data } = await axios.get(`
              https://api.unsplash.com/search/photos?per_page=1&query=${query.image_search_term}&client_id=${process.env.REACT_APP_UNPLASH_ACCESS_KEY}
     `);
     console.log(data)
       imageUrl=data.results[0].urls.regular
      }
    } while (!validJson);
    setLoading(false)
    dispatch(setCourseData({...courseDetails, thumbnail:imageUrl}))
  }
  async function generateCourse()
  {
    console.log(courseData)
    let result =await addAiCourseDetails(courseData,token)
    if(result!==null)
    navigate('/dashboard/my-courses')
  }
  return  <div>
          {
            courseData===null ?  <form className=" flex py-[60px]  bg-richblack-900 flex-col justify-center items-center">
            <h2 style={{background : 'linear-gradient(90deg, #3926AD 0%, #C367D6 100%)' ,backgroundClip : 'text', WebkitTextFillColor : 'transparent'}} className="text-[40px] mb-5 font-bold text-richblack-5">
            NexGen AI Course Builder
            </h2>
            <h4 className="text-[30px] text-center font-semibold" style={{background : " linear-gradient(118deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%)",
                                   backgroundClip : 'text', WebkitTextFillColor : "transparent"  }}              >Empower Yourself with AI <br /> The Ultimate Course Building Platform</h4>
            <p className="text-richblack-5 text-[20px] px-4 py-5">
               <img src={handShake} className="w-[500px] mb-4 mx-auto" alt="" />
               Enter in a course title, or what you want to learn about and our AI will generate a course for you.
            </p>
            <div className="text-richblack-5 mb-4 flex flex-row space-x-3 justify-between items-center max-w-[500px] w-full">
               <p className="text-[24px] font-semibold">Title</p>
               <input onChange={(e)=>setInput(e.target.value)} className="bg-richblack-800 p-3 w-full focus:outline-none rounded-lg text-richblack-200 font-medium " placeholder="Enter the main topic of the course" type="text" name="" id="" />
            </div>
            <Button onClick={(e)=>{e.preventDefault()
            createCourse()}} variant="contained" className="flex flex-row space-x-2  mx-auto w-fit" >
           {loading ? <CircularProgress color="secondary"/> : <PiLightningDuotone size={14}/> }
                 <div >
                 Let's Go
                 </div>
                </Button>
           </form> : <div className="py-[40px] max-w-[700px] mx-auto">
                <div className="p-6 rounded-md mx-auto text-richblack-5 flex space-x-4 flex-row text-[20px] font-medium bg-richblack-800">
                    <IoIosInformationCircleOutline size={70} className="text-blue-100"/> <p>
                        We generated chapters for each of the units. Look over them and then click the "Finish Course Generation" button to confirm and continue. 
                    </p>
                </div>
                {
                    courseData.units.map((item,index)=>{
                        return <div key={index} className="mt-5">
                        <h2 className="text-sm uppercase font-medium text-richblack-300">
                          Unit {index + 1}
                        </h2>
                        <h3 className="text-2xl text-richblack-200 font-bold">{item.title}</h3>
                        <div className="mt-3 text-richblack-200">
                          {item.chapters.map((chapter,index) => {
                           return <SubSection key={index} chapter_title={chapter.chapter_title}/>
                          })}
                        </div>
                      </div>
                    })
                }
                 <div className="flex flex-row justify-between mt-8 items-center">
            <button onClick={()=>dispatch(setCourseData(null))} className="flex flex-row items-center space-x-2 px-3 py-2 text-white bg-richblack-500 rounded-lg">
            <MdKeyboardArrowLeft/>
               <p>Back</p>
            </button>
            <button onClick={generateCourse} className="flex flex-row items-center space-x-2 px-3 py-2 text-white bg-richblack-500 rounded-lg">
              <p>Generate </p>
              <MdKeyboardArrowRight/>
            </button>
          </div>
           </div>
          }
         
      </div>
    
};

export default AiCourse;
