import {useMutation, useQueryClient} from 'react-query';
import {RegisterFormDto} from '../../api/urbaninfusion/dto/register-dto';
import {register} from '../../api/urbaninfusion/public/register';
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
