export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export interface UserDto {
    email: string;
    username: string;
    city: string;
    zipcode: string;
    address: string;
    phone_number: string;
    role: UserRole;
    id: number;
}

export interface UpdateUserPictureDto {
    file: any;
    id: number;
}
