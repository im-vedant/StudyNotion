import FooterLink2 from '../../data/footer-links'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import {  FaTwitter, FaGoogle, FaYoutube, FaFacebook } from 'react-icons/fa'
import { Link } from 'react-router-dom'
function Footer() {
  return (
<section className='bg-richblack-800 py-[52px] px-[50px] '>
<div className='w-11/12 mx-auto  flex flex-row space-x-[52px] justify-between'>
            <div className='flex flex-1 flex-row space-x-3'>
                <div className='flex-1'>
                   <img src={logo} alt="" className='w-[160px] h-[32px] object-contain' />
                   <div>
                    <h3 className='py-3 text-[16px] text-richblack-100 font-semibold'>Company</h3>
                    <div className='flex flex-col space-y-2 pb-2 text-[14px] text-richblack-400'>
                      {["About", "Carrers", "Affiliates"].map((data,index)=>{
                        return <Link to={data.toLowerCase()} key={index}>{data}</Link>
                      })
                      }
                    </div>
                    <div className='flex flex-row gap-3 text-richblack-400'>
                        <FaFacebook size={24}/>
                        <FaGoogle size={24}/>
                        <FaTwitter size={24}/>
                        <FaYoutube size={24}/>
                    </div>
                   </div>
                </div>
                <div className='flex-1'>
                      <div >
                        <h3 className='pb-3 text-[16px] text-richblack-100 font-semibold'>Resources</h3>
                        <div className='flex flex-col space-y-2 pb-[36px] text-[14px] text-richblack-400'>
                            {
                                ["Articles","Blog", "Chart Sheet","Code challenges","Docs","Projects","Videos","Workspaces" ].map((data,index)=>{
                                    return <Link to={data.toLowerCase().replace(" ", "-")} key={index}>{data}</Link>
                                })
                            }
                        </div>
                        <div>
                        <h3 className='pb-3 text-[16px] text-richblack-100 font-semibold'>Support</h3>
                        <div className='flex flex-col space-y-2 pb-[36px] text-[14px] text-richblack-400'>
                            {
                                ["Help Center" ].map((data,index)=>{
                                    return <Link to={data.toLowerCase().replace(" ", "-")} key={index}>{data}</Link>
                                })
                            }
                        </div>
                        </div>
                        </div>  
                </div>
                <div className='flex-1'>
                      <div >
                        <h3 className='pb-3 text-[16px] text-richblack-100 font-semibold'>Plans</h3>
                        <div className='flex flex-col space-y-2 pb-[36px] text-[14px] text-richblack-400'>
                            {
                                ["Paid memberships","For students", "Business solutions" ].map((data,index)=>{
                                    return <Link to={data.toLowerCase().replace(" ", "-")} key={index}>{data}</Link>
                                })
                            }
                        </div>
                        <div>
                        <h3 className='pb-3 text-[16px] text-richblack-100 font-semibold'>Community</h3>
                        <div className='flex flex-col space-y-2 pb-[36px] text-[14px] text-richblack-400'>
                            {
                                ["Forums", "Chapters","Events" ].map((data,index)=>{
                                    return <Link to={data.toLowerCase().replace(" ", "-")} key={index}>{data}</Link>
                                })
                            }
                        </div>
                        </div>
                        </div>  
                </div>
            </div>
            <div className='border-l border-richblack-700'>
            </div>
            <div className='flex flex-1 flex-row justify-between'>
           {
            FooterLink2.map((obj, index)=>{
                return <div key={index}>
                    <h3 className='pb-3 text-[16px] text-richblack-100 font-semibold'>{obj.title}</h3>
                    <div className='flex flex-col space-y-2 pb-[36px] text-[14px] text-richblack-400'>
                        {
                            obj.links.map((data,index)=>{
                                return <Link to={data.link} key={index}>{data.title}</Link>
                            })
                        }
                    </div>
                </div>
            })
           }
            </div>
    </div>
    <div className='border-b border-richblack-700 my-[32px] w-11/12 mx-auto'>
    </div>
    <div className='flex flex-row justify-between w-11/12 mx-auto'>
        <div className='flex flex-row space-x-4 text-[14px] text-richblack-300 font-[500]'>
            {
                ["Privacy Policy", "Cookie Policy", "Terms"].map((obj, index)=>{
                    return <Link to={obj.toLowerCase().replace(" ","-")} key={index}>{obj}</Link>
                })
            }
        </div>
        <div className='text-richblack-300 text-[14px] font-[500]'>
            Made with ❤️ &copy; 2023 StudyNotion
        </div>
    </div>
</section>
  )
}

export default Footer