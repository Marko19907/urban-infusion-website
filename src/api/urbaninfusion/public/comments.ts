import {ProductDto} from '../dto/product-dto';
import {store} from '../../../state/store';
import axios from 'axios';
import {baseUrl} from './public';
import {AddCommentDto} from '../dto/comment-dto';

export async function updateComment(data: Partial<ProductDto>): Promise<any> {
    const jwt = store.getState().user.jwt || '';
    return (await axios.patch(`${baseUrl}/comments`,
        {...data},
        {headers: {Authorization: jwt}}
    ));
}

export async function deleteComment(id: number): Promise<any> {
    const jwt = store.getState().user.jwt || '';
    return (await axios.delete(`${baseUrl}/comments/${id}`,
        {headers: {Authorization: jwt}}
    ));
}

export async function addComment(data: AddCommentDto): Promise<any> {
    const jwt = store.getState().user.jwt || '';
    return (await axios.post(`${baseUrl}/comments`,
        {...data},
        {headers: {Authorization: jwt}}
    ));
}
