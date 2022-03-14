import {UserDto} from './user-dto';

export interface CommentDto {
    id: number;
    user: UserDto;
    text: string;
    lastUpdated: string;
    created: string;
}
