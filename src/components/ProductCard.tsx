import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from '@mui/material';

interface Props {
    title?: string;
    price?: number;
    image_url?: string;
}

ProductCard.defaultProps = {
    title: '',
};

export default function ProductCard(props: Props) {

    return (
        <>
            <Card
                sx={{width: 250, height: 400}}
            >
                <CardActionArea>
                    <CardMedia
                        component={'img'}
                        height={250}
                        image={props.image_url}
                    />
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant={'h5'}
                            textAlign={'center'}
                            sx={{
                                userSelect: 'text',
                            }}
                        >
                            {props.title}
                        </Typography>
                        <Typography
                            variant={'body1'}
                            textAlign={'center'}
                            paddingBottom={1}
                            sx={{
                                userSelect: 'text',
                            }}
                        >
                            ${props.price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        variant={'contained'}
                        size={'small'}
                    >
                        Add to cart
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}
