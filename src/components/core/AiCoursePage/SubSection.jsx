import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
const SubSection = ({chapter_title}) => {
    const [loading, setLoading]=useState(false)
   
    return <div className="px-4 py-2 mt-2 rounded flex items-center flex-row justify-between bg-richblack-600">
 <p>   {chapter_title}</p>
{
    loading &&  <CircularProgress sx={{width : "20px" , height : "20px"}}/>
}
</div> 
}

export default SubSection