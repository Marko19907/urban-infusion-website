import {Alert, Divider, Grid, InputAdornment, Snackbar, Stack, TextField, Typography, useTheme} from '@mui/material';
import {useParams} from 'react-router-dom';
import Page from '../../components/Wrappers/Page';
import useProducts from '../../hooks/products/useProducts';
import React, {useMemo, useState} from 'react';
import ProductsFilter from '../../components/Pages/Products/ProductsFilter';
import ProductCard from '../../components/Cards/product-card/ProductCard';
import {getProductImageURL} from '../../api/urbaninfusion/public/products';
import {ProductDto} from '../../api/urbaninfusion/dto/product-dto';
import {RootState} from '../../state/store';
import {cartSlice} from '../../state/slices/cart';
import {connect} from 'react-redux';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export enum OrderOption {
    ASCENDING = 'ascending',
    DESCENDING = 'descending',
}

export enum SortOption {
    PRICE = 'price',
    NAME = 'name',
    DISCOUNT = 'discount',
    WEIGHT = 'weight'
}

const mapStateToProps = (state: RootState) => {
    return {
        cart: state.cart.items,
    };
};

const mapDispatchToProps = {
    addToCart: cartSlice.actions.addOne
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {};

export default connect(mapStateToProps, mapDispatchToProps)(Products);

function Products(props: Props) {
    const {isLoading, data: products} = useProducts();

    const theme = useTheme();
    const {id} = useParams();

    const [order, setOrder] = useState<OrderOption>(OrderOption.DESCENDING);
    const [sort, setSort] = useState<SortOption>(SortOption.NAME);
    const [success, setSuccess] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('Success!');
    const [search, setSearch] = useState<string>('');

    const filtered = useMemo(() => {
        let temp = [...(products || [])];

        temp = temp.filter(product =>
            id === 'all' || id?.toLowerCase() === product.category.toLowerCase()
        );

        temp = {
            [SortOption.NAME]: () => temp.sort((a, b) => a.title.localeCompare(b.title)),
            [SortOption.PRICE]: () => temp.sort((a, b) => b.price - a.price),
            [SortOption.DISCOUNT]: () => temp.sort((a, b) => b.discount - a.discount),
            [SortOption.WEIGHT]: () => temp.sort((a, b) => a.title.localeCompare(b.title)),
        }[sort]() || temp;

        if (order === OrderOption.ASCENDING) {
            temp = temp.reverse();
        }

        return temp.filter(e => e.title.toLowerCase().indexOf(search.toLowerCase()) !== -1);
    }, [products, id, sort, order, search]);

    const handleSort = (newValue: SortOption) => {
        setSort(newValue);
    };

    const handleOrder = (newValue: OrderOption) => {
        setOrder(newValue);
    };

    const handleAddToCart = (product: ProductDto) => {
        props.addToCart(product);
        setSuccess(true);
        setSuccessMessage('Item added to cart!');
    };

    return (
        <>
            <Snackbar
                open={success}
                onClose={() => setSuccess(false)}
                autoHideDuration={500}
                anchorOrigin={{horizontal: 'center', vertical: 'top'}}
            >
                <Alert severity={'success'}>{successMessage}</Alert>
            </Snackbar>
            <Page isLoading={isLoading}>
                <Stack width={'100%'} alignItems={'center'} px={4}>
                    <Stack
                        maxWidth={theme.breakpoints.values.lg}
                        width={'100%'}
                        py={4}
                        spacing={4}
                        direction={'row'}
                        sx={{
                            overflowY: 'auto',
                            '-webkit-scrollbar': {
                                display: 'none',
                            },
                            '-ms-overflow-style': 'none',
                            scrollbarWidth: 0,
                        }}
                    >
                        <TextField
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            InputProps={{
                                startAdornment: <InputAdornment
                                    position={'start'}><SearchOutlinedIcon/></InputAdornment>,
                            }}
                            sx={{minWidth: 150}}
                            placeholder={'Type here...'}
                            size={'small'}
                            label={'Search'}
                        />
                        <ProductsFilter
                            sort={sort}
                            order={order}
                            onSort={handleSort}
                            onOrder={handleOrder}
                        />
                    </Stack>
                    <Divider flexItem sx={{width: '100vw', marginLeft: -4}}/>
                    <Stack
                        py={4}
                        maxWidth={theme.breakpoints.values.lg}
                        width={'100%'}
                    >
                        {
                            filtered && filtered.length > 0 ? (
                                <Grid container spacing={4}>
                                    {
                                        filtered.map(product => (
                                            <Grid item md={3} sm={6} xs={12} key={product.id}>
                                                <ProductCard
                                                    sx={{height: '100%'}}
                                                    addable
                                                    onAddToCart={handleAddToCart}
                                                    data={product}
                                                    img={getProductImageURL(product.imageId)}
                                                />
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            ) : (
                                <Stack
                                    color={theme.palette.text.disabled}
                                    width={'100%'}
                                >
                                    <Typography variant={'h5'}>No products</Typography>
                                </Stack>
                            )
                        }
                    </Stack>
                </Stack>
            </Page>
        </>
    );
}
