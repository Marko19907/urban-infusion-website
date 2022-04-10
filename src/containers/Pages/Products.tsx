import {Box, Stack, Typography, useTheme} from '@mui/material';
import {getProducts} from '../../api/urbaninfusion/public/products';
import {ProductsList} from '../../components/Pages/Products/ProductsList';
import {useParams} from 'react-router-dom';
import SideNavigation from '../../components/SideNavigation';
import Page from '../../components/Wrappers/Page';
import {useQuery} from 'react-query';
import {getCategories} from '../../api/urbaninfusion/public/categories';


export default function Products() {
    const {id} = useParams();
    const theme = useTheme();

    const {isLoading, data: products} = useQuery(
        'products',
        () => getProducts()
    );

    const {isLoading: isLoadingCategories, data: categories} = useQuery(
        'categories',
        () => getCategories()
    );

    return (
        <>
            <Page isLoading={isLoading || isLoadingCategories}>
                <Box sx={{
                    display: 'flex',
                    width: '100%'
                }}>
                    {
                        categories && (
                            <SideNavigation
                                items={categories}
                                header={'Products'}
                                path={'products'}
                            />
                        )
                    }
                    {
                        products ? (
                            <ProductsList products={products} id={id}/>
                        ) : (
                            <Stack
                                direction={'column'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                width={'100%'}
                                height={`calc(100vh - ${theme.mixins.toolbar.minHeight}px)`}
                            >
                                <Typography variant={'h5'} component={'h1'}>No products to show!</Typography>
                            </Stack>
                        )
                    }
                </Box>
            </Page>
        </>
    );
}
