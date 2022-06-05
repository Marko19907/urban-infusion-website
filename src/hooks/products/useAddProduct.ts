import {useMutation, useQueryClient} from 'react-query';
import {addProduct} from '../../api/urbaninfusion/public/products';
import {AddProductDto} from '../../api/urbaninfusion/dto/product-dto';

export const useAddProduct = () => {
    const query = useQueryClient();

    return useMutation(
        (data: AddProductDto) => addProduct(data), {
            onSuccess: async () => {
                await query.invalidateQueries('products');
                await query.invalidateQueries('categories');
            }
        }
    );
};
