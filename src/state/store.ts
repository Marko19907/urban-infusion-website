import {combineReducers, createStore, EnhancedStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {UserPreferences, userPreferencesSlice} from './slices/userPreferences';

// Root state that combines all the state types from the slices
export interface RootState {
    userPreferences: UserPreferences;
}

// Root reducers that combines all the available reducers
const rootReducer = combineReducers({
    userPreferences: userPreferencesSlice.reducer
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store instance in which we specify our reducers
// In this case, its the combination of all our reducers
export const store: EnhancedStore<RootState> = createStore(persistedReducer);

export const persistor = persistStore(store);
