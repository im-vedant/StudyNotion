import React, { useEffect, useState } from 'react'
import HomePageExplore from '../../../data/homepage-explore'
import Card from './Card'
function ExploreMore() {
    const [isSelected,setIsSelected]=useState(HomePageExplore[0].tag)
    const [content, setContent]=useState(HomePageExplore[0].courses)
    const [courseSelect, setCourseSelect]=useState(0)
    useEffect(()=>{
        let newArray=HomePageExplore.filter((obj)=>{
            return obj.tag===isSelected
        })
        setContent(newArray[0].courses)
    },[isSelected])
  return (
   <div className='w-11/12 mx-auto px-[50px] pb-[32px] my-[36px] '>
    <nav className="hidden lg:flex gap-5 mb-10 mx-auto w-max  bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">{HomePageExplore.map((obj,index)=>{
        return <div key={index} className={` text-[16px] flex flex-row items-center gap-2 text-richblack-200 px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 ${(obj.tag===isSelected) ? 'bg-richblack-900 text-richblack-5 font-medium' :''}`} onClick={()=>{setIsSelected(obj.tag)}}>{obj.tag}</div>
    })}</nav>
    <div className='flex flex-row space-x-[36px]'>
        {
            content.map((obj,index)=>{
                return <Card data={obj} key={index} select={courseSelect===index} index={index} setCourseSelect={setCourseSelect}/>
            })
        }
    </div>
   </div>
  )
}

export default ExploreMore