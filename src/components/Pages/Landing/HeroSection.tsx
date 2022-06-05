import {Stack, Typography, useTheme} from '@mui/material';
import Section from '../../Wrappers/Section';
import StyledButton from '../../StyledButton';
import BackgroundImage from '../../../assets/images/hero-section.jpg';
import BackgroundImageMobile from '../../../assets/images/hero-section-mobile.jpg';
import UnstyledLink from '../../UnstyledLink';

interface Props {
    title?: string;
    description?: string;
    backgroundUrl?: string;
    backgroundUrlMobile?: string;
}

HeroSection.defaultProps = {
    backgroundUrl: BackgroundImage,
    backgroundUrlMobile: BackgroundImageMobile
};

export default function HeroSection(props: Props) {
    const theme = useTheme();

    return (
        <>
            <Section
                sx={{height: `calc(100vh - ${theme.custom.heights.topBar + theme.custom.heights.navBar}px)`, my: 0}}
                backgroundUrl={props.backgroundUrl}
                backgroundUrlMobile={props.backgroundUrlMobile}
            >
                <Stack
                    justifyContent={'center'}
                    alignItems={{xs: 'center', md: 'start'}}
                    width={'100%'}
                >
                    <Stack
                        maxWidth={500}
                        alignItems={{xs: 'center', md: 'flex-start'}}
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
                        <UnstyledLink to={'/products/all'}>
                            <StyledButton>
                                Get started
                            </StyledButton>
                        </UnstyledLink>
                    </Stack>
                </Stack>
            </Section>
        </>
    );
}
