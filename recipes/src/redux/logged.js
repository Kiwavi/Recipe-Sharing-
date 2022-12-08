import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    isLogged: false,
    user: null,
}

export const loggedSlice = createSlice({
    name: 'logged',
    initialState,
    reducers: {
	login: (state) => {
	    state.isLogged = true;
	},
	logout: (state) => {
	    state.isLogged = false;
            state.user = null;
	},
        loguser: (state,action) => {
            state.user = action.payload;
        },
    }
})


export const { login, logout, loguser } = loggedSlice.actions;

export default loggedSlice.reducer;
