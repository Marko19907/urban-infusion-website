import {ProductDto} from './product-dto';
import {UserDto} from './user-dto';

export enum OrderStatus {
    RECEIVED = 'RECEIVED',
    PROCESSING = 'PROCESSING',
    SENT = 'SENT',
    DELIVERED = 'DELIVERED',
    CANCELED = 'CANCELED'
}

export interface OrderProduct {
    quantity: number;
    id: number;
    product: ProductDto;
}

export interface OrderDto {
    products: OrderProduct[];
    status: OrderStatus;
    user: UserDto;
    totalPrice: number;
    date: string;
    orderId: number;
}


export interface OrderStatusUpdateDto {
    id: number;
    status: OrderStatus;
}

export interface PostOrderProductDto {
    id: number;
    quantity: number;
}

export interface PostOrderDto {
    products: PostOrderProductDto[];
}
