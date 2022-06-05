import {useQuery, UseQueryResult} from 'react-query';
import {getUserOrders} from '../../api/urbaninfusion/public/orders';
import {OrderDto} from '../../api/urbaninfusion/dto/order-dto';

export default function useUserOrders(id?: number): UseQueryResult<OrderDto[]> {
    return useQuery(
        ['orders', id],
        () => getUserOrders(id!), {
            enabled: id !== undefined,
            retry: 0,
        }
    );
}
