import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isSendingOtp: false,
  isVerifyingOtp: false,
	idToken: undefined
}

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setIsSendingOtp: (state, action) => { state.isSendingOtp = action.payload; },
		setIsVerifyingOtp: (state, action) => { state.isVerifyingOtp = action.payload; },
	}
})

export const {
	setIsSendingOtp, setIsVerifyingOtp
} = loginSlice.actions

export default loginSlice.reducer