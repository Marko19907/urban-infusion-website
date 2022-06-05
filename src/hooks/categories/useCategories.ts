import {useQuery, UseQueryResult} from 'react-query';
import {CategoriesDto} from '../../api/urbaninfusion/dto/categories-dto';
import {getCategories} from '../../api/urbaninfusion/public/categories';

export default function useCategories(): UseQueryResult<CategoriesDto> {
    return useQuery(
        ['categories'],
        () => getCategories(), {
            retry: 0,
        }
    );
}
