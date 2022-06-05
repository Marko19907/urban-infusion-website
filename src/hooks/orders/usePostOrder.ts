import {useMutation, useQueryClient} from 'react-query';
import {PostOrderDto} from '../../api/urbaninfusion/dto/order-dto';
import {postOrder} from '../../api/urbaninfusion/public/orders';

export const usePostOrder = () => {
    const query = useQueryClient();

    return useMutation(
        (data: PostOrderDto) => postOrder(data), {
            onSuccess: () => query.invalidateQueries(['orders'])
        }
    );
};
