import {Avatar, Box, Card, CardActionArea, CardContent, Grid, Typography} from '@mui/material';
import Section from '../../../components/Wrappers/Section';


interface TestimonialProps {
    image_url: string;
    name: string;
    comment: string;
}

export default function TestimonialSection() {

    return (
        <>
            <Section>
                <Box
                sx={theme => ({
                    display: 'flex',
                    md: '4',
                    xs: '12',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    [theme.breakpoints.down('md')]: {
                        flexDirection: 'column',
                        alignItems: 'center',
                        pb: 20
                    }
                })}
                >

                    <Testimonial image_url={''} name={'John Cliff'} comment={'Tea is the necessary component for my busy days at the office. It helps me focus. Urban' +
                        ' Infusion have the best Sencha tea – my favorite.'}/>
                    <Testimonial image_url={''} name={'Purple Floyd'} comment={'I love the great selection Urban Infusion have! I try a new tea every day and I still have' +
                        'many teas to try out! Recommend!'}/>
                        <Testimonial image_url={''} name={'James Jagger'} comment={'Man, their teas are dope! P.S. You can also smoke them, just don\'t tell anyone I told you' +
                        'that '}/>

                </Box>
            </Section>
        </>
    );
}

//
function Testimonial(props: TestimonialProps) {
    return (
        <>

            <Card
                sx={theme => ({
                    maxWidth: '30%',
                    margin: 4,
                    [theme.breakpoints.down('md')]: {
                        maxWidth: '80%',
                        mb: 20
                    }
                })}
           >
                <CardContent>
                    <Grid
                        container
                        direction={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        >
                        <Avatar></Avatar>
                    </Grid>
                    <Typography
                        variant={'h5'}
                        component={'h5'}
                        textAlign={'center'}
                    >
                        {props.name}
                    </Typography>
                    <Typography textAlign={'center'}>
                        {props.comment}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}
