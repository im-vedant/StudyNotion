import React, { useState } from 'react'
import * as Icons from 'react-icons/vsc'
import {  Link, useLocation, useNavigate } from 'react-router-dom'
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import ConfirmationModal from '../core/DashboardPage/ConfirmationModal';
import  {logout} from '../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux';
import { sidebarLinks } from '../../data/dashboard-links';
import Spinner from '../../utils/Spinner';
const modalData={
    title :"Are you sure?",
    text : "You will be logged out of your account",
    btn1 : 'Log Out',
    btn2: 'Cancel'
}
const Sidebar = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const location =useLocation()
    const currentSelected=location.pathname.split('/')[2]
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {loading : authLoading}=useSelector((store)=>store.auth)
    const {loading : profileLoading,user}=useSelector((store)=>store.profile)
    
    if(profileLoading || authLoading)
    {
        return <Spinner size={50}/>
    }
  return (
    <div className='bg-richblack-800 py-[30px] w-[20%] border border-solid border-richblack-700'>
        <div className='flex flex-col '>
            {
                sidebarLinks.map((obj,index)=>{
                    let Icon=Icons[obj.icon]
                    if(!obj.type || user.accountType===obj.type)
                    return <Link key={index} to={obj.path}>
                    <div className={`py-2 px-6 flex flex-row items-center space-x-3 ${currentSelected===obj.path ? 'bg-yellow-800 text-yellow-50 border-l-2 border-l-yellow-50' :'text-richblack-300'}`}>
                      <Icon size={18}></Icon>
                        <p className=' text-[14px] font-medium '>{obj.name}</p>
                    </div>
                    </Link>
                })
            }
            <div className='my-[10px] mx-[16px] py-1 border-t border-richblack-600'></div>
            <div className='flex flex-col'>
            <Link to="settings">
                    <div className={`py-2 px-6 flex flex-row items-center space-x-3 ${currentSelected==='settings' ? 'bg-yellow-800 text-yellow-50 border-l-2 border-l-yellow-50' :'text-richblack-300'}`}>
                       <div ><IoSettingsOutline size={18}/></div>
                        <p className=' text-[14px] font-medium '>Settings</p>
                    </div>
                    </Link>
                    <button onClick={()=>setIsModalOpen(true)}>
                    <div className={`py-2 px-6 flex flex-row items-center space-x-3 text-richblack-300`}>
                       <div ><FiLogOut size={18}/></div>
                        <p className=' text-[14px] font-medium '>Log Out</p>
                    </div>
                    </button>
                    <ConfirmationModal modalData={modalData} isOpen={isModalOpen} btnHandler2={() => setIsModalOpen(false)} btnHandler1={()=>{console.log("logout");dispatch(logout(navigate))}}/>
            </div>

        </div>
    </div>
  )
}

export default Sidebar