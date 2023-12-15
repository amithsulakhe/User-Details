import userSlice from "./userSlice";
import {configureStore} from "@reduxjs/toolkit"
const appstore=configureStore({
    reducer:{
        user:userSlice
     }
})

export default appstore;