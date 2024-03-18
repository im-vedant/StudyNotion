import React, { useState } from 'react'
import Dropdownsvg from '../../Dropdownsvg'
import { HiMiniPencil } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";
import SubSectionView from './SubSectionView';
import ConfirmationModal from '../../ConfirmationModal';
import { FaPlus } from "react-icons/fa";
import { deleteSection } from '../../../../../services/operations/courseAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../../slices/courseSlice';
import SubSectionModal from './SubSectionModal';
import {AiFillCaretDown} from 'react-icons/ai'
const modalData={
    title : "Delete this Section?",
    text : "All the lectures in this section will be deleted",
    btn1 : "Delete",
    btn2 :"Cancel"
}
const SectionView = ({data,handleChangeEditSection}) => {
    const [isOpen,setIsOpen]=useState(false)
    const [isSubSectionModalOpen,setIsSubSectionModalOpen]=useState(false)
    const { course}=useSelector((store)=>store.course)
    const { token}=useSelector((store)=>store.auth)
    const dispatch=useDispatch()

   async function handleDeleteSection()
    {
      const result=await  deleteSection({courseId : course._id, sectionId : data._id},token)
        if(result)
        {
            dispatch(setCourse(result))
        }
    }

  return (
   <div>
     <details>
        <summary className='py-3 flex flex-row space-x-3 justify-between border-b border-richblack-600'>
        <div className='flex flex-row space-x-2 text-richblack-50 text-[16px] font-semibold '>
            <Dropdownsvg/>
            <p>{data.sectionName}</p>
        </div>
        <div className='flex flex-row space-x-3'>
            <button onClick={()=>{handleChangeEditSection(data._id, data.sectionName)}} className='text-richblack-400'>
                <HiMiniPencil size={20}/>
            </button>
            <button className='text-richblack-400' onClick={()=>setIsOpen(true)}>
                <RiDeleteBin6Line size={20}/>
            </button>
            <div className='border-l border-richblack-600'></div>
            <AiFillCaretDown className={` text-richblack-300`} size={20}/>
        </div>
    </summary>
        <p>
            {
                
                data.subSection.map((item,index)=>{
                    return <SubSectionView data={item} sectionId={data._id} key={index}/>
                })
            }
        </p>
    </details>
    <button onClick={()=>setIsSubSectionModalOpen(true)} className='text-yellow-50 py-4 items-center flex flex-row space-x-2'>
        <FaPlus size={18}></FaPlus>
        <p className='text-[16px] font-medium'>Add Lecture</p>
    </button>
    <SubSectionModal stage="add" isSubSectionModalOpen={isSubSectionModalOpen} sectionId={data._id} closeHandler={()=>setIsSubSectionModalOpen(false)} />
    <ConfirmationModal modalData={modalData} isOpen={isOpen} btnHandler1={handleDeleteSection} btnHandler2={()=>setIsOpen(false)}/>
   </div>
  )
}

export default SectionView