import {useQuery, UseQueryResult} from 'react-query';
import {ProductDto} from '../../api/urbaninfusion/dto/product-dto';
import {getProducts} from '../../api/urbaninfusion/public/products';

export default function useProducts(): UseQueryResult<ProductDto[]> {
    return useQuery(
        ['products'],
        () => getProducts()
    );
}
