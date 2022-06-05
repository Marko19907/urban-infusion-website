import {CommentDto} from './comment-dto';

export interface ProductDto {
    id: number;
    price: number;
    discount: number;
    imageId?: number;
    title: string;
    description: string;
    weight: string;
    comments: CommentDto[];
    category: string;
}

export interface UpdateProductPictureDto {
    file: any;
    id: number;
}

export type AddProductDto = Partial<ProductDto> & Pick<ProductDto, 'price' | 'title' | 'category'>;
