import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from '../HomePage/Button'
const data=[
    {
        title :"",
        desc :""
    },
    {
        title :"Curriculum Based on Industry Needs",
        desc :"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
    },
    {
        title :"Our Learning Methods",
        desc :"The learning process uses the namely online and offline."
    },
    {
        title :"",
        desc :""
    },
    {
        title :"Certification \n ",
        desc :"You will get a certificate that can be used as a certification during job hunting."
    },
    {
        title :'Rating \n "Auto-grading"',
        desc :"You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."
    },
    {
        title :`Ready to \n Work`,
        desc :"Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."
    },
]
const LearningGrid = () => {
  return (
    <div className='grid grid-cols-4'>
         {
            data.map((item,index)=>{
                if(index===0 )
                return <div className='col-span-2 pr-[52px] pb-[26px]'>
                <h1 className='font-semibold mb-3 leading-[44px] text-richblack-5 text-[36px]'>World-Class Learning for <HighlightText text={"Anyone, Anywhere"} gradient={'linear-gradient(118deg, #5433FF -4%, #20BDFF 51.26%, #A5FECB 106.52%)'}/></h1>
                <p className='text-richblack-300 mb-[48px] font-medium'>Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>
                <CTAButton active={true} linkTo={"/login"}>
                      <p className="font-bold">Learn More</p>
                    </CTAButton>
              </div>
                else if( index===3)
                return <div key={index}></div>
                else
                return <div key={index} className={`${(index===2 || index ===5) ? 'bg-richblack-700' : 'bg-richblack-800'} h-[300px] p-8 flex flex-col   space-y-8`}>
                    <h2 className='text-richblack-5 text-[18px] whitespace-pre-line font-semibold h-[50px] '>{item.title}</h2>
                   <div>
                     <p className='text-richblack-100 h-full text-[14px]'>{item.desc}</p>
                   </div>
                </div>
            })
         }
    </div>
  )
}

export default LearningGrid