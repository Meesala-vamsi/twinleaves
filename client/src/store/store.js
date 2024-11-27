import {configureStore} from "@reduxjs/toolkit";
import fruitsSlice from "./slices/fruitsSlice";

const store = configureStore({
  reducer:{
    products:fruitsSlice
  }
})

export  default store;