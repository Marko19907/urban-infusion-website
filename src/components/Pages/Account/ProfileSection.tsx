import {UserDto} from '../../../api/urbaninfusion/dto/user-dto';
import {Button, Stack, TextField} from '@mui/material';
import SectionCard, {SectionCardItem} from '../../Cards/SectionCard';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import React, {useEffect, useState} from 'react';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PasswordField from '../../PasswordField';

interface Props {
    onUpdateUser: (data: UserDto) => void;
    onChangePassword: (oldPassword: string, newPassword: string, newPasswordRepeat: string) => void;
    changePasswordSuccess: boolean;
    user?: UserDto;
}

export default function ProfileSection(props: Props) {
    const [tempUser, setTempUser] = useState<UserDto>();

    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [newPasswordRepeat, setNewPasswordRepeat] = useState<string>('');

    useEffect(() => {
        if (props.changePasswordSuccess) {
            setOldPassword('');
            setNewPassword('');
            setNewPasswordRepeat('');
        }
    }, [props.changePasswordSuccess]);

    useEffect(() => {
        if (props.user) {
            setTempUser({...props.user});
        }
    }, [props.user]);

    const updateTempData = (data: Partial<UserDto>) => {
        setTempUser({
            ...tempUser!,
            ...data
        });
    };

    const handleChangePassword = () => {
        props.onChangePassword(oldPassword, newPassword, newPasswordRepeat);
    };

    return (
        <>
            <Stack spacing={4}>
                <SectionCard header={'Personal information'} icon={<AccountCircleOutlinedIcon/>}>
                    <SectionCardItem>
                        <TextField
                            value={tempUser?.username || ''}
                            label={'Username'}
                            disabled
                        />
                    </SectionCardItem>
                    <SectionCardItem>
                        <TextField
                            label={'Email'}
                            value={tempUser?.email || ''}
                            onChange={(event) => updateTempData({email: event.target.value})}
                        />
                    </SectionCardItem>
                    <SectionCardItem>
                        <TextField
                            label={'Phone number'}
                            value={tempUser?.phone_number || ''}
                            onChange={(event) => updateTempData({phone_number: event.target.value})}
                        />
                    </SectionCardItem>
                    <SectionCardItem sx={{alignItems: 'start'}}>
                        <Button
                            startIcon={<SaveOutlinedIcon/>}
                            variant={'contained'}
                            onClick={() => props.onUpdateUser(tempUser!)}
                        >
                            Save changes
                        </Button>
                    </SectionCardItem>
                </SectionCard>
                <SectionCard header={'Change password'} icon={<ChangeCircleOutlinedIcon/>}>
                    <SectionCardItem>
                        <PasswordField
                            value={oldPassword}
                            onChange={(event) => setOldPassword(event.target.value)}
                            label={'Old Password'}
                        />
                    </SectionCardItem>
                    <SectionCardItem>
                        <PasswordField
                            verifyPassword
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}
                            label={'New Password'}
                        />
                    </SectionCardItem>
                    <SectionCardItem>
                        <PasswordField
                            verifyPassword
                            value={newPasswordRepeat}
                            onChange={(event) => setNewPasswordRepeat(event.target.value)}
                            label={'Repeat New Password'}
                        />
                    </SectionCardItem>
                    <SectionCardItem sx={{alignItems: 'start'}}>
                        <Button
                            startIcon={<ChangeCircleOutlinedIcon/>}
                            variant={'contained'}
                            onClick={() => handleChangePassword()}
                        >
                            Change password
                        </Button>
                    </SectionCardItem>
                </SectionCard>
                <SectionCard header={'Delivery information'} icon={<LocalShippingOutlinedIcon/>}>
                    <SectionCardItem>
                        <TextField
                            label={'City'}
                            value={tempUser?.city || ''}
                            onChange={(event) => updateTempData({city: event.target.value})}
                        />
                    </SectionCardItem>
                    <SectionCardItem>
                        <TextField
                            label={'Zipcode'}
                            value={tempUser?.zipcode || ''}
                            onChange={(event) => updateTempData({zipcode: event.target.value})}
                        />
                    </SectionCardItem>
                    <SectionCardItem>
                        <TextField
                            label={'Address'}
                            value={tempUser?.address || ''}
                            onChange={(event) => updateTempData({address: event.target.value})}
                        />
                    </SectionCardItem>
                    <SectionCardItem sx={{alignItems: 'start'}}>
                        <Button
                            startIcon={<SaveOutlinedIcon/>}
                            variant={'contained'}
                            onClick={() => props.onUpdateUser(tempUser!)}
                        >
                            Save changes
                        </Button>
                    </SectionCardItem>
                </SectionCard>
            </Stack>
        </>
    );
}
