import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit';
import {ProductDto} from '../../api/urbaninfusion/dto/product-dto';

export type CartItem = ProductDto;

export interface Cart {
    items: CartItem[];
}

const initialState = {
    items: []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        reset: () => initialState,
        set: (state: Draft<Cart>, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
        },
        addOne: (state: Draft<Cart>, action: PayloadAction<CartItem>) => {
            state.items.push(action.payload);
        },
        addMany: (state: Draft<Cart>, action: PayloadAction<CartItem[]>) => {
            state.items = state.items.concat(action.payload);
        },
        removeOne: (state: Draft<Cart>, action: PayloadAction<CartItem>) => {
            const index = state.items.findIndex(e => e.id === action.payload.id);
            if (index > -1) {
                state.items.splice(index, 1);
            }
        }
    }
});
