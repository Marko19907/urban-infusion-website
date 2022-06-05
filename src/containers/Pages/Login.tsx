import {
    Alert,
    Button,
    CircularProgress,
    InputAdornment,
    Paper,
    Snackbar,
    Stack,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import Page from '../../components/Wrappers/Page';
import {NavLink, useNavigate} from 'react-router-dom';
import Background from '../../assets/images/teashop-background.jpg';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {useEffect, useState} from 'react';
import {RootState} from '../../state/store';
import {connect} from 'react-redux';
import {userSlice} from '../../state/slices/user';
import PasswordField from '../../components/PasswordField';
import {useLogin} from '../../hooks/authorization/useLogin';

const mapStateToProps = (state: RootState) => {
    return {
        isAuthenticated: state.user.jwt !== undefined,
    };
};

const mapDispatchToProps = {
    setJwtToken: userSlice.actions.setJwtToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function Login(props: Props) {
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const useLoginMutation = useLogin();
    const loading = useLoginMutation.isLoading;

    const theme = useTheme();
    const navigate = useNavigate();

    const onEnter = async (event: KeyboardEvent) => {
        if (event.code === 'Enter') {
            await handleLogin();
        }
    };

    useEffect(() => {
        if (props.isAuthenticated) {
            navigate('/account');
        }
        window.addEventListener('keyup', onEnter, false);
        return () => {
            window.removeEventListener('keyup', onEnter, false);
        };
    }, [props.isAuthenticated, onEnter]);

    const handleLogin = async () => {
        try {
            props.setJwtToken((await useLoginMutation.mutateAsync({username, password})).headers.authorization);
        } catch (error: any) {
            if (error.response.data.length > 0) {
                setErrorMessage(error.response.data);
            } else {
                setErrorMessage('Invalid username or password!');
            }
            setError(true);
        }
    };

    return (
        <>
            <Snackbar
                open={error}
                autoHideDuration={6000}
                onClose={() => setError(false)}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert severity={'error'}>{errorMessage}</Alert>
            </Snackbar>
            <Page>
                <Stack
                    sx={{
                        backgroundImage: `url(${Background})`,
                        backgroundSize: 'cover',
                    }}
                    width={'100%'}
                    height={`calc(100vh - ${theme.custom.heights.navBar + theme.custom.heights.topBar}px)`}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Paper sx={{py: 4, px: 8, width: 400}}>
                        <Stack alignItems={'center'} spacing={8}>
                            <Typography variant={'h4'}>Login</Typography>
                            <Stack width={'100%'} spacing={4}>
                                <TextField
                                    required
                                    value={username}
                                    disabled={props.isAuthenticated || loading}
                                    onChange={(event) => setUsername(event.target.value)}
                                    label={'Username'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position={'start'}>
                                                <AccountCircleOutlinedIcon/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <PasswordField
                                    value={password}
                                    disabled={props.isAuthenticated || loading}
                                    onChange={(event) => setPassword(event.target.value)}
                                    label={'Password'}
                                />
                            </Stack>
                            <Button
                                onClick={handleLogin}
                                endIcon={loading && (<CircularProgress color={'info'} size={24}/>)}
                                variant={'contained'}
                                disabled={props.isAuthenticated || loading}
                                sx={{width: '100%'}}
                            >
                                Login
                            </Button>
                            <Typography>
                                <span>Not a member? </span>
                                <NavLink to={'/register'}>Sign up</NavLink>
                            </Typography>
                        </Stack>
                    </Paper>
                </Stack>
            </Page>
        </>
    );
}
