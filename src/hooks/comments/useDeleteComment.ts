import {useMutation, useQueryClient} from 'react-query';
import {deleteComment} from '../../api/urbaninfusion/public/comments';

export const useDeleteComment = () => {
    const query = useQueryClient();
    return useMutation(
        (id: number) => deleteComment(id), {
            onSuccess: () => query.invalidateQueries(['product'])
        }
    );
};
