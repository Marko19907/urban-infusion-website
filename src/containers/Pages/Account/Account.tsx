import {
    Alert,
    Avatar,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Popover,
    Snackbar,
    Stack,
    Tab,
    Tabs,
    Typography,
    useTheme
} from '@mui/material';
import React, {ReactElement, ReactNode, useEffect, useState} from 'react';
import {stringToColor} from '../../../utils/avatarUtils';
import Page from '../../../components/Wrappers/Page';
import {connect} from 'react-redux';
import {RootState} from '../../../state/store';
import useMe from '../../../hooks/users/useMe';
import {useNavigate} from 'react-router-dom';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import {userSlice} from '../../../state/slices/user';
import ProfileSection from '../../../components/Pages/Account/ProfileSection';
import AdminSection from '../../../components/Pages/Account/AdminSection';
import {useUpdateUser} from '../../../hooks/users/useUpdateUser';
import {UserDto, UserRole} from '../../../api/urbaninfusion/dto/user-dto';
import useUserOrders from '../../../hooks/orders/useUserOrders';
import {useChangePassword} from '../../../hooks/users/useChangePassword';
import {isValidPassword} from '../../../api/urbaninfusion/public/users';
import Orders from '../../../components/Pages/Account/Orders';
import useOrders from '../../../hooks/orders/useOrders';
import {OrderStatusUpdateDto} from '../../../api/urbaninfusion/dto/order-dto';
import {useUpdateOrderStatus} from '../../../hooks/orders/useUpdateOrderStatus';
import {ProductsList} from '../../../components/Pages/Products/ProductsList';
import useProducts from '../../../hooks/products/useProducts';
import {useUpdateProduct} from '../../../hooks/products/useUpdateProduct';
import {useDeleteProduct} from '../../../hooks/products/useDeleteProduct';
import {useUpdateProductPicture} from '../../../hooks/products/useUpdateProductPicture';

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
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState<number>(0);
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const accountActionsOpen = Boolean(anchorEl);
    const updateUserMutation = useUpdateUser();
    const [success, setSuccess] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('Successfully updated the information!');
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('Could not update your information!');
    const {isLoading: isLoadingMe, isError, data: user} = useMe(props.isAuthenticated);
    const {isLoading: isLoadingUserOrders, data: userOrders} = useUserOrders(user?.id);
    const {isLoading: isLoadingOrders, data: orders} = useOrders();
    const {isLoading: isLoadingProducts, data: products} = useProducts();
    const updateProductMutation = useUpdateProduct();
    const deleteProductMutation = useDeleteProduct();
    const changePasswordMutation = useChangePassword(user!);
    const updateOrderStatusMutation = useUpdateOrderStatus();
    const updateProductPictureMutation = useUpdateProductPicture();

    const isLoading = isLoadingMe || isLoadingUserOrders || isLoadingOrders || isLoadingProducts;

    useEffect(() => {
        setSuccess(updateUserMutation.isSuccess);
        setSuccessMessage('Information updated successfully!');
        setError(updateUserMutation.isError);
        setErrorMessage('Could not change the information!');
    }, [updateUserMutation.isSuccess, updateUserMutation.isError]);

    useEffect(() => {
        setSuccess(changePasswordMutation.isSuccess);
        setSuccessMessage('Password changed successfully!');
        setError(changePasswordMutation.isError);
        setErrorMessage('Could not change the password!');
    }, [changePasswordMutation.isSuccess, changePasswordMutation.isError]);

    const handleUpdateUser = (data: UserDto) => {
        updateUserMutation.mutate(data);
    };

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

    useEffect(() => {
        if (isError || !props.jwt) {
            navigate('/login');
        }
    }, [isError, props.jwt]);

    const renderSection = (name: string): ReactNode => {
        return {
            profile: (<ProfileSection
                changePasswordSuccess={changePasswordMutation.isSuccess}
                onChangePassword={handleChangePassword}
                onUpdateUser={handleUpdateUser}
                user={user}
            />),
            orders: (<Orders orders={userOrders || []}/>),
            admin: <AdminSection/>,
            'manage orders': (<Orders
                admin
                orders={orders}
                onChangeStatus={onOrderStatusChange}
            />),
            'manage products': (
                <ProductsList
                    products={products}
                    onDeleteProduct={deleteProductMutation.mutate}
                    onUpdateProduct={updateProductMutation.mutate}
                    onUpdateProductPicture={updateProductPictureMutation.mutate}
                    isLoading={deleteProductMutation.isLoading || updateProductMutation.isLoading || updateProductPictureMutation.isLoading}
                    admin
                />
            )
        }[name] || <></>;
    };

    const handleAccountActionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAccountActionsClose = () => {
        setAnchorEl(null);
    };

    const onOrderStatusChange = (newOrder: OrderStatusUpdateDto) => {
        updateOrderStatusMutation.mutate(newOrder);
    };

    return (
        <>
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
            <Page isLoading={isLoading}>
                <Stack alignItems={'center'} px={4} py={8}>
                    <Stack spacing={8} width={'100%'} maxWidth={'lg'}>
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
                        <Stack>
                            <Tabs
                                allowScrollButtonsMobile
                                variant={'scrollable'}
                                value={currentTab}
                                onChange={(_, newValue) => setCurrentTab(newValue)}
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
                            {
                                navigation.map((name, index) => (
                                    <Stack
                                        pt={4}
                                        sx={{display: currentTab === index ? 'default' : 'none'}}
                                        key={`${name}${index}`}
                                    >
                                        {renderSection(name)}
                                    </Stack>
                                ))
                            }
                        </Stack>
                    </Stack>
                </Stack>
            </Page>
        </>
    );
}