import {Stack, Typography} from '@mui/material';
import Logo from '../components/Logo';
import Section from '../components/Wrappers/Section';


export default function Footer() {
    return (
        <>
            <Section sx={{my: 48}}>
                <Stack
                    justifyContent={'center'}
                    alignItems={'center'}
                    width={'100%'}
                    spacing={4}
                >
                    <Logo/>
                    <Typography variant={'body2'} sx={{fontWeight: 'fontWeightBold'}}>
                        Copyright &copy; {new Date().getFullYear()} Urban Infusion
                    </Typography>
                </Stack>
            </Section>
        </>
    );
}
