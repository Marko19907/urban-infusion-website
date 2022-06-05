import {useMutation, useQueryClient} from 'react-query';
import {updateComment} from '../../api/urbaninfusion/public/comments';
import {UpdateCommentDto} from '../../api/urbaninfusion/dto/comment-dto';

export const useUpdateComment = () => {
    const query = useQueryClient();
    return useMutation(
        (data: UpdateCommentDto) => updateComment(data), {
            onSuccess: () => query.invalidateQueries(['product'])
        }
    );
};
