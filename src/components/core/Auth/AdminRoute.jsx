import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'
const AdminRoute = () => {
    const {user}=useSelector((store)=>store.profile)
    if(user.accountType==='admin')
    return <Outlet/>
     else
     return <Navigate to='/dashboard/my-profile'/>
}

export default AdminRoute