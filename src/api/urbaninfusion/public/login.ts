import axios from 'axios';
import {baseUrl} from './public';
import {LoginFormDto} from '../dto/login-dto';

export async function login(data: LoginFormDto): Promise<any> {
    return (await axios.post(`${baseUrl}/login`, {...data}));
}
