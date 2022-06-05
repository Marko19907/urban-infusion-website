import {useMutation, useQueryClient} from 'react-query';
import {RegisterFormDto} from '../../api/urbaninfusion/dto/register-dto';
import {register} from '../../api/urbaninfusion/public/register';

export const useRegister = () => {
    const query = useQueryClient();

    return useMutation(
        (data: RegisterFormDto) => register(data)
    );
};
