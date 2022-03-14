import {Grid, Typography} from '@mui/material';
import Section from '../../../components/Wrappers/Section';

export default function NotFound() {
    return (
        <>
            <Section height={800}>
                <Grid container sx={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <Typography variant={'h4'}>There is nothing here!</Typography>
                </Grid>
            </Section>
        </>
    );
}
