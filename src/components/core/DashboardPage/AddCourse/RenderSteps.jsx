import React from "react";
import { useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";
import CourseInformation from "./CourseInformation";
import Publish from "./Publish";
import CourseBuilder from "./CourseBuilder/CourseBuilder";
const RenderSteps = () => {
  const { step } = useSelector((store) => store.course);
  const data = [
    {
      step: 1,
      name: "course information",
    },
    {
      step: 2,
      name: "course builder",
    },
    {
      step: 3,
      name: "publish",
    },
  ];
  return (
    <div className="w-full">
      <div className="flex  flex-row mb-8">
        {data.map((item, index) => {
          return (
            <div key={index} className="flex flex-1 flex-col items-center space-y-2">
              <div className="flex  w-full flex-row justify-center items-center">
                <div
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #424854 40%, rgba(255, 255, 255, 0) 40%)",
                    backgroundRepeat: "repeat-x",
                    backgroundPosition: "top top",
                    backgroundSize: "8px 1px",
                  }}
                  className={`${item.step!==1 ? 'h-[1px]' :''} ${item.step <= step ? "bg-yellow-50" :''} w-full`}
                ></div>
                <p
                  className={`rounded-full border-solid border ${
                    item.step === step
                      ? " border-yellow-50 bg-yellow-900 text-yellow-50"
                      : "border-richblack-700 bg-richblack-800 text-richblack-300 "
                  } font-semibold text-[18px] w-fit p-2  ${step > item.step ? 'bg-yellow-50' :''}`}
                >
                  <div className={`w-5 h-5 flex items-center justify-center`}>
                   {
                    item.step < step ? <TiTick className="text-black" size={30}/> : item.step
                   }

                  </div>
                </p>
                <div
                  style={{
                    backgroundImage:
                      "linear-gradient(to left, #424854 40%, rgba(255, 255, 255, 0) 40%)",
                    backgroundRepeat: "repeat-x",
                    backgroundPosition: "top top",
                    backgroundSize: "8px 1px",
                  }}
                  className={`${item.step!==3 ? 'h-[1px]' :''} ${item.step < step ? "bg-yellow-50" :''} w-full`}
                ></div>
              </div>
              <p className={`${item.step > step ? 'text-richblack-300':'text-richblack-5'} text-[14px] capitalize`}>
                {item.name}
              </p>
            </div>
          );
        })}
      </div>
      {
        step===1 ? <CourseInformation/> : step===2 ?<CourseBuilder/> :<Publish/>
      }
    </div>
  );
};

export default RenderSteps;
