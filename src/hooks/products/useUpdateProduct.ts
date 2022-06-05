import {useMutation, useQueryClient} from 'react-query';
import {updateProduct} from '../../api/urbaninfusion/public/products';
import {ProductDto} from '../../api/urbaninfusion/dto/product-dto';

export const useUpdateProduct = () => {
    const query = useQueryClient();

    return useMutation(
        (data: Partial<ProductDto>) => updateProduct(data), {
            onSuccess: async () => {
                await query.invalidateQueries('products');
                await query.invalidateQueries('categories');
            }
        }
    );
};
