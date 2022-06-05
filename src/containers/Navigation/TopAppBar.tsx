import {Button, Stack, Toolbar, useTheme} from '@mui/material';
import Logo from '../../components/Logo';
import {ReactElement} from 'react';
import {useNavigate} from 'react-router-dom';
import {RootState} from '../../state/store';
import {userSlice} from '../../state/slices/user';
import CartButton from '../../components/AppBarNavigation/CartButton';
import AccountButton from '../../components/AppBarNavigation/AccountButton';
import {connect} from 'react-redux';
import UnstyledLink from '../../components/UnstyledLink';
import ProductNavigation from './ProductNavigation';
import useMe from '../../hooks/users/useMe';

const mapStateToProps = (state: RootState) => {
    return {
        cartItemCount: state.cart.items.length,
        themeColor: state.user.theme,
        isAuthenticated: state.user.jwt !== undefined,
    };
};

const mapDispatchToProps = {
    toggleTheme: userSlice.actions.toggleTheme,
    setJwtToken: userSlice.actions.setJwtToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopAppBar);

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {
    children?: ReactElement;
};

function TopAppBar(props: Props) {
    const theme = useTheme();
    const navigate = useNavigate();

    const {data: user} = useMe(props.isAuthenticated);

    return (
        <>
            <Stack maxHeight={theme.custom.heights.topBar}>
                <Toolbar sx={{justifyContent: 'center'}} disableGutters>
                    <Stack
                        flex={1}
                        alignItems={'center'}
                    >
                        <Stack px={4} width={'100%'} direction={'row'} alignItems={'center'}>
                            <Stack>
                                <Logo clickable onClick={() => navigate('/')}/>
                            </Stack>
                            <Stack
                                direction={'row'}
                                spacing={2}
                                alignItems={'center'}
                                sx={{
                                    flex: 1,
                                    display: 'flex',
                                    justifyContent: 'right',
                                }}
                            >
                                <CartButton itemsCount={props.cartItemCount}/>
                                {
                                    props.isAuthenticated
                                        ? <AccountButton name={user?.username || ''}/>
                                        : (<UnstyledLink to={'/login'}>
                                            <Button variant={'contained'}>
                                                Login
                                            </Button>
                                        </UnstyledLink>)
                                }
                            </Stack>
                        </Stack>
                    </Stack>
                </Toolbar>
            </Stack>
            <ProductNavigation/>
        </>
    );
}
