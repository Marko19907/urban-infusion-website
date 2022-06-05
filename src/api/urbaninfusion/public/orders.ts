import axios from 'axios';
import {baseUrl} from './public';
import {store} from '../../../state/store';
import {OrderDto, OrderStatusUpdateDto, PostOrderDto} from '../dto/order-dto';


export async function getUserOrders(id: number): Promise<OrderDto[]> {
    const jwt = store.getState().user.jwt || '';
    return (await axios.get<OrderDto[]>(`${baseUrl}/orders/users/${id}`,
        {headers: {Authorization: jwt}}
    )).data;
}

export async function getOrders(): Promise<OrderDto[]> {
    const jwt = store.getState().user.jwt || '';
    return (await axios.get<OrderDto[]>(`${baseUrl}/orders`,
        {headers: {Authorization: jwt}}
    )).data;
}

export async function updateOrderStatus(data: OrderStatusUpdateDto): Promise<any> {
    const jwt = store.getState().user.jwt || '';
    return (await axios.patch(`${baseUrl}/orders`,
        {...data},
        {headers: {Authorization: jwt}}
    ));
}

export async function postOrder(data: PostOrderDto) {
    const jwt = store.getState().user.jwt || '';
    return (await axios.post(`${baseUrl}/orders`,
        {...data},
        {headers: {Authorization: jwt}}
    ));
}
