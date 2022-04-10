import {createDraftSafeSelector, createEntityAdapter, createSlice, EntityState, PayloadAction} from '@reduxjs/toolkit';
import {ProductDto} from '../../api/urbaninfusion/dto/product-dto';

export type CartItem = ProductDto;

export interface Cart {
    items: EntityState<CartItem>;
}

const cartAdapter = createEntityAdapter<CartItem>({
    selectId: (item) => item.id,
    sortComparer: (a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
});

const selectState = (state: Cart) => state;

export const selectCartItems = createDraftSafeSelector(
    selectState,
    state => cartAdapter.getSelectors().selectAll(state.items)
);

const initialState: Cart = {
    items: cartAdapter.getInitialState()
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        reset: () => initialState,
        set: (state, action: PayloadAction<CartItem[]>) => {
            cartAdapter.setAll(state.items, action);
        },
        add: (state, action: PayloadAction<CartItem>) => {
            cartAdapter.addOne(state.items, action);
        },
    }
});
