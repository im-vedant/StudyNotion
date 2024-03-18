import React from 'react'
import SectionView from './SectionView'
import { useDispatch, useSelector } from 'react-redux'
const NestedView = ({handleChangeEditSection}) => {
    const {course}=useSelector((store)=>store.course)
    const {token}=useSelector((store)=>store.auth)
    const dispatch=useDispatch()
  return (
    <div className='px-6 mt-[26px] mb-[50px] bg-richblack-700 border border-richblack-600 rounded-lg'>
        {
            course.courseContent.map((data,index)=>{
               return  <SectionView  handleChangeEditSection={handleChangeEditSection} data={data}/>
            })
        }
    </div>
  )
}

export default NestedView