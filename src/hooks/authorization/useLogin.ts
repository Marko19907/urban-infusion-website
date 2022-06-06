import {useMutation, useQueryClient} from 'react-query';
import {LoginFormDto} from '../../api/urbaninfusion/dto/login-dto';
import {login} from '../../api/urbaninfusion/public/login';

export const useLogin = () => {
    const query = useQueryClient();

    return useMutation(
        (data: LoginFormDto) => login(data), {
            onSuccess: () => query.invalidateQueries(['user']),
        }
    );
};
