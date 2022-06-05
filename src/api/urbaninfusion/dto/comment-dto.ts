import {UserDto} from './user-dto';

export interface AddCommentDto {
    id: number;
    text: string;
}

export interface UpdateCommentDto {
    id: number;
    text: string;
}

export interface CommentDto {
    id: number;
    user: UserDto;
    text: string;
    lastUpdated: string;
    created: string;
}
