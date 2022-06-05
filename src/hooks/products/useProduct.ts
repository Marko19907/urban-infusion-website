import {useQuery, UseQueryResult} from 'react-query';
import {ProductDto} from '../../api/urbaninfusion/dto/product-dto';
import {getProductById} from '../../api/urbaninfusion/public/products';

export default function useProduct(id?: string): UseQueryResult<ProductDto> {
    return useQuery(
        ['product', id],
        () => getProductById(id!), {
            enabled: id !== undefined,
        }
    );
}
