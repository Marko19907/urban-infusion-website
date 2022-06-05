import Section from '../../components/Wrappers/Section';
import {RootState} from '../../state/store';
import {CartItem, cartSlice} from '../../state/slices/cart';
import {connect} from 'react-redux';
import Page from '../../components/Wrappers/Page';
import {Button, Divider, Stack, Typography, useTheme} from '@mui/material';
import {getProductImageURL} from '../../api/urbaninfusion/public/products';
import UnstyledLink from '../../components/UnstyledLink';
import Counter from '../../components/Counter';
import {getCartItems, getTotalPrice, getTotalSavings} from '../../utils/cartUtils';

const mapStateToProps = (state: RootState) => {
    return {
        cart: state.cart.items,
    };
};

const mapDispatchToProps = {
    addOne: cartSlice.actions.addOne,
    removeOne: cartSlice.actions.removeOne,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

interface CountedCartItem {
    item: CartItem;
    count: number;
}

function Cart(props: Props) {
    const theme = useTheme();

    const handleIncreaseCount = (item: CartItem) => {
        props.addOne(item);
    };

    const handleDecreaseCount = (item: CartItem) => {
        props.removeOne(item);
    };

    return (
        <>
            <Page>
                <Section>
                    {
                        <Stack direction={'column'} width={'100%'} textAlign={'right'} spacing={4}>
                            <Stack direction={'row'}>
                                <Typography flex={1} textAlign={'left'}>Product</Typography>
                                <Typography flex={1}>Price</Typography>
                                <Typography flex={1}>Quantity</Typography>
                                <Typography flex={1}>Total</Typography>
                            </Stack>
                            <Divider/>
                            <Stack spacing={4}>
                                {
                                    props.cart.length > 0
                                        ? getCartItems(props.cart).map(({item, count, itemPrice, itemTotalPrice}) => (
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
                                                            <Typography variant={'body2'}
                                                                        color={theme.palette.text.secondary}>
                                                                {item.weight}
                                                            </Typography>
                                                        </Stack>
                                                    </UnstyledLink>
                                                </Stack>
                                                <Typography flex={1}>${itemPrice}</Typography>
                                                <Stack flex={1}>
                                                    <Counter
                                                        sx={{alignSelf: 'end'}}
                                                        count={count}
                                                        onIncrement={() => handleIncreaseCount(item)}
                                                        onDecrement={() => handleDecreaseCount(item)}
                                                    />
                                                </Stack>
                                                <Typography flex={1}>${itemTotalPrice}</Typography>
                                            </Stack>
                                        ))
                                        : <Typography textAlign={'center'}>The cart is empty</Typography>
                                }
                            </Stack>
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
                            <Stack alignItems={'end'}>
                                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                                    <UnstyledLink to={'/products/all'}>
                                        <Button size={'large'}>Continue shopping</Button>
                                    </UnstyledLink>
                                    {
                                        props.cart.length > 0 && (
                                            <UnstyledLink to={'/checkout'}>
                                                <Button variant={'contained'} size={'large'}>Checkout</Button>
                                            </UnstyledLink>
                                        )
                                    }
                                </Stack>
                            </Stack>
                        </Stack>
                    }
                </Section>
            </Page>
        </>
    );
}
