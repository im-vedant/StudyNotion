import React from 'react'
import Sidebar from '../components/common/Sidebar'
import { Outlet } from 'react-router-dom'
const DashBoardLayout = () => {
  return (
    <div className='flex flex-row min-h-screen'>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default DashBoardLayout