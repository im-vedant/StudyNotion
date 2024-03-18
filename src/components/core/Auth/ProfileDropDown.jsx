import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineCaretDown } from "react-icons/ai"
import {VscSignOut,VscDashboard} from 'react-icons/vsc'
import useOnOutsideClick from '../../../hooks/useOnOutsideClick';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
const DropdownMenu = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
 const {user}=useSelector((store)=>store.profile)
 const [isOpen, setIsOpen]=useState(false)
 const ref=useRef(null)
 useOnOutsideClick(ref,()=>setIsOpen(false))
  return (
   <button className='relative' ref={ref}>

    <div className="flex items-center gap-x-1"onClick={(e)=>{e.stopPropagation() ; setIsOpen(!isOpen)}} >
       <img src={user.image} className='w-[28px] aspect-square object-cover rounded-full' alt="" />
       <AiOutlineCaretDown className="text-sm text-richblack-100" />
    </div>
    {
      isOpen && 
      (
        <div
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
        >
          <Link to="/dashboard/my-profile" >
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              console.log("logout")
              dispatch(logout(navigate))
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg"/>
            Logout
          </div>
        </div>
      )}
   
   </button>
  );
};

export default DropdownMenu;
