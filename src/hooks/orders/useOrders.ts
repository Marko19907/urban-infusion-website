import {useQuery, UseQueryResult} from 'react-query';
import {OrderDto} from '../../api/urbaninfusion/dto/order-dto';
import {getOrders} from '../../api/urbaninfusion/public/orders';

export default function useOrders(): UseQueryResult<OrderDto[]> {
    return useQuery(
        'orders',
        () => getOrders(), {
            retry: 0,
        }
    );
}
