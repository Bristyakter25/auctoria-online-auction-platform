import { configureStore } from '@reduxjs/toolkit'
// import myCounter from "./counterSlice"

import reportReducer from "./../reportSlice"
const store = configureStore({
  reducer: {
    counter: reportReducer, 
  }
})

export default store;