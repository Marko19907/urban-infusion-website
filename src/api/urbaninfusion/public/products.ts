import {ProductDto} from '../dto/product-dto';
import axios from 'axios';
import {getPath} from '../urbaninfusion';

export async function getProducts(): Promise<ProductDto[]> {
    return (await axios.get<ProductDto[]>(`${getPath()}/products`)).data;
}
