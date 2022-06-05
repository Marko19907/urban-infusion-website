import {useMutation, useQueryClient} from 'react-query';
import {UserDto} from '../../api/urbaninfusion/dto/user-dto';
import {updateUser} from '../../api/urbaninfusion/public/users';

export const useUpdateUser = () => {
    const query = useQueryClient();

    return useMutation(
        (data: UserDto) => updateUser(data), {
            onSuccess: () => query.invalidateQueries(['user'])
        }
    );
};
