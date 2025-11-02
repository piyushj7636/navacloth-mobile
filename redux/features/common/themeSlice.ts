import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ThemeState = 'light' | 'dark'

const themeSlice = createSlice({
	name: 'theme',
	initialState: 'light',
	reducers: {
		setNewTheme: (state, action: PayloadAction<ThemeState>) => action.payload
	}
})

export const { setNewTheme } = themeSlice.actions;
export default themeSlice.reducer;