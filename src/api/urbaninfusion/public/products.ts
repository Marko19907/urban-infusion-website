import {AddProductDto, ProductDto, UpdateProductPictureDto} from '../dto/product-dto';
import axios from 'axios';
import {baseUrl} from './public';
import {store} from '../../../state/store';
import placeholderImage from '../../../assets/images/no-image.svg';

export async function getProducts(): Promise<ProductDto[]> {
    return (await axios.get<ProductDto[]>(`${baseUrl}/products`)).data;
}

export async function getProductById(id: string): Promise<ProductDto> {
    return (await axios.get<ProductDto>(`${baseUrl}/products/${id}`)).data;
}

export async function updateProduct(data: Partial<ProductDto>): Promise<any> {
    const jwt = store.getState().user.jwt || '';
    return (await axios.patch(`${baseUrl}/products`,
        {...data},
        {headers: {Authorization: jwt}}
    ));
}

export async function deleteProduct(id: number): Promise<any> {
    const jwt = store.getState().user.jwt || '';
    return (await axios.delete(`${baseUrl}/products/${id}`,
        {headers: {Authorization: jwt}}
    ));
}

export async function addProduct(data: AddProductDto): Promise<any> {
    const jwt = store.getState().user.jwt || '';
    return (await axios.post(`${baseUrl}/products`,
        {...data},
        {headers: {Authorization: jwt}}
    ));
}

export async function updateProductPicture(data: UpdateProductPictureDto): Promise<any> {
    const jwt = store.getState().user.jwt || '';
    const formData = new FormData();
    formData.append('data', data.file);
    return (await axios.post(`${baseUrl}/product-images/${data.id}`,
        formData,
        {headers: {Authorization: jwt, 'Content-Type': 'Multipart/form-data'}}
    ));
}

export function getProductImageURL(id?: number): string {
    return id
        ? `${baseUrl}/product-images/${id}`
        : placeholderImage;
}
