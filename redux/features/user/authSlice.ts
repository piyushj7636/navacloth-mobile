import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLoggedIn: false,
  idToken: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload;
    },
    setIdToken: (state, action) => {
      state.idToken = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.isUserLoggedIn = false;
      state.idToken = null;
      state.user = null;
    },
  },
});

export const { setIsUserLoggedIn, setIdToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;