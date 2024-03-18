import React, { useState } from 'react'
import Dropdownsvg from '../../Dropdownsvg'
import { HiMiniPencil } from 'react-icons/hi2'
import { RiDeleteBin6Line } from 'react-icons/ri'
import SubSectionModal from './SubSectionModal'
import { deleteSubSection } from '../../../../../services/operations/courseAPI'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse } from '../../../../../slices/courseSlice'
const SubSectionView = ({data,sectionId }) => {
    const { course}=useSelector((store)=>store.course)
    const {token}=useSelector((store)=>store.auth)
    const dispatch=useDispatch()
    const [stage,setStage]=useState(null)
    const [isSubSectionModalOpen,setIsSubSectionModalOpen]=useState(false)
    async function handleDeleteSection(){
        try {
            const result=await deleteSubSection({ sectionId : sectionId, subSectionId :data._id},token)
        if(result)
        {
            let courseContent=course.courseContent.map((data)=>{
                if(data._id===result._id)
                return result
                return data
            })
            dispatch(setCourse({...course ,courseContent : courseContent}))
        }
        } catch (error) {
            console.log("Unable to delete the subSection")
        }
    }
  return (
    <div  className='pl-6 py-3 '>
         <div className='py-3 flex justify-between flex-row border-b border-richblack-600'>
        <div onClick={()=>{
            setStage('view')
            setIsSubSectionModalOpen(true)
        }} className='flex flex-row space-x-2 text-richblack-50 text-[16px] font-semibold '>
            <Dropdownsvg/>
            <p>{data.title}</p>
        </div>
        <div className='flex flex-row space-x-3'>
            <button 
            onClick={()=>{
              
                setStage('edit')
                setIsSubSectionModalOpen(true)
            }}
             className='text-richblack-400'>
                <HiMiniPencil size={20}/>
            </button>
            <button onClick={handleDeleteSection} className='text-richblack-400'>
                <RiDeleteBin6Line size={20} />
            </button>
        </div>
    </div>
    <SubSectionModal sectionId={sectionId}  closeHandler={()=>setIsSubSectionModalOpen(false)} stage={stage} isSubSectionModalOpen={isSubSectionModalOpen} subSectionData={data} />
    </div>
  )
}

export default SubSectionView