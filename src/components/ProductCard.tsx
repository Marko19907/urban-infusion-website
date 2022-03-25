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
                sx={{width: 200, height: 320}}
            >
                <CardActionArea>
                    <CardMedia
                        component={'img'}
                        height={200}
                        image={props.image_url}
                        draggable={false}
                        sx={{
                            objectFit: 'contain',
                        }}
                    />
                    <CardContent
                        sx={{
                            padding: 0,
                        }}
                    >
                        <Typography
                            variant={'h5'}
                            paddingBottom={1.5}
                            textAlign={'center'}
                            sx={{
                                userSelect: 'text',
                            }}
                        >
                            {props.title}
                        </Typography>
                        <Typography
                            variant={'h6'}
                            textAlign={'center'}
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