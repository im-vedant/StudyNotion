import React from 'react'
import { NavLink } from 'react-router-dom'
function CTAButton({children, linkTo, active}) {
  return (
    <NavLink to={linkTo}>
    <div className={`px-[24px] py-[12px] font-500 ${active ? "bg-yellow-50 shadow-yellow text-richblack-900" : "bg-richblue-800 shadow-black text-richblack-5"} font-[500] shadow-learnMore w-fit rounded-[8px]`}>
       {children}
    </div>
</NavLink>
  )
}

export default CTAButton