import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {SxProps} from '@mui/system';
import {Theme} from '@mui/material/styles';

interface Props {
    title?: string;
    price?: number;
    image_url?: string;
    onClick?: () => void;
    sx?: SxProps<Theme>;
}

ProductCard.defaultProps = {
    title: '',
};

export default function ProductCard(props: Props) {

    return (
        <>
            <Card
                sx={{width: 200, height: 320, ...props.sx}}
            >
                <CardActionArea onClick={props.onClick}>
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
                        startIcon={<AddShoppingCartIcon/>}
                    >
                        Add to cart
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}
