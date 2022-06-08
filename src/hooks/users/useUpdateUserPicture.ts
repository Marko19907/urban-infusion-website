import {useMutation, useQueryClient} from 'react-query';
import {updateUserPicture} from '../../api/urbaninfusion/public/users';
import {UpdateUserPictureDto} from '../../api/urbaninfusion/dto/user-dto';

export const useUpdateUserPicture = () => {
    const query = useQueryClient();

    return useMutation(
        (data: UpdateUserPictureDto) => updateUserPicture(data), {
            onSuccess: () => query.invalidateQueries(['user'])
        }
    );
};
