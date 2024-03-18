import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import boxoffice from "../assets/Images/boxoffice.png";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import AnimatedText from "../components/core/HomePage/AnimatedText";
import HomeTimeline from "../components/core/HomePage/HomeTimeline";
import TimelineImage from "../assets/Images/TimelineImage.png";
import PlanYourLessons from "../assets/Images/PlanYourLessons";
import CompareWithOthers from "../assets/Images/CompareWithOthers";
import KnowYourProgress from "../assets/Images/KnowYourProgress";
import Instructor from "../assets/Images/Instructor.png";
import ReviewSlider from "../components/common/ReviewSlider";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import axios from "axios";
import { courseEndpoints } from "../services/api";
import CircularProgress from '@mui/material/CircularProgress';
export default function Home() {
  const [loading,setLoading]=useState(false)
  const [reviewData,setReviewData]=useState(null)
  const fetchReview= async ()=>{
    setLoading(true)
   try {
    let response =await axios.get(courseEndpoints.GET_ALL_RATING_API) 
    if(response.data.success)
    {
      console.log(response.data)
      setReviewData(response.data.allRatings)
    }
   } catch (error) {
    console.log(error)
   }
    setLoading(false)
  } 
  useEffect(()=>{
    fetchReview()
  },[])
  return (
    <div className="">
      {/* Section 1 */}
      <section className="pt-[68px] pb-[500px]">
        <div className="text-center max-w-[913px] mx-auto">
          <NavLink to={"/signup"}>
            <div className=" rounded-[100px] px-[18px] py-[6px] bg-richblack-800 text-[16px] w-fit flex justify-center items-center mx-auto font-[500] text-richblack-200 space-x-[10px]">
              <span>Become an Instructor</span>
              <FaArrowRight></FaArrowRight>
            </div>
          </NavLink>
          <div className="my-[38px] flex space-y-[16px] flex-col ">
            <p className="text-[36px] font-semibold text-richblack-5">
              Empower Your Future with <HighlightText text={"Coding Skills"} />
            </p>
            <p className="font-500 text-richblack-300">
              With our online coding courses, you can learn at your own pace,
              from anywhere in the world, and get access to a wealth of
              resources, including hands-on projects, quizzes, and personalized
              feedback from instructors.{" "}
            </p>
          </div>
          <div className="flex space-x-[24px] justify-center">
            <CTAButton active={true} linkTo={"/signup"}>
              Learn More
            </CTAButton>
            <CTAButton active={false} linkTo={"/login"}>
              Book a Demo
            </CTAButton>
          </div>
        </div>
        <div className="mt-[60px]">
          <img
            src={boxoffice}
            className="mx-auto w-[1035px] h-[515px]"
            alt=""
          />
        </div>
        <div className="flex flex-row my-[90px] justify-between space-x-[98px] mx-auto max-w-[1200px]">
          <div className="py-[32px] w-[50%]">
            <p className="text-[36px] text-richblack-5  leading-[44px] font-semibold">
              Unlock your <HighlightText text={"coding potential"} /> with our
              online courses.
            </p>
            <p className="my-[12px] text-richblack-300 text-[16px]">
              Our courses are designed and taught by industry experts who have
              years of experience in coding and are passionate about sharing
              their knowledge with you.
            </p>
            <div className="flex space-x-[24px] mt-[42px] justify-start">
              <CTAButton active={true} linkTo={"/signup"}>
                <p className="flex justify-center items-center">
                  Try it Yourself{" "}
                  <span className="ml-[8px]">
                    <FaArrowRight></FaArrowRight>
                  </span>
                </p>
              </CTAButton>
              <CTAButton active={false} linkTo={"/signup"}>
                Learn More
              </CTAButton>
            </div>
          </div>
          <div className="flex flex-row m-8 border border-solid border-white h-fit w-[35%] border-opacity-20 bg-linear-gradient(112deg, rgba(14, 26, 45, 0.24) -1.4%, rgba(17, 30, 50, 0.38) 104.96%)  p-2 gap-2">
            <ul className="list-none text-richblack-400 px-1 text-[14px] h-fit ">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
              <li>10</li>
              <li>11</li>
            </ul>
            <AnimatedText />
          </div>
        </div>
        <div className="flex flex-row my-[90px] justify-between space-x-[98px] mx-auto max-w-[1200px]">
          <div className="flex flex-row m-8 border border-solid border-white h-fit w-[35%] border-opacity-20 bg-linear-gradient(112deg, rgba(14, 26, 45, 0.24) -1.4%, rgba(17, 30, 50, 0.38) 104.96%)  p-2 gap-2">
            <ul className="list-none text-richblack-400 px-1 text-[14px] h-fit ">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
              <li>10</li>
              <li>11</li>
            </ul>
            <AnimatedText />
          </div>
          <div className="py-[32px] w-[50%]">
            <p className="text-[36px] text-richblack-5 font-semibold leading-[44px]">
              Start <HighlightText text={"coding"} /> <br />{" "}
              <HighlightText text={"in seconds"} />
            </p>
            <p className="my-[12px] text-richblack-300 text-[16px]">
              Go ahead, give it a try. Our hands-on learning environment means
              you'll be writing real code from your very first lesson.
            </p>
            <div className="flex space-x-[24px] mt-[42px] justify-start">
              <CTAButton active={true} linkTo={"/signup"}>
                <p className="flex justify-center items-center">
                  Continue Lesson
                  <span className="ml-[8px]">
                    <FaArrowRight></FaArrowRight>
                  </span>
                </p>
              </CTAButton>
              <CTAButton active={false} linkTo={"/signup"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
      {/* section 2 */}
      <section className="bg-pure-greys-5 text-richblack-700">
        <div className="home-catalog bg-repeat h-[300px]">
          <div className="-translate-y-[70%]">
            {" "}
            <div className="text-[36px] font-semibold leading-[44px] text-center text-richblack-5">
              Unlock the <HighlightText text={"Power of Code"} />
            </div>
            <p className="text-base text-center text-richblack-300 font-medium">
              Learn to Build Anything You Can Imagine
            </p>
            <ExploreMore />
            <div className="flex space-x-[24px] justify-center">
              <CTAButton active={true} linkTo={"/signup"}>
                <p className="flex justify-center items-center font-bold">
                  {" "}
                  Explore Full Catalog{" "}
                  <span className="ml-2">
                    <FaArrowRight />
                  </span>
                </p>
              </CTAButton>
              <CTAButton active={false} linkTo={"/login"}>
                <p className="font-bold">Learn More</p>
              </CTAButton>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-11/12 mx-auto px-[40px] py-[90px]">
          <div className="flex flex-row justify-between mb-[52px]">
            <p className="text-[36px] flex-1 font-semibold leading-[44px]">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </p>
            <div className="flex-1">
              <p className="mb-12">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>
              <CTAButton active={true} linkTo={"/signup"}>
                <p className="font-bold text-richblack-900"> Learn More</p>
              </CTAButton>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full items-center">
            <HomeTimeline />
            <div className="relative">
              <img src={TimelineImage} className="shadow-homeTimeline" alt="" />
              <div className="flex flex-row space-x-[52px] p-11 bg-caribbeangreen-700 w-fit mx-auto -translate-y-[50%] translate-x-[50%] right-[50%] absolute">
                <div className="flex flex-row space-x-6 items-center">
                  <p className="text-[36px] text-white font-bold">10</p>
                  <p className="text-[14px] text-caribbeangreen-300">
                    Years <br />
                    Experiences
                  </p>
                </div>
                <div className="border-l border-caribbeangreen-500"></div>
                <div className="flex flex-row space-x-6 items-center">
                  <p className="text-[36px] text-white font-bold">250</p>
                  <p className="text-[14px] text-caribbeangreen-300">
                    Types of <br />
                    Courses
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-11/12 mx-auto px-[40px] py-[90px] flex flex-col">
          <div className="text-center flex flex-col space-y-3">
            <p className="font-semibold text-[36px] leading-[44px]">
              Your swiss knife for{" "}
              <HighlightText text={"learning any language"} />
            </p>
            <p className="text-richblack-700 text-[16px] font-[500] w-[56%] mx-auto">
              Using spin making learning multiple languages easy. with 20+
              languages realistic voice-over, progress tracking, custom schedule
              and more.
            </p>
          </div>
          <div className="flex flex-row justify-center items-center pl-[50px]">
            <div className="z-0 translate-x-[25%] -translate-y-6 w-fit">
              <KnowYourProgress />
            </div>
            <div className="z-10 w-fit ">
              <CompareWithOthers />
            </div>
            <div className="z-20 -translate-x-[27%] -translate-y-5 w-fit">
              <PlanYourLessons />
            </div>
          </div>
          <div className="font-bold mx-auto mt-[36px]">
            <CTAButton active={true} linkTo={"/signup"}>
              Learn More
            </CTAButton>
          </div>
        </div>
      </section>
      {/* section 3 */}
      <section>
        <div className="w-11/12 mx-auto flex flex-row space-x-[98px] items-center py-[90px] justify-between px-[70px]">
          <img src={Instructor} alt="" className="shadow-instructor" />
          <div className="w-[37%]">
            <p className="text-white text-[36px] font-semibold leading-[44px]">
              Become an <br /> <HighlightText text={"instructor"} />
            </p>
            <p className="py-3 text-richblack-300 text-[16px] mb-[52px]">
              Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love.
            </p>
            <CTAButton active={true}>
              <p className="flex flex-row items-center justify-center">
                Start Teaching Today{" "}
                <span className="ml-2">
                  <FaArrowRight />
                </span>
              </p>
            </CTAButton>
          </div>
        </div>
        <div className="w-11/12 mx-auto py-[90px]">
          <h2 className="text-center text-richblack-5 leading-[44px] mb-10 text-[36px] font-semibold">
            Reviews from other learners
          </h2>
          {
            reviewData===null ? 
            <div className="flex justify-center items-center">
              <CircularProgress/>
            </div>
            : <ReviewSlider data={reviewData}/>
          }
          <div>

          </div>
        </div>
      </section>
    
    </div>
  );
}
