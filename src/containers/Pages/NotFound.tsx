import {Box, Typography, useTheme} from '@mui/material';
import {NavLink} from 'react-router-dom';
import Section from '../../components/Wrappers/Section';

export default function NotFound() {
    const theme = useTheme();
    return (
        <>
            <Section
                height={`calc(100vh - ${theme.custom.heights.topBar + theme.custom.heights.navBar}px)`}
                sx={{
                    margin: 0,
                }}
            >
                <Box
                    display={'flex'}
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant={'h1'} paddingBottom={6}>
                        404
                    </Typography>
                    <Typography variant={'h3'} component={'h2'} paddingBottom={1}>
                        Oops! That Page Can’t Be Found
                    </Typography>
                    <Typography variant={'h6'} component={'h3'} paddingBottom={6}>
                        The page you are looking for does not exist
                    </Typography>
                    <Typography variant={'body1'} component={'h4'}>
                        <span>Please return to the </span>
                        <NavLink to={'/'}>home page</NavLink>
                    </Typography>
                </Box>
            </Section>
        </>
    );
}
