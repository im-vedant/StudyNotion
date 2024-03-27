import logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link } from 'react-router-dom'
import NavbarLinks from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import {IoIosArrowDown} from 'react-icons/io'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { useEffect, useState } from 'react'
import apiConnector from '../../services/apiConnector'
import { catalogData } from '../../services/api'
import Spinner from '../../utils/Spinner'
function Navbar() { 
  const {token}=useSelector((store)=>store.auth)
  const {user}=useSelector((store)=>store.profile)
  const {totalItems}=useSelector((store)=>store.cart)
  const [subLinks, setSubLinks]=useState([])
  async function getCatalog(){
    try {
      const result =await apiConnector("GET",catalogData.CATEGORIES_API)
      setSubLinks(result.data.allCategory)
    } catch (error) {
      console.log("Could not fetch the category list")
    }
 }
  useEffect(()=>{
     getCatalog()
  },[])
  const location=useLocation()
  const {pathname}=location
  return (
    <div className='border-b border-b-richblack-700 bg-richblack-900'>
      <div className='w-11/12 mx-auto  px-[50px] transition-all duration-200 py-3 text-white items-center justify-between flex flex-row'>
        <Link to={'/'}><img src={logo} loading='lazy' width={160} height={32} alt="" /></Link>
        <div className='flex flex-row justify-between space-x-6'>
            {
                NavbarLinks.map((obj,index)=>(
                obj.title==='Catalog' ? <div key={index} className='flex justify-center items-center gap-1 group'> <p>{obj.title}</p>  <IoIosArrowDown/>
                <div className='invisible absolute z-10 left-[36%] top-[8%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[300px]'>
                <div className='absolute left-[42%] top-[-13%] h-6 w-6 rotate-45 rounded bg-richblack-5 '>
                </div>
                { 
                  (subLinks.length>0) ?
                  subLinks.map((item,index)=>{
                    return <Link to={`/catalog/${item.name.toLowerCase().replace(" ","-")}`} key={index}><div>{item.name}</div></Link>
                  })
                  :
                  <div className='w-full justify-center items-center flex'> <Spinner/> </div>
                }
                </div>
              
                </div>:
                <Link to={obj.path} key={index} className={`text-[16px] ${pathname===obj.path ? 'text-yellow-50':'text-richblack-25'}`}>
                  <p>{obj.title}</p>
                </Link>
                ))
            }
        </div>
        <div className='flex gap-x-4 items-center text-white'>
          {
            user && user?.accountType!=='instructor' && (
              <Link to='/dashboard/cart' className='relative'>
                <AiOutlineShoppingCart size={28}/>
                {
                  totalItems >0 && (
                    <span className='absolute -top-1 h-4 w-4 flex justify-center items-center rounded-full text-[10px] bg-pink-200 text-richblack-5 left-5'>
                      {totalItems}
                    </span>
                  )
                }
              </Link>
            )
          }
          {
            token===null && (
              <Link to={'/login'}>
                <button className='px-3 py-2 border border-solid border-richblack-700 bg-richblack-800 rounded-[8px] text-[16px] font-medium text-richblack-100'>Log In</button>
              </Link>
            )
          }
          {
            token ===null && (
              <Link to={'/signup'}>
                <button className='px-3 py-2 border border-solid border-richblack-700 bg-richblack-800 rounded-[8px] text-[16px] font-medium text-richblack-100'>Sign Up</button>
              </Link>
            )
          }
          {
            token !==null && (
              <ProfileDropDown/>
            )
          }
        </div>
    </div>
    </div>
  )
}

export default Navbar