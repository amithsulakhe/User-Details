import {configureStore} from "@reduxjs/toolkit"
import slice from "./slice";
const appStore=configureStore({
    reducer:{
slice:slice
    }
})

export default appStore;