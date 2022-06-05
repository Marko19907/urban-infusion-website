import {CartItem} from '../state/slices/cart';
import {countBy, round, uniqBy} from 'lodash-es';

export interface CountedCartItem {
    item: CartItem;
    itemPrice: number;
    itemTotalPrice: number;
    count: number;
}

export const getCartItems = (items: CartItem[]): CountedCartItem[] => {
    const counts = countBy(items, 'id');
    return uniqBy(items, 'id')
        .map(item => ({
            item,
            count: counts[item.id],
            itemPrice: round(item.price - (item.price * item.discount), 2),
            itemTotalPrice: round(counts[item.id] * (item.price - (item.price * item.discount)), 2),
        }))
        .sort((a, b) => {
            return b.item.id - a.item.id;
        });
};

export const getTotalPrice = (items: CartItem[]): number => {
    return round(items.reduce((acc, curr) => {
        return acc + (curr.price - (curr.price * curr.discount));
    }, 0), 2);
};

export const getTotalSavings = (items: CartItem[]): number => {
    return round(items.reduce((acc, curr) => {
        if (curr.discount > 0) {
            return acc + (curr.price * curr.discount);
        } else {
            return acc;
        }
    }, 0), 2);
};
