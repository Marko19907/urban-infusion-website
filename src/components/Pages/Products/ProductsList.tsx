import ProductCard from '../../ProductCard';
import {ProductDto} from '../../../api/urbaninfusion/dto/product-dto';
import {Box, Stack, useTheme} from '@mui/material';
import {range} from 'lodash-es';
import ProductCardNew from '../../ProductCardNew';
import {useNavigate} from 'react-router-dom';

interface Props {
    id?: string;
    products: ProductDto[];
}

export function ProductsList(props: Props) {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <>
            <Box
                padding={4}
                sx={{
                    overflowY: 'auto',
                    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
                }}
            >
                <Stack
                    flexWrap={'wrap'}
                    direction={'row'}
                >
                {
                    range(3).map(item =>
                        <ProductCard
                            key={item}
                            title={'Title'}
                            price={9.99}
                            image_url={'https://i.imgur.com/ZG4W7Le.jpg'}
                            sx={{
                                marginRight: 4,
                                marginBottom: 4
                            }}
                        />
                    )
                }
                {
                    props.products.map(product =>
                        <ProductCardNew
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            image_url={'https://i.imgur.com/ZG4W7Le.jpg'}
                            onClick={() => navigate(`/product/${product.id}`)}
                            sx={{
                                marginRight: 4,
                                marginBottom: 4
                            }}
                        />
                    )
                }
                </Stack>
            </Box>
        </>
    );
}
