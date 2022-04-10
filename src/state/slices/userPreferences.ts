import {createSlice} from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';

export interface UserPreferences {
    theme: Theme;
}

const initialState: UserPreferences = {
    theme: 'light',
};

export const userPreferencesSlice = createSlice({
    name: 'userPreferences',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        }
    }
});
