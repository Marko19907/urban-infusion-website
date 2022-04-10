import {CategoriesDto} from '../dto/categories-dto';
import {baseUrl} from './public';
import axios from 'axios';

export async function getCategories(): Promise<CategoriesDto> {
    return (await axios.get<CategoriesDto>(`${baseUrl}/products/categories`)).data;
}
