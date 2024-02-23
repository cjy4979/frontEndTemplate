import authReducer from './authSlice'
import { combineReducers } from '@reduxjs/toolkit'

export default combineReducers({
  auth: authReducer
})
