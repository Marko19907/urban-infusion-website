import {
    Avatar,
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
import {stringToColor} from '../../../utils/utils';

const navigation = [
    'profile',
    'orders',
    'manage orders',
    'manage products'
];

const mapStateToProps = (state: RootState) => {
    return {
        jwt: state.user.jwt,
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

    useEffect(() => {
        if (isError || !props.jwt) {
            navigate('/login');
        }
    }, [isError, props.jwt]);

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

    return (
        <>
            <Page isLoading={isLoading}>
                <Stack alignItems={'center'} px={4} py={8}>
                    <Stack width={'100%'} maxWidth={'lg'}>
                        <Stack direction={'row'} alignItems={'center'} spacing={4}>
                            <Avatar sx={{height: 64, width: 64, background: stringToColor(user?.username)}}>
                                <Typography variant={'h4'}>{user?.username[0]}</Typography>
                            </Avatar>
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
