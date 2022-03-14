import {combineReducers, configureStore, EnhancedStore} from '@reduxjs/toolkit';
import {UserPreferences, userPreferencesSlice} from './slices/userPreferences';

// Root state that combines all the state types from the slices
export interface RootState {
    userPreferences: UserPreferences;
}

// Root reducers that combines all the available reducers
const rootReducers = combineReducers({
    userPreferences: userPreferencesSlice.reducer
});

// Create the store instance in which we specify our reducers
// In this case, its the combination of all our reducers
export const store: EnhancedStore<RootState> = configureStore({
    reducer: rootReducers
});
