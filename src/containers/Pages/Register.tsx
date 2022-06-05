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
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {useEffect, useState} from 'react';
import {register} from '../../api/urbaninfusion/public/register';
import PasswordField from '../../components/PasswordField';
import {isEmailAddress} from '../../utils/utils';

export default function Register() {
    const [loading, setLoading] = useState<boolean>(false);

    const [success, setSuccess] = useState<boolean>(false);

    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const theme = useTheme();
    const navigate = useNavigate();

    const onEnter = async (event: KeyboardEvent) => {
        if (event.code === 'Enter') {
            await handleRegister();
        }
    };

    useEffect(() => {
        window.addEventListener('keyup', onEnter, false);
        if (success) {
            window.removeEventListener('keyup', onEnter, false);
            const timeout = setTimeout(() => {
                navigate('/login');
            }, 2000);
            return () => {
                clearTimeout(timeout);
            };
        }
        return () => {
            window.removeEventListener('keyup', onEnter, false);
        };
    }, [success, onEnter]);

    const handleRegister = async () => {
        for (const length of [email.length, username.length, password.length]) {
            if (length === 0) {
                setErrorMessage('Input fields can not be blank!');
                setError(true);
                return;
            }
        }

        setLoading(true);

        await register({
            username,
            email,
            password
        })
            .then(() => {
                setSuccess(true);
            })
            .catch(e => {
                if (e.response.data.length > 0) {
                    setErrorMessage(e.response.data);
                } else {
                    setErrorMessage('Could not register!');
                }
                setError(true);
            })
            .finally(() => setLoading(false));
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
            <Snackbar
                open={success}
                autoHideDuration={6000}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert severity={'success'}>
                    Registration successful! Redirecting to the <NavLink to={'/login'}>login</NavLink> page
                </Alert>
            </Snackbar>
            <Page>
                <Stack
                    sx={{
                        backgroundImage: `url(${Background})`,
                        backgroundSize: 'cover',
                    }}
                    width={'100%'}
                    height={`calc(100vh - ${theme.mixins.toolbar.minHeight}px)`}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Paper sx={{py: 4, px: 8, width: 400}}>
                        <Stack alignItems={'center'} spacing={8}>
                            <Typography variant={'h4'}>Register</Typography>
                            <Stack width={'100%'} spacing={4}>
                                <TextField
                                    value={email}
                                    disabled={success || loading}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                    error={!isEmailAddress(email)}
                                    helperText={isEmailAddress(email) ? '' : 'Must be a valid email!'}
                                    label={'Email'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position={'start'}>
                                                <EmailOutlinedIcon/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <TextField
                                    value={username}
                                    disabled={success || loading}
                                    onChange={(event) => setUsername(event.target.value)}
                                    required
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
                                    verifyPassword={true}
                                    disabled={success || loading}
                                    onChange={(event) => setPassword(event.target.value)}
                                    label={'Password'}
                                />
                            </Stack>
                            <Stack width={'100%'}>
                                <Button
                                    endIcon={loading && (<CircularProgress color={'info'} size={24}/>)}
                                    variant={'contained'}
                                    disabled={success || loading}
                                    onClick={handleRegister}
                                >
                                    Register
                                </Button>
                            </Stack>
                            <Typography>
                                <span>Already have an account? </span>
                                <NavLink to={'/login'}>Login</NavLink>
                            </Typography>
                        </Stack>
                    </Paper>
                </Stack>
            </Page>
        </>
    );
}
