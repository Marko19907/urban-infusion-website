import {
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Popover,
    Stack,
    Tab,
    Tabs,
    Typography,
    useTheme
} from '@mui/material';
import React, {ReactElement, useEffect, useState} from 'react';
import Page from '../../../components/Wrappers/Page';
import {connect} from 'react-redux';
import {RootState} from '../../../state/store';
import useMe from '../../../hooks/users/useMe';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import {userSlice} from '../../../state/slices/user';
import {UserRole} from '../../../api/urbaninfusion/dto/user-dto';
import {last} from 'lodash-es';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import {useUpdateUserPicture} from '../../../hooks/users/useUpdateUserPicture';
import {getUserImageURL} from '../../../api/urbaninfusion/public/users';
import {UserAvatar} from '../../../components/UserAvatar';

const navigation = [
    'profile',
    'orders',
    'manage orders',
    'manage products'
];

const acceptedFormats = ['image/jpg', 'image/png', 'image/jpeg', 'image/webp'].toString();

const mapStateToProps = (state: RootState) => {
    return {
        isAuthenticated: state.user.jwt !== undefined,
    };
};

const mapDispatchToProps = {
    clearJwtToken: userSlice.actions.clearJwtToken,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {
    children?: ReactElement;
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);

function Account(props: Props) {
    const [currentTab, setCurrentTab] = useState<number>(0);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const {pathname} = useLocation();

    const theme = useTheme();
    const navigate = useNavigate();

    const {isLoading: isLoadingMe, isError, data: user} = useMe(props.isAuthenticated);

    const isLoading = isLoadingMe;
    const accountActionsOpen = Boolean(anchorEl);

    const updateUserPictureMutation = useUpdateUserPicture();

    useEffect(() => {
        if (isError || !props.isAuthenticated) {
            navigate('/login');
        }
    }, [isError, props.isAuthenticated]);

    useEffect(() => {
        const path = last(pathname.split('/'))?.replace('-', ' ');
        if (path) {
            setCurrentTab(navigation.indexOf(path));
        } else {
            setCurrentTab(0);
        }
    }, [pathname]);

    const handleAccountActionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAccountActionsClose = () => {
        setAnchorEl(null);
    };

    const handleChangeTab = (newValue: number) => {
        setCurrentTab(newValue);
        navigate(`/account/${navigation[newValue].replace(' ', '-')}`);
    };

    const handleUpdateUserPicture = (event: any) => {
        updateUserPictureMutation.mutate({
            id: user?.id || -1,
            file: event.target.files[0]
        });
    };

    return (
        <>
            <Page isLoading={isLoading}>
                <Stack alignItems={'center'} px={4} py={8}>
                    <Stack width={'100%'} maxWidth={'lg'}>
                        <Stack direction={'row'} alignItems={'center'} spacing={4}>
                            <Stack position={'relative'}>
                                <UserAvatar
                                    name={user?.username}
                                    src={`${getUserImageURL(user?.id)}#${Math.random()}`}
                                    sx={{height: 64, width: 64}}
                                />
                                <Stack
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                    position={'absolute'}
                                    bottom={-10} right={-10}
                                >
                                    <label>
                                        <input
                                            hidden
                                            style={{position: 'absolute'}}
                                            type={'file'}
                                            multiple={false}
                                            accept={acceptedFormats}
                                            onChange={handleUpdateUserPicture}
                                        />
                                        <AddPhotoAlternateOutlinedIcon
                                            style={{
                                                background: theme.palette.primary.light,
                                                borderRadius: '50%',
                                                padding: 4,
                                                height: 30,
                                                width: 30,
                                                cursor: 'pointer',
                                                color: theme.palette.primary.main
                                            }}
                                        />
                                    </label>
                                </Stack>
                            </Stack>
                            <Stack flex={1}>
                                <Typography variant={'h5'}>{user?.username}</Typography>
                                <Typography color={theme.palette.text.secondary}>{user?.email}</Typography>
                            </Stack>
                            <Stack>
                                <IconButton onClick={handleAccountActionsClick}>
                                    <MoreHorizOutlinedIcon sx={{width: 28, height: 28}}/>
                                </IconButton>
                                <Popover
                                    open={accountActionsOpen}
                                    anchorEl={anchorEl}
                                    onClose={handleAccountActionsClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                >
                                    <List>
                                        <ListItem disablePadding>
                                            <ListItemButton onClick={() => props.clearJwtToken()}>
                                                <ListItemIcon><LogoutIcon/></ListItemIcon>
                                                <ListItemText primary={'Sign out'}/>
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                </Popover>
                            </Stack>
                        </Stack>
                        <Stack pt={8} pb={4}>
                            <Tabs
                                allowScrollButtonsMobile
                                variant={'scrollable'}
                                value={currentTab}
                                onChange={(_, newValue) => handleChangeTab(newValue)}
                            >
                                {
                                    navigation.map(name => (
                                        ['manage orders', 'manage products'].includes(name) && user?.role !== UserRole.ADMIN
                                            ? []
                                            : <Tab
                                                label={<Typography textTransform={'capitalize'}>{name}</Typography>}
                                                key={name}
                                            />
                                    ))
                                }
                            </Tabs>
                            <Divider flexItem/>
                        </Stack>
                        <Stack>
                            <Outlet/>
                        </Stack>
                    </Stack>
                </Stack>
            </Page>
        </>
    );
}
