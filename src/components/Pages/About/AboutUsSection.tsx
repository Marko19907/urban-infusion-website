import {Stack, Typography} from '@mui/material';
import Section from '../../Wrappers/Section';

export default function AboutUsSection() {

    return (
        <>
            <Section>
                <Stack
                    direction={'column'}
                    spacing={{xs: 2, md: 4}}
                    sx={{
                        textAlign: {xs: 'center', md: 'left'}
                    }}
                >
                    <Typography variant={'h4'} component={'h2'} paddingBottom={2}>
                        Our story
                    </Typography>
                    <Typography variant={'h6'} component={'h3'}>
                        Humans have been enjoying herbal teas for millennia. We are passionate for natural teas,
                        nurtured by our ancestors. Our experts have carefully selected teas from all regions of the
                        planet – from Japanese teas to herbal wonders of Machu Picchu.
                    </Typography>
                    <Typography variant={'h6'} component={'h3'}>
                        We have carefully created a collection of more than 600 different teas from 140 different
                        countries. Come visit us at our office in Amfi Moa, we have 62 most popular teas available here!
                    </Typography>
                </Stack>
            </Section>
        </>
    );
}
