import { createSlice } from "@reduxjs/toolkit"
const initialState = {
 courseData : null
}

const aicourseSlice = createSlice({
  name: "aicourse",
  initialState,
  reducers: {
    setCourseData: (state,action)=>{
        state.courseData=action.payload
    }
  }
})

export const { setCourseData } = aicourseSlice.actions

export default aicourseSlice.reducer
