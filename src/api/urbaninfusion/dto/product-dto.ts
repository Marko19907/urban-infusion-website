import {CommentDto} from './comment-dto';

export interface ProductDto {
    id: number;
    price: number;
    discount: number;
    image: Object;
    title: string;
    description: string;
    weigh: string;
    comments: CommentDto[];
}
