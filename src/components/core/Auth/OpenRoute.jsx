import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
const OpenRoute = () => {
    const {token}=useSelector((store)=>store.auth)
  if(token===null)
    return <Outlet/>
    else
    return <Navigate to='/dashboard/my-profile'/>
}

export default OpenRoute