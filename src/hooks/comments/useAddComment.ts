import {useMutation, useQueryClient} from 'react-query';
import {addComment} from '../../api/urbaninfusion/public/comments';
import {AddCommentDto} from '../../api/urbaninfusion/dto/comment-dto';

export const useAddComment = () => {
    const query = useQueryClient();
    return useMutation(
        (data: AddCommentDto) => addComment(data), {
            onSuccess: () => query.invalidateQueries(['product'])
        }
    );
};
