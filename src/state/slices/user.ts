import {createSlice} from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';

export interface User {
    theme: Theme;
    jwt?: string;
}

const initialState: User = {
    theme: 'light',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
        setJwtToken: (state, action) => {
            state.jwt = action.payload;
        },
        clearJwtToken: (state) => {
            state.jwt = undefined;
        }
    }
});
