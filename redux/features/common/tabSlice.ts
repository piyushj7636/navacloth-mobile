import { createSlice } from '@reduxjs/toolkit';

const tabSlice = createSlice({
  name: 'tab',
  initialState: {
    visible: true,
  },
  reducers: {
    showTab: (state) => {
      state.visible = true;
    },
    hideTab: (state) => {
      state.visible = false;
    },
  },
});

export const { showTab, hideTab } = tabSlice.actions;
export default tabSlice.reducer;
