import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userhasrecipes: false,
};


export const userRecipes = createSlice({
    name: 'userentries',
    initialState,
    reducers: {
        hasrecipe: (state) => {
            state.userhasrecipes = true;
        },
        hasnorecipes: (state) => {
            state.userhasrecipes = false;
        }
    }
});


export const { hasrecipe, hasnorecipes } = userRecipes.actions;

export default userRecipes.reducer;
