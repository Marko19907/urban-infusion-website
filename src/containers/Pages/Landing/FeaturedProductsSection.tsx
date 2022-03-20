import Section from '../../../components/Wrappers/Section';
import {Box, Button, Grid, Skeleton, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {range} from 'lodash-es';

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
                        width: '100%'
                    }}
                >
                    <Typography
                        variant={'h4'}
                        component={'h4'}
                        sx={{
                            textAlign: 'center',
                            marginBottom: 12
                        }}
                    >
                        Featured products
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                            marginBottom: 16,
                        }}
                    >
                        {
                            range(4).map((i) => (
                                <Skeleton
                                    key={i}
                                    sx={{
                                        mb: 4,
                                    }}
                                    variant={'rectangular'}
                                    width={250}
                                    height={300}
                                >
                                </Skeleton>
                            ))
                        }
                    </Box>
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
