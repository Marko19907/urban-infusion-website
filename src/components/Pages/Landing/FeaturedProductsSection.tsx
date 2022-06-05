import Section from '../../Wrappers/Section';
import {Grid, useTheme} from '@mui/material';
import {ProductDto} from '../../../api/urbaninfusion/dto/product-dto';
import ProductCard from '../../Cards/product-card/ProductCard';
import {range, sampleSize} from 'lodash-es';
import {getProductImageURL} from '../../../api/urbaninfusion/public/products';

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

    return (
        <>
            <Section bgColor={theme.palette.primary.light} sx={{my: 16}} label={'Featured'}>
                <Grid container spacing={4}>
                    {
                        getFeaturedProducts(4)?.map(product => (
                            <Grid item md={3} xs={6}>
                                <ProductCard
                                    sx={{height: '100%'}}
                                    key={product.id}
                                    data={product}
                                    img={getProductImageURL(product.imageId)}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
            </Section>
        </>
    );
}
