import {combineReducers, createStore, EnhancedStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {User, userSlice} from './slices/user';
import {Cart, cartSlice} from './slices/cart';

// Root state that combines all the state types from the slices
export interface RootState {
    user: User;
    cart: Cart;
}

// Root reducers that combines all the available reducers
const rootReducer = combineReducers({
    user: userSlice.reducer,
    cart: cartSlice.reducer
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store instance in which we specify our reducers
// In this case, its the combination of all our reducers
export const store: EnhancedStore<RootState> = createStore(
    persistedReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);
