import {Box, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import Section from './Wrappers/Section';
import StyledButton from './StyledButton';
import BackgroundImage from '../assets/images/hero-section.jpg';

interface Props {
    title?: string;
    description?: string;
    backgroundUrl?: string;
    backgroundUrlMobile?: string;
}

HeroSection.defaultProps = {
    backgroundUrl: BackgroundImage,
    // backgroundUrlMobile: 'https://i.imgur.com/cGWuYIr.jpg' // mobile 1
    // backgroundUrlMobile: 'https://i.imgur.com/tUtZZfJ.jpg' // mobile 2
    backgroundUrlMobile: 'https://i.imgur.com/fBLkybq.jpg' // mobile 3
};

export default function HeroSection(props: Props) {
    const navigate = useNavigate();

    return (
        <>
            <Section
                backgroundUrl={props.backgroundUrl}
                backgroundUrlMobile={props.backgroundUrlMobile}
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
                            {props.title}
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
                            {props.description}
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
