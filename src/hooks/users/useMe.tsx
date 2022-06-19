import {useQuery, UseQueryResult} from 'react-query';
import {getMe} from '../../api/urbaninfusion/public/users';
import {UserDto} from '../../api/urbaninfusion/dto/user-dto';

export default function useMe(enabled?: boolean): UseQueryResult<UserDto> {
    return useQuery(
        ['user'],
        () => getMe(), {
            enabled: enabled,
        }
    );
}
