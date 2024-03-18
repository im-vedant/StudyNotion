import React from 'react'
import HighlightText from '../components/core/AboutPage/HighlightText'
import aboutus1 from '../assets/Images/aboutus1.webp'
import aboutus2 from '../assets/Images/aboutus2.webp'
import aboutus3 from '../assets/Images/aboutus3.webp'
import foundingStory from '../assets/Images/FoundingStory.png'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactForm from '../components/core/ContactPage/ContactForm'
function About() {
  return (
    <div className=''>
      <section className='bg-richblack-800 pt-[80px]'>
          <div className='w-11/12 mx-auto text-center'>
          <p className='font-[500] text-richblack-200 px-[10px]'>About us</p>
           <div className='text-[36px] font-semibold leading-[44px] mt-[38px] mb-[16px] '>
            <p className='text-richblack-5'>Driving Innovation in Online Education for a</p>
            <HighlightText text={"Brighter Future"} gradient={'linear-gradient(118deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%)'}/>
           </div>
           <p className='w-[70%] mx-auto text-richblack-300 font-[500] '>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
          <div className='flex flex-row justify-center gap-x-[24px] translate-y-[20%]'>
            <div className=''>
              <img src={aboutus1} alt="" />
            </div>
            <div className=''>
              <img src={aboutus2} alt="" />
            </div>
            <div className=''>
              <img src={aboutus3} alt="" />
            </div>
          </div>
          </div>
      </section>
      <section className='bg-richblack-900 '>
        <div className='w-11/12 mx-auto pt-[40px]'>
          <p className='text-[36px] font-semibold leading-[52px] text-richblack-100 max-w-[85%] mx-auto text-center py-[90px]'>
            <span className='text-richblack-600'>“</span>
           {" "} We are passionate about revolutionizing the way we learn. Our innovative platform
          {" "}  <HighlightText text={'combines technology'} gradient={'linear-gradient(118deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%)'}/>
            ,
             {" "}<HighlightText text={'expertise'} gradient={'linear-gradient(118deg, #FF512F -4.8%, #F09819 107.46%)'}/>,
            and community to create an 
            {" "}<HighlightText text={'unparalleled educational experience.'} gradient={'linear-gradient(118deg, #E65C00 -6.05%, #F9D423 106.11%)'}/>
            {" "}
            <span className='text-richblack-600'>”</span>
          </p>
        </div>
      </section>
      <section className='bg-richblack-900 py-[90px]'>
        <div className='mx-auto flex flex-row justify-between gap-[100px] items-center w-11/12 max-w-[70%]'>
          <div className='w-[40%]'>
              <p className='text-[36px] font-semibold leading-[44px] mb-[24px]'><HighlightText text={"Our Founding Story "} gradient={'linear-gradient(118deg, #833AB4 -2.4%, #FD1D1D 52.25%, #FCB045 106.89%)'}/></p>
              <p className='text-richblack-300 font-medium text-[16px] mb-[16px]'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
              <p className='text-richblack-300 font-medium text-[16px] '>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
          </div>
          <div className='p-8'>
            <img src={foundingStory}  alt="Founding Story" />
          </div>
        </div>
      </section>
      <section className='bg-richblack-900 py-[90px]'>
        <div className='mx-auto flex flex-row justify-between gap-[100px]  w-11/12 max-w-[70%]'>
        <div className='w-[45%]'>
              <p className='text-[36px] font-semibold leading-[44px] mb-[24px]'><HighlightText text={"Our Vision"} gradient={' linear-gradient(118deg, #E65C00 -6.05%, #F9D423 106.11%)'}/></p>
              <p className='text-richblack-300 font-medium text-[16px] mb-[16px]'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
          </div>
          <div className='w-[45%]'>
              <p className='text-[36px] font-semibold leading-[44px] mb-[24px]'><HighlightText text={"Our Mission"} gradient={'linear-gradient(118deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%)'}/></p>
              <p className='text-richblack-300 font-medium text-[16px] mb-[16px]'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
          </div>
        </div>
      </section>
      <section className='bg-richblack-800'>
        <div className='w-11/12 mx-auto flex flex-row justify-between py-[90px]'>
           <div className='flex-1'>
            <h2 className='text-richblack-5 text-center font-bold leading-6 text-[30px] mb-3'>5K</h2>
            <p className='text-richblack-500 text-center font-semibold'>Active Students</p>
           </div>
           <div className='flex-1'>
            <h2 className='text-richblack-5 text-center font-bold leading-6 text-[30px] mb-3'>10+</h2>
            <p className='text-richblack-500 text-center font-semibold'>Mentors</p>
           </div>
           <div className='flex-1'>
            <h2 className='text-richblack-5 text-center font-bold leading-6 text-[30px] mb-3'>200+</h2>
            <p className='text-richblack-500 text-center font-semibold'>Courses</p>
           </div>
           <div className='flex-1'>
            <h2 className='text-richblack-5 text-center font-bold leading-6 text-[30px] mb-3'>50+</h2>
            <p className='text-richblack-500 text-center font-semibold'>Awards</p>
           </div>
        </div>
      </section>
      <section className='bg-richblack-900'>
      <div className='w-11/12 px-[30px] relative mx-auto my-[90px]'>
        <LearningGrid/>
      </div>
      </section>
      <section>
        <ContactForm title={'Get in Touch'} desc={'We’d love to here for you, Please fill out this form.'}/>
      </section>
    </div>
  )
}

export default About