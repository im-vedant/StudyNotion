import React from 'react'
import { SiGooglechat } from "react-icons/si";
import { BsGlobeAmericas } from "react-icons/bs";
import { FaPhone } from "react-icons/fa6";
import ContactForm from '../components/core/ContactPage/ContactForm';
const data=[{
  title : "Chat on us",
  line1 :"Our friendly team is here to help.",
  line2:"studynotionofficial@gmail.com",
  image:<SiGooglechat size={24}/>
},
{
  title : "Visit us",
  line1 :"Come and say hello at our office HQ.",
  line2:"Here is the location/ address",
  image:<BsGlobeAmericas size={24}/>
},
{
  title : "Call us",
  line1 :"Mon - Fri From 8am to 5pm",
  line2:"+123 456 7890",
  image:<FaPhone size={24}/>
}]
function Contact() {
  return (
    <div className='bg-richblack-900'>
      <section className='w-11/12 max-w-[1280px] mx-auto my-[90px] flex flex-row gap-x-13 justify-between'>
        <div className=' bg-richblack-800 h-fit w-[450px] rounded-[12px] p-6 flex flex-col space-y-6'>
            {
              data.map((obj,index)=>{
                return <div key={index} className='flex p-3 flex-row space-x-[9px]'>
                  <div className='text-richblack-100'>
                  {
                    obj.image
                   }
                  </div>
                   <div>
                    <h2 className='text-richblack-5 font-semibold text-[18px] '>{obj.title}</h2>
                    <p className='text-[14px] font-medium text-richblack-200'>{obj.line1}</p>
                    <p className='text-[14px] font-medium text-richblack-200'>{obj.line2}</p>
                   </div>
                </div>
              })
            }
        </div>
        <div className='border max-w-[700px]  p-[52px]  border-solid border-richblack-600 rounded-[12px]'>
        <ContactForm 
        desc={"Tall us more about yourself and what you’re got in mind."}
        title={"Got a Idea? We’ve got the skills. Let’s team up"}/>
        </div>
      </section>
    </div>
  )
}

export default Contact