import {useMutation, useQueryClient} from 'react-query';
import {deleteProduct} from '../../api/urbaninfusion/public/products';

export const useDeleteProduct = () => {
    const query = useQueryClient();

    return useMutation(
        (id: number) => deleteProduct(id), {
            onSuccess: async () => {
                await query.invalidateQueries('products');
                await query.invalidateQueries('categories');
            }
        }
    );
};
