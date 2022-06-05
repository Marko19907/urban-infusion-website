import ProfileSection from '../../../components/Pages/Account/ProfileSection';
import React, {ReactElement, useEffect, useState} from 'react';
import {useChangePassword} from '../../../hooks/users/useChangePassword';
import {isValidPassword} from '../../../api/urbaninfusion/public/users';
import useMe from '../../../hooks/users/useMe';
import {RootState} from '../../../state/store';
import {connect} from 'react-redux';
import {UserDto} from '../../../api/urbaninfusion/dto/user-dto';
import {useUpdateUser} from '../../../hooks/users/useUpdateUser';
import Page from '../../../components/Wrappers/Page';
import {Alert, Snackbar} from '@mui/material';

const mapStateToProps = (state: RootState) => {
    return {
        isAuthenticated: state.user.jwt !== undefined,
    };
};

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {
    children?: ReactElement;
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

function Profile(props: Props) {
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('Could not update your information!');
    const [success, setSuccess] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('Successfully updated the information!');

    const {isLoading: isLoadingMe, data: user} = useMe(props.isAuthenticated);

    const changePasswordMutation = useChangePassword(user!);
    const updateUserMutation = useUpdateUser();

    useEffect(() => {
        setSuccess(changePasswordMutation.isSuccess);
        setSuccessMessage('Password changed successfully!');
        setError(changePasswordMutation.isError);
        setErrorMessage('Could not change the password!');
    }, [changePasswordMutation.isSuccess, changePasswordMutation.isError]);

    const handleChangePassword = async (oldPassword: string, newPassword: string, newPasswordRepeat: string) => {
        if (oldPassword === newPassword) {
            setErrorMessage('Old and new password cannot be the same!');
            setError(true);
            return;
        }
        if (newPassword !== newPasswordRepeat) {
            setErrorMessage('New and repeated passwords are not matching!');
            setError(true);
            return;
        }
        if (!await isValidPassword(oldPassword, user!)) {
            setErrorMessage('Old password is invalid!');
            setError(true);
            return;
        }
        changePasswordMutation.mutate(newPassword);
    };

    const handleUpdateUser = (data: UserDto) => {
        updateUserMutation.mutate(data);
    };

    return (
        <>
            <Page isLoading={isLoadingMe}>
                <ProfileSection
                    changePasswordSuccess={changePasswordMutation.isSuccess}
                    onChangePassword={handleChangePassword}
                    onUpdateUser={handleUpdateUser}
                    user={user}
                />
            </Page>
            <Snackbar
                open={success}
                onClose={() => setSuccess(false)}
                autoHideDuration={5000}
                anchorOrigin={{horizontal: 'center', vertical: 'top'}}
            >
                <Alert severity={'success'}>{successMessage}</Alert>
            </Snackbar>
            <Snackbar
                open={error}
                onClose={() => setError(false)}
                autoHideDuration={5000}
                anchorOrigin={{horizontal: 'center', vertical: 'top'}}
            >
                <Alert severity={'error'}>{errorMessage}</Alert>
            </Snackbar>
        </>
    );
}
