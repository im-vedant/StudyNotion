import React from 'react'
import RenderSteps from './RenderSteps'
const Index = () => {
  return (
    <div className='w-full flex-row p-8 flex space-x-6 '>
        <div className='w-full'>
            <h2 className='text-richblack-5 font-medium text-[30px] mb-10 '>Add Course</h2>
            <RenderSteps/>
        </div>
        <div className='p-6 text-richblack-5 h-fit bg-richblack-800 max-w-[380px] border border-solid border-richblack-700 rounded-lg'>
            <h2 className='text-[18px] font-semibold'>⚡Course Upload Tips</h2>
            <ul className='mt-5 h- list-disc ml-6 flex flex-col space-y-[11px]'>
                <li>Set the Course Price option or make it free.</li>
                <li>Standard size for the course thumbnail is 1024x576.</li>
                <li>Video section controls the course overview video.</li>
                <li>Course Builder is where you create & organize a course.</li>
                <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                <li>Information from the Additional Data section shows up on the course single page.</li>
                <li>Make Announcements to notify any important</li>
                <li>Notes to all enrolled students at once.</li>
            </ul>
        </div>
       

    </div>
  )
}

export default Index