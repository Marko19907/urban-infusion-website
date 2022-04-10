import Section from '../../Wrappers/Section';
import {Box, Link, Typography} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function InstagramSection() {
    const instagramLink = 'https://www.instagram.com/sencha_and_fruit/';

    return (
        <>
            <Section
                height={250}
                sx={{margin: 0}}
            >
                <Box
                    width={'100%'}
                    paddingTop={12}
                    paddingBottom={12}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Box >
                            <InstagramIcon sx={{ fontSize: 42 }} />
                        </Box>
                        <Typography variant={'h5'}>
                            Follow us on Instagram
                        </Typography>
                    </Box>
                    <Typography sx={{ typography: { xs: 'h4', md: 'h3' } }} >
                        <Link
                            target={'_blank'}
                            href={instagramLink}
                            rel={'noreferrer'}
                            underline={'hover'}
                        >
                            @URBANINFUSION
                        </Link>
                    </Typography>
                </Box>
            </Section>
        </>
    );
}
