import {ProductDto} from '../dto/product-dto';
import axios from 'axios';
import {baseUrl} from './public';

export async function getProducts(): Promise<ProductDto[]> {
    return (await axios.get<ProductDto[]>(`${baseUrl}/products`)).data;
}

export async function getProductById(id: string): Promise<ProductDto> {
    return (await axios.get<ProductDto>(`${baseUrl}/products/${id}`)).data;
}
