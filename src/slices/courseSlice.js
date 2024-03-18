import { createSlice } from "@reduxjs/toolkit";
const initialState={
    step :1,
    editCourse : false,
    course : null
}
const courseSlice=createSlice({
    name:'course',
    initialState : initialState,
    reducers :{
        setCourse :(state,action)=>
        {
            state.course=action.payload
        },
        setStep : (state, action)=>
        {
            state.step=action.payload
        },
        setEditCourse :(state,action)=>{
            state.editCourse=action.payload
        },
        resetCourseState :(state,action)=>{
            state.step=1
            state.course=null
            state.editCourse=false
        }
    }
})
export const {setCourse,setStep,setEditCourse,resetCourseState}=courseSlice.actions
export default courseSlice.reducer