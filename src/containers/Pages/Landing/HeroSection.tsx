import {Box, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import Section from '../../../components/Wrappers/Section';
import StyledButton from '../../../components/StyledButton';
import BackgroundImage from '../../../assets/images/hero-section.jpg';

export default function HeroSection() {
    const navigate = useNavigate();

    return (
        <>
            <Section
                backgroundUrl={BackgroundImage}
            >
                <Box
                    sx={{
                        py: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: {xs: 'center', md: 'start'},
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            maxWidth: 500,
                            alignItems: {xs: 'center', md: 'flex-start'},
                        }}
                    >
                        <Typography
                            variant={'h2'}
                            component={'h1'}
                            sx={{
                                color: 'white',
                                paddingBottom: 8,
                                textAlign: {xs: 'center', md: 'left'},
                            }}
                        >
                            Find your herbal friend
                        </Typography>
                        <Typography
                            variant={'h5'}
                            component={'h4'}
                            sx={{
                                color: 'white',
                                paddingBottom: 16,
                                textAlign: {xs: 'center', md: 'left'},
                            }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Typography>
                        <StyledButton
                            onClick={() => navigate('/products')}
                        >
                            Get started
                        </StyledButton>
                    </Box>
                </Box>
            </Section>
        </>
    );
}
