import Section from '../../Wrappers/Section';
import {Grid, Stack, Typography, useTheme} from '@mui/material';
import {ProductDto} from '../../../api/urbaninfusion/dto/product-dto';
import {range, sampleSize} from 'lodash-es';
import ProductCard from '../../Cards/product-card/ProductCard';
import {getProductImageURL} from '../../../api/urbaninfusion/public/products';
import React from 'react';

interface Props {
    products: ProductDto[];
}

export default function FeaturedProductsSection(props: Props) {
    const theme = useTheme();

    const getFeaturedProducts = (amount: number): ProductDto[] => {
        return sampleSize(range(amount), amount)
            .map(index => props.products[index])
            .filter(Boolean);
    };

    const featuredProducts = getFeaturedProducts(4);

    return (
        <>
            <Section bgColor={theme.palette.primary.light} sx={{my: 16}} label={'Featured'}>

                {
                    featuredProducts.length > 0
                        ? (
                            <Grid container spacing={4}>
                                {
                                    featuredProducts?.map(product => (
                                        <Grid item md={3} sm={6} xs={12} key={product.id}>
                                            <ProductCard
                                                sx={{height: '100%'}}
                                                data={product}
                                                img={getProductImageURL(product.imageId)}
                                            />
                                        </Grid>)
                                    )
                                }
                            </Grid>

                        )
                        : (
                            <Stack
                                alignItems={'center'}
                                width={'100%'}
                                color={theme.palette.text.disabled}
                            >
                                <Typography variant={'h5'}>No products</Typography>
                            </Stack>
                        )
                }
            </Section>
        </>
    );
}
