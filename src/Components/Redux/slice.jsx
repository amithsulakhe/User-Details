import { createSlice } from "@reduxjs/toolkit";

const slice=createSlice({
    name:"data",
    initialState:{
        editPage:false
    },
    reducers:{
        toggleEditPage:(state,action)=>{
            state.editPage=action.payload
        }
    }
})

export const {toggleEditPage}=slice.actions
export default slice.reducer