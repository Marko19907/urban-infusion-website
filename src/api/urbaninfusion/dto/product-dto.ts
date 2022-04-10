import {CommentDto} from './comment-dto';

export interface ProductDto {
    id: number;
    price: number;
    discount: number;
    image: Object;
    title: string;
    description: string;
    weight: string;
    comments: CommentDto[];
    category: string;
}
