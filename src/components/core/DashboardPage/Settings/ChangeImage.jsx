import React, { useState,useRef } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { updateDisplayPicture } from '../../../../services/operations/settingAPI';
import { FiUpload } from "react-icons/fi"
const ChangeImage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.profile);
    const { token } = useSelector((store) => store.auth);
    const [loading,setLoading]=useState(false)
    const [imageFile,setImageFile]=useState(null)
    const [previewSource, setPreviewSource]=useState(null)
    const { image} = user;
    const ref=useRef(null)
    function handleClick(){
        if(ref.current)
        ref.current.click()
    }
    function handleFileChange(e)
    {
        const file=e.target.files[0]
        if(file)
        {
            setImageFile(file)
            previewFile(file)
        }
    }
    function previewFile(file)
    {
        const reader=new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend=()=>{
            setPreviewSource(reader.result)
        }
    }
    async function handleFileUpload(e)
    {
        e.preventDefault()
        try {
            console.log("uploading...")
            setLoading(true)
            const formData = new FormData()
            formData.append("displayPicture", imageFile)
            // console.log("formdata", formData)
            dispatch(updateDisplayPicture(token, formData)).then(() => {
              setLoading(false)
            })
          } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
          }
      
    }
  return (
    <div   className="p-6 flex flex-row items-center justify-between w-full border border-solid border-richblack-700 rounded-[8px] bg-richblack-800">
    <div className="flex flex-row space-x-6 items-center">
      <img
        src={previewSource || image}
        className="rounded-full object-cover w-[80px] h-[80px]"
        alt=""
      />
      <div className="">
        <p className="text-richblack-25 font-medium text-[16px] mb-3">
          Change profile picture
        </p>
        <div className="flex flex-row space-x-3">
          <input
          ref={ref}
          type="file"
          id="image"
          name="image"
          onChange={handleFileChange}
          accept="image/png, image/gif, image/jpeg"
        className="hidden"
          >
          </input>
          <button
          disabled={loading}
          onClick={handleClick}
           style={{
              boxShadow:
                "-0.5px -1.5px 0px 0px rgba(0, 0, 0, 0.12) inset",
            }}  className="px-[18px]  py-[6px] text-richblack-900 text-[16px] font-medium bg-yellow-50 rounded-lg" htmlFor="image">Select</button>
          <button onClick={handleFileUpload} className="px-[18px] items-center flex flex-row justify-center space-x-2 rounded-lg py-[6px] text-richblack-50 text-[16px] font-medium border border-solid border-richblack-600 bg-richblack-700">
          
          {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}
           <p>{loading ? "Uploading..." : "Upload"}</p>
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ChangeImage