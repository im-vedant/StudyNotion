import React from 'react'
import { useNavigate } from 'react-router-dom'
import {FaRegEdit} from 'react-icons/fa'
const EditBtn = () => {
    const navigate =useNavigate()
  return (
    <button style={{boxShadow :' -0.5px -1.5px 0px 0px rgba(0, 0, 0, 0.12) inset'}} className='px-5 flex flex-row space-x-2 h-fit rounded-[8px] items-center text-[16px] font-medium text-center text-richblack-900 py-2 bg-yellow-50 ' onClick={()=>navigate('/dashboard/settings')}>
        <FaRegEdit size={18}/>
        <p>Edit</p>
    </button>
  )
}

export default EditBtn