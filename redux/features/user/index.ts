import { combineReducers } from "@reduxjs/toolkit";
import signupReducer from "./signupSlice"
import loginReducer from "./loginSlice"
import authReducer from "./authSlice"

const reducer = combineReducers({
	signup: signupReducer,
	login: loginReducer,
	auth: authReducer
})

export default reducer