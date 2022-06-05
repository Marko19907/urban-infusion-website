import Page from '../../components/Wrappers/Page';
import Section from '../../components/Wrappers/Section';
import {connect} from 'react-redux';
import React, {ReactElement, useEffect, useState} from 'react';
import {RootState} from '../../state/store';
import {useNavigate} from 'react-router-dom';
import SectionCard, {SectionCardItem} from '../../components/Cards/SectionCard';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import {
    Alert,
    Button,
    Divider,
    FormControlLabel,
    Radio,
    RadioGroup,
    Snackbar,
    Stack,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import useMe from '../../hooks/users/useMe';
import PaymentIcon from '@mui/icons-material/Payment';
import VippsLogo from '../../assets/images/vipps-logo.svg';
import MastercardLogo from '../../assets/images/mastercard-logo.svg';
import VisaLogo from '../../assets/images/visa-logo.svg';
import {getCartItems, getTotalPrice, getTotalSavings} from '../../utils/cartUtils';
import UnstyledLink from '../../components/UnstyledLink';
import {getProductImageURL} from '../../api/urbaninfusion/public/products';
import Counter from '../../components/Counter';
import {cartSlice} from '../../state/slices/cart';
import {usePostOrder} from '../../hooks/orders/usePostOrder';

const mapStateToProps = (state: RootState) => {
    return {
        isAuthenticated: state.user.jwt !== undefined,
        cart: state.cart.items
    };
};

const mapDispatchToProps = {
    increment: cartSlice.actions.addOne,
    decrement: cartSlice.actions.removeOne,
    resetCart: cartSlice.actions.reset
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {
    children?: ReactElement;
};

function Checkout(props: Props) {
    const navigate = useNavigate();
    const theme = useTheme();

    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('An error has occured');

    const [success, setSuccess] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('Success!');

    const postOrderMutation = usePostOrder();

    const {isLoading: isLoadingMe, data: me} = useMe();

    const isLoading = isLoadingMe;

    useEffect(() => {
        if (!props.isAuthenticated) {
            navigate('/login');
        }
        if (props.cart.length <= 0) {
            navigate('/cart');
        }
    }, [props.isAuthenticated, props.cart]);

    useEffect(() => {
        if (postOrderMutation.isSuccess) {
            setSuccessMessage('Order placed successfully! Redirecting...');
            setSuccess(true);
            const timeout = setTimeout(() => {
                navigate('/account/orders');
                props.resetCart();
            }, 2000);
            return () => {
                clearTimeout(timeout);
            };
        } else if (postOrderMutation.isError) {
            const msg = (postOrderMutation.error as any)?.response?.data || 'Unknown error occured, could not place the order, please try again...';
            setErrorMessage(msg);
            setError(true);
        }
    }, [postOrderMutation.isSuccess, postOrderMutation.isError]);

    const handlePlaceOrder = () => {
        postOrderMutation.mutate({
            products: getCartItems(props.cart)
                .map(({item, count}) => ({
                    id: item.id,
                    quantity: count
                }))
        });
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
                autoHideDuration={5000}
                onClose={() => setError(false)}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert severity={'error'}>{errorMessage}</Alert>
            </Snackbar>
            <Page isLoading={isLoading}>
                <form onSubmit={(e) => e.preventDefault()}>
                    {
                        !isLoading && (
                            <Section>
                                <Stack
                                    spacing={8}
                                    width={'100%'}
                                    direction={{md: 'row', xs: 'column'}}
                                >
                                    <Stack flex={1} spacing={4}>
                                        <SectionCard header={'Shipping address'} icon={<LocalShippingOutlinedIcon/>}>
                                            <SectionCardItem>
                                                <TextField
                                                    required
                                                    label={'Phone number'}
                                                    defaultValue={me!.phone_number}
                                                />
                                            </SectionCardItem>
                                            <SectionCardItem>
                                                <TextField
                                                    required
                                                    label={'City'}
                                                    defaultValue={me!.city}
                                                />
                                            </SectionCardItem>
                                            <SectionCardItem>
                                                <TextField
                                                    required
                                                    label={'Zipcode'}
                                                    defaultValue={me!.zipcode}
                                                />
                                            </SectionCardItem>
                                            <SectionCardItem>
                                                <TextField
                                                    required
                                                    label={'Address'}
                                                    defaultValue={me!.address}
                                                />
                                            </SectionCardItem>
                                        </SectionCard>
                                        <SectionCard header={'Payment'} icon={<PaymentIcon/>}>
                                            <RadioGroup defaultValue={'card'}>
                                                <SectionCardItem>
                                                    <FormControlLabel
                                                        value={'card'}
                                                        control={<Radio/>}
                                                        label={<Stack direction={'row'} alignItems={'center'} spacing={4}>
                                                            <Typography>Card</Typography>
                                                            <img style={{height: 32, width: 48}} src={VisaLogo} alt={''}/>
                                                            <img style={{height: 32, width: 48}} src={MastercardLogo}
                                                                 alt={''}/>
                                                        </Stack>}
                                                    />
                                                </SectionCardItem>
                                                <SectionCardItem>
                                                    <FormControlLabel
                                                        value={'vipps'}
                                                        control={<Radio/>}
                                                        label={
                                                            <Stack>
                                                                <img style={{height: 32}} src={VippsLogo} alt={''}/>
                                                            </Stack>
                                                        }
                                                    />
                                                </SectionCardItem>
                                                <SectionCardItem>
                                                    <FormControlLabel
                                                        value={'invoice'}
                                                        control={<Radio/>}
                                                        label={'Invoice 14 days'}
                                                    />
                                                </SectionCardItem>
                                            </RadioGroup>
                                        </SectionCard>
                                    </Stack>
                                    <Stack flex={1} spacing={4}>
                                        <Typography variant={'h5'}>Summary</Typography>
                                        <Divider/>
                                        {
                                            getCartItems(props.cart).map(({item, count, itemPrice, itemTotalPrice}) => (
                                                <Stack direction={'row'} alignItems={'center'} key={item.id}>
                                                    <Stack flex={1} direction={'row'} alignItems={'center'} spacing={2}>
                                                        <UnstyledLink to={`/product/${item.id}`}>
                                                            <img
                                                                style={{height: 64, width: 64}}
                                                                src={getProductImageURL(item.imageId)}
                                                                alt={''}
                                                            />
                                                        </UnstyledLink>
                                                        <UnstyledLink to={`/product/${item.id}`}>
                                                            <Stack flex={1} textAlign={'left'}>
                                                                <Typography>
                                                                    {item.title}
                                                                </Typography>
                                                            </Stack>
                                                        </UnstyledLink>
                                                    </Stack>
                                                    <Typography flex={1} textAlign={'center'}>${itemPrice}</Typography>
                                                    <Stack flex={1}>
                                                        <Counter
                                                            sx={{alignSelf: 'end'}}
                                                            count={count}
                                                            onIncrement={() => props.increment(item)}
                                                            onDecrement={() => props.decrement(item)}
                                                        />
                                                    </Stack>
                                                    <Typography flex={1} textAlign={'right'}>${itemTotalPrice}</Typography>
                                                </Stack>
                                            ))
                                        }
                                        <Divider/>
                                        <Stack spacing={2}>
                                            <Stack justifyContent={'space-between'} direction={'row'}>
                                                <Typography>Subtotal</Typography>
                                                <Typography fontWeight={600}>${getTotalPrice(props.cart)}</Typography>
                                            </Stack>
                                            <Stack justifyContent={'space-between'} direction={'row'}>
                                                <Typography sx={{color: theme.palette.success.main}}>
                                                    Savings on this order
                                                </Typography>
                                                <Typography fontWeight={600} sx={{color: theme.palette.success.main}}>
                                                    ${getTotalSavings(props.cart)}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <Divider/>
                                        <Button
                                            onClick={handlePlaceOrder}
                                            size={'large'}
                                            type={'submit'}
                                            variant={'contained'}
                                            disabled={postOrderMutation.isSuccess}
                                        >
                                            Order now (${getTotalPrice(props.cart)})
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Section>
                        )
                    }
                </form>
            </Page>
        </>
    );
}
