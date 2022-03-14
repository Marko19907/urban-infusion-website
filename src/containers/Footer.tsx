import {Grid, Typography} from '@mui/material';
import Logo from '../components/Logo';
import Section from '../components/Wrappers/Section';


export default function Footer() {
    return (
        <>
            <Section
                sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    rowGap: 4
                }}
            >
                <Logo/>
                <Typography variant={'body2'} sx={{fontWeight: 'fontWeightBold'}}>
                    Copyright © {new Date().getFullYear()} Urban Infusion
                </Typography>
            </Section>
        </>
    );
}
