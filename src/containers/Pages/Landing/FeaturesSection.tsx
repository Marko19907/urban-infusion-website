import {Box, Button, Grid, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import Section from '../../../components/Wrappers/Section';

export default function FeaturesSection() {
    const imageURL: string = 'https://picsum.photos/570/350?grayscale';
    const headerPlaceholder: string = 'Benefits of green tea';
    const bodyPlaceholder: string =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit,'
        + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris'
        + 'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in'
        + 'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla'
        + 'pariatur.';
    const navigate = useNavigate();

    return (
        <>
            <Section>
                <Box>
                    <Feature
                        flipped
                        header={'Heaviest drinkers'}
                        body={'China, Sri Lanka, and Kenya export the most tea worldwide, shipping out about '
                            + '1 million metric tons of it among the three countries. Thanks in large part to it’s '
                            + 'enormous population, China consumes the most of any country in total. '
                            + 'However, per capita, the United Kingdom, Ireland and Turkey take the top '
                            + 'three spots. Over 3 billion teacups are consumed worldwide each year.'}
                        image_url={'https://i.imgur.com/CV3NL2Z.jpg'}
                        onClick={() => navigate('/products')}
                    />
                    <Feature
                        header={'Black tea'}
                        body={'Comforting flavors of honey, stone fruits, or roasted almonds and much more. \n '
                            + 'The nutrients in black tea may reduce the risk of cancer, protect the heart against '
                            + 'atherosclerosis, and help maintain a healthy blood pressure. \n '
                            + 'Black tea is the most consumed tea across the world; in the US, '
                            + '86% of the tea enjoyed throughout 2017 was black tea.'}
                        image_url={imageURL + '&' + Math.random()}
                        onClick={() => navigate('/products')}
                    />
                    <Feature
                        flipped
                        header={'Green tea'}
                        body={'A verdant flavor alternative with often hints of vegetal, marine, '
                            + 'and freshly cut grass. \n Studies suggest that green tea may have positive effects on '
                            + 'weight loss, liver disorders, type 2 diabetes, Alzheimer’s disease, and more. '
                            + 'Ancient cultures used green tea as medicine to control bleeding, heal wounds, '
                            + 'aid digestion, and to improve heart and mental health. \n '
                            + 'Green tea is an exceptionally popular choice amongst both everyday and more '
                            + 'enthusiastic tea drinkers in the United States, likely due to numerous media '
                            + 'outlets touting its health benefits.'}
                        image_url={imageURL + '&' + Math.random()}
                        onClick={() => navigate('/products')}
                    />
                    <Feature
                        header={'White tea'}
                        body={'A mythical and elusive verity light and subtle in flavor with often floral '
                            + 'sweet notes. \n '
                            + 'White tea has been linked to many potential health benefits. These include '
                            + 'improving skin and hair health, reducing the risk of cancer, reducing inflammation, '
                            + 'improving brain health, reducing insulin resistance, lowering the risk of heart '
                            + 'disease, and improving oral health. \n '
                            + 'White tea is the least processed of all '
                            + 'teas, most white teas are simply picked and withered. Therefore, white tea '
                            + 'contains elevated levels of antioxidants that are present in fresh tea leaves.'}
                        image_url={imageURL + '&' + Math.random()}
                        onClick={() => navigate('/products')}
                    />
                    <Feature
                        flipped
                        header={'Dark tea'}
                        body={'This brew shows an amber color, with a little sticky feeling, mellow and smooth, '
                            + 'and a unique sweetness. The marvelous taste will make you hooked and can’t '
                            + 'stop drinking. \n '
                            + 'Dark tea may have similar benefits to green tea. The nutrients in it '
                            + 'may reduce the risk of several cancers, protect the heart, and help maintain healthy '
                            + 'blood pressure. \n Many presume that “dark” tea and “black” tea are the same, but '
                            + 'there is a world of difference separating these two categories. \n '
                            + 'Darks teas are closer to green teas in that they are processed like green teas '
                            + 'initially. Then, they go through a bacterial fermentation process and are aged for '
                            + 'many years to come.'}
                        image_url={imageURL + '&' + Math.random()}
                        onClick={() => navigate('/products')}
                    />
                </Box>
            </Section>
        </>
    );
}

interface FeatureProps {
    flipped?: boolean;
    header?: string;
    body?: string;
    image_url?: string;
    onClick?: () => void;
}

function Feature(props: FeatureProps) {
    return (
        <>
            <Grid
                container
                spacing={8}
                pb={24}
                sx={{
                    flexDirection: props.flipped ? 'row-reverse' : 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Grid
                    md={6}
                    item
                    container
                >
                    <img
                        src={props.image_url}
                        style={{width: '100%', minWidth: 1}}
                        alt={''}
                    />
                </Grid>
                <Grid
                    md={6}
                    item
                    container
                    sx={{
                        justifyContent: {xs: 'center', md: 'flex-start'}
                    }}
                >
                    <Typography
                        variant={'h4'}
                        component={'h3'}
                        sx={{
                            textAlign: {xs: 'center', md: 'left'}
                        }}
                    >
                        {
                            props.header
                        }
                    </Typography>
                    <Typography
                        my={8}
                        sx={{
                            whiteSpace: 'pre-line',
                            textAlign: {xs: 'center', md: 'left'}
                        }}
                    >
                        {
                            props.body
                        }
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flex: 1,
                            justifyContent: props.flipped ? 'flex-start' : 'flex-end',
                        }}
                    >
                        <Button
                            variant={'contained'}
                            size={'large'}
                            onClick={props.onClick}
                        >
                            shop now
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
