import {store} from '../../state/store';
import {useMutation, useQueryClient} from 'react-query';
import {UserDto} from '../../api/urbaninfusion/dto/user-dto';
import {changePassword} from '../../api/urbaninfusion/public/users';

export const useChangePassword = (user: UserDto) => {
    const query = useQueryClient();

    return useMutation(
        (password: string) => changePassword(user, password), {
            onSuccess: () => query.invalidateQueries(['user'])
        }
    );
};
