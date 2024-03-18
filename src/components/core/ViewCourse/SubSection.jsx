import React, { useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox';
const SubSection = ({completedVideos,subSection,handleClick,selected}) => {
   
    let isCompleted=completedVideos.some(video=>video===subSection._id)
    console.log(isCompleted)
                  return <div onClick={handleClick} key={subSection._id} className={`flex gap-3 flex-row items-center  px-5 py-2 ${selected===true ? "bg-yellow-200 font-semibold text-richblack-800" : "hover:bg-richblack-900 text-richblack-5"}`}>
             <Checkbox checked={isCompleted} color='success'/>
                    <p >{subSection.title}</p>
                  </div>
}

export default SubSection