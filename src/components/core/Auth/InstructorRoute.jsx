import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'
const InstructorRoute = () => {
    const {user}=useSelector((store)=>store.profile)
    if(user.accountType==='instructor')
    return <Outlet/>
     else
     return <Navigate to='/dashboard/my-profile'/>
}

export default InstructorRoute