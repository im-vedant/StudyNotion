import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
const PrivateRoute = () => {
    const {token}=useSelector((store)=>store.auth)
    if(token!==null)
        return <Outlet/>
    else
    return <Navigate to='/login'/>
}

export default PrivateRoute