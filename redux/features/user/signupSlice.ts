import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSendingOtp: false,
  isVerifyingOtp: false,
	idToken: undefined
};

const signupSlice = createSlice({
	name: 'signup',
	initialState,
	reducers: {
		setIsSendingOtp: (state, action) => { state.isSendingOtp = action.payload; },
		setIsVerifyingOtp: (state, action) => { state.isVerifyingOtp = action.payload; },
  },
})

export const {
	setIsSendingOtp, setIsVerifyingOtp
} = signupSlice.actions

export default signupSlice.reducer