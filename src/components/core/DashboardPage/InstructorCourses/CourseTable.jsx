import React, { useState } from 'react'
import { Table, Thead,Tbody,Tr,Td,Th } from 'react-super-responsive-table'
import { HiClock } from 'react-icons/hi2';
import { FaCheck } from 'react-icons/fa';
import { FiEdit2 } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useSelector } from 'react-redux';
import { deleteCourse, getAllInstructorCourses } from '../../../../services/operations/courseAPI';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../ConfirmationModal';
const CourseTable = ({courses,setCourses}) => {
   const [courseId,setCourseId]=useState(null)
    const [isOpen,setIsOpen]=useState(false)
    const {user}=useSelector((store)=>store.profile)
    const {token}=useSelector((store)=>store.auth)

    const navigate=useNavigate()
    const [loading ,setLoading]=useState(false)
    async function handleDelete(id){
        console.log(id)
        console.log(user)
        setLoading(true)
        let result=await deleteCourse({courseId:id,userId : user._id},token)
        if(result===true)
        {
            let updatedCourses=await getAllInstructorCourses(token)
            if(updatedCourses)
            {
                setCourses(updatedCourses)
            }
        }
        setLoading(false)
        setIsOpen(false)
    }
    console.log(courses)
    const modalData={
        title: "Do you want to delete this course?",
        text:"All the data related to this course will be deleted",
        btn1: !loading ? "Delete" : "Loading...  ",
        btn2: "Cancel"
    }
  return (
   <>
   <Table className="rounded-xl max-w-[976px] ml-6 border border-richblack-800">
    <Thead className="text-richblack-100 font-medium capitalize text-[14px] p-4">
    <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <Th className="w-[60%] text-left text-sm font-medium uppercase text-richblack-100">
              Courses
            </Th>
            <Th className="text-left w-[10%] text-sm font-medium uppercase text-richblack-100">
              Duration
            </Th>
            <Th className="text-left w-[10%] text-sm font-medium uppercase text-richblack-100">
              Price
            </Th>
            <Th className="text-left w-[10%] text-sm font-medium uppercase text-richblack-100">
              Actions
            </Th>
          </Tr>
    </Thead>
    <Tbody>
    {courses?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No courses found
                {/* TODO: Need to change this state */}
              </Td>
            </Tr>
          ) : (
            courses?.map((course) => (
              <Tr
                key={course._id}
                className="flex gap-x-10 text-start border-b border-richblack-800 px-6 py-8"
              >
                <Td className="flex w-[60%] gap-x-4">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="h-[148px] w-[220px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-lg font-semibold text-richblack-5">
                      {course.courseName}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {course.courseDescription.split(" ").length >
                      30
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, 30)
                            .join(" ") + "..."
                        : course.courseDescription}
                    </p>
                    <p className="text-[12px] text-white">
                      Created: {(course.createdAt)}
                    </p>
                    {course.status === "Draft" ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </p>
                    )}
                  </div>
                </Td>
                <Td className="text-sm w-[10%] font-medium text-richblack-100">
                  2hr 30min
                </Td>
                <Td className="text-sm w-[10%] font-medium text-richblack-100">
                  ₹{course.price}
                </Td>
                <Td className="text-richblack-400 flex flex-row justify-start h-full space-x-4 w-[10%]">
                    <button disabled={loading} onClick={()=>{
                        navigate(`/dashboard/edit-course/${course._id}`)
                    }}>
                        <FiEdit2 size={20}/>
                    </button>
                    <button disabled={loading} onClick={()=>{
                        setCourseId(course._id)
                        setIsOpen(true)
                    }}>
                        <RiDeleteBin6Line size={20}/>
                    </button>
                </Td>
                </Tr>
            )))
   }
    </Tbody>
   </Table>
   {
    isOpen===true && <ConfirmationModal isOpen={isOpen} modalData={modalData} btnHandler1={()=>handleDelete(courseId)} btnHandler2={()=>setIsOpen(false)}/>
   }
   </>
  )
}

export default CourseTable