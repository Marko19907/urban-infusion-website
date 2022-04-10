import Section from '../../Wrappers/Section';
import {Box, Button, Grid, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {range} from 'lodash-es';
import ProductCard from '../../ProductCard';
import ProductCardNew from '../../ProductCardNew';

export default function FeaturedProductsSection() {
    const navigate = useNavigate();

    return (
        <>
            <Section>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Typography
                        variant={'h4'}
                        component={'h4'}
                        sx={{
                            textAlign: 'center',
                            marginBottom: 12,
                        }}
                    >
                        Featured products
                    </Typography>
                    <Grid
                        container
                        sx={{
                            justifyContent: 'space-around',
                            width: '100%',
                            marginBottom: 16,
                            rowGap: 12,
                        }}
                    >
                        {
                            range(2).map((i) => (
                                <Grid
                                    container
                                    key={i}
                                    item
                                    xs={12} sm={6} lg={3}
                                    sx={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <ProductCard
                                        key={i}
                                        title={'Title'}
                                        price={9.99}
                                        image_url={'https://i.imgur.com/ZG4W7Le.jpg'}
                                    />
                                </Grid>
                            ))
                        }
                        {
                            range(2).map((i) => (
                                <Grid
                                    container
                                    key={i}
                                    item
                                    xs={12} sm={6} lg={3}
                                    sx={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <ProductCardNew
                                        key={i}
                                        title={'Title'}
                                        price={9.99}
                                        image_url={'https://i.imgur.com/ZG4W7Le.jpg'}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                    <Button
                        variant={'contained'}
                        size={'large'}
                        onClick={() => navigate('/products')}
                    >
                        Shop all
                    </Button>
                </Box>
            </Section>
        </>
    );
}
