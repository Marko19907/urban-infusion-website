import {useMutation, useQueryClient} from 'react-query';
import {updateOrderStatus} from '../../api/urbaninfusion/public/orders';
import {OrderStatusUpdateDto} from '../../api/urbaninfusion/dto/order-dto';

export const useUpdateOrderStatus = () => {
    const query = useQueryClient();

    return useMutation(
        (data: OrderStatusUpdateDto) => updateOrderStatus(data), {
            onSuccess: () => query.invalidateQueries(['orders'])
        }
    );
};
