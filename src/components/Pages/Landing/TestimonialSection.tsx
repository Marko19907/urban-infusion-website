import {Avatar, Stack, Typography, useTheme} from '@mui/material';
import Carousel from '../../Carousel';
import Section from '../../Wrappers/Section';
import Divider from '../../../assets/images/divider.svg';

interface TestimonialProps {
    image_url: string;
    name: string;
    comment: string;
}

export default function TestimonialSection() {
    const theme = useTheme();
    const items = [
        <Testimonial
            image_url={'https://i.imgur.com/uMzbKya.jpg'}
            name={'John Cliff'}
            comment={'Tea is the necessary component for my busy days at the office. It helps me focus. Urban' +
                ' Infusion have the best Sencha tea – my favorite.'}
        />,
        <Testimonial
            image_url={'https://i.imgur.com/Y4nQhCY.jpg'}
            name={'Purple Floyd'}
            comment={'I love the great selection Urban Infusion have! I try a new tea every day and I still have' +
                'many tea to try out! Recommend!'}
        />,
        <Testimonial
            image_url={'https://i.imgur.com/nHPps1g.jpg'}
            name={'James Jagger'}
            comment={'Man, their tea are dope! P.S. You can also smoke them, just don\'t tell anyone I told you' +
                ' that '}
        />
    ];

    return (
        <>
            <Stack bgcolor={theme.palette.secondary.light}>
                <img src={Divider} alt={''} style={{transform: 'scaleX(-1)'}}/>
                <Section sx={{my: 8}} label={'Testimonials'}>
                    <Carousel items={items} infinite/>
                </Section>
                <img src={Divider} alt={''} style={{transform: 'scale(1, -1)', marginBottom: -1}}/>
            </Stack>
        </>
    );
}

function Testimonial(props: TestimonialProps) {
    return (
        <>
            <Stack alignItems={'center'} spacing={4}>
                <Avatar
                    src={props.image_url}
                    alt={''}
                    sx={{width: 72, height: 72}}
                />
                <Typography fontFamily={'nantes'} variant={'h4'} textAlign={'center'}>
                    <q>{props.comment}</q>
                </Typography>
                <Typography>
                    {props.name}
                </Typography>
            </Stack>
        </>
    );
}
