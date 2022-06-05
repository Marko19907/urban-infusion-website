import {Button, Divider, Paper, PaperProps, Stack, Typography, useTheme} from '@mui/material';
import {omit, round} from 'lodash-es';
import {ProductDto} from '../../../api/urbaninfusion/dto/product-dto';
import UnstyledLink from '../../UnstyledLink';

type Props = {
    data: ProductDto;
    img?: string;
    addable?: boolean;
    onAddToCart?: (product: ProductDto) => void;
} & PaperProps;

export default function ProductCard(props: Props) {
    const paperProps = omit(props, ['data', 'img', 'onAddToCart', 'addable']);

    const theme = useTheme();

    const discountedPrice = round(props.data.price - (props.data.price * props.data.discount), 2);

    const handleAddToCart = () => {
        if (props.onAddToCart) {
            props.onAddToCart(props.data);
        }
    };

    return (
        <>
            <Paper
                variant={'outlined'}
                {...paperProps}
            >
                <Stack
                    sx={{position: 'relative'}}
                    textAlign={'center'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    height={'100%'}
                >
                    {
                        props.data.discount > 0 && (
                            <Stack sx={{position: 'absolute', top: 5, left: 10}}>
                                <Typography variant={'h6'} color={'error'}>
                                    -{round(props.data.discount * 100, 2)}%
                                </Typography>
                            </Stack>
                        )
                    }
                    {
                        props.img && (
                            <>
                                <UnstyledLink style={{width: '100%'}} to={`/product/${props.data.id}`}>
                                    <Stack
                                        p={4}
                                        alignItems={'center'}
                                        justifyContent={'center'}
                                        sx={{cursor: 'pointer'}}
                                    >
                                        <img
                                            loading={'lazy'}
                                            src={props.img}
                                            style={{width: 'auto', height: 175, padding: 8}}
                                            alt={''}
                                        />
                                    </Stack>
                                </UnstyledLink>
                                <Divider flexItem/>
                            </>
                        )
                    }
                    <Stack width={'100%'} flex={1} px={8} py={4} alignItems={'center'} justifyContent={'center'}>
                        <Typography variant={'h6'}>{props.data.title}</Typography>
                        <Stack direction={'row'} alignItems={'center'} spacing={1}>
                            {
                                props.data.discount
                                    ? (
                                        <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                            <Typography variant={'subtitle2'} sx={{textDecorationLine: 'line-through'}}>
                                                ${props.data.price}
                                            </Typography>
                                            <Typography variant={'subtitle1'}>
                                                ${discountedPrice}
                                            </Typography>
                                        </Stack>
                                    )
                                    : (
                                        <Typography variant={'subtitle1'}>
                                            ${props.data.price}
                                        </Typography>
                                    )
                            }
                            {
                                props.data.weight && (
                                    <Typography
                                        variant={'subtitle2'}
                                        color={theme.palette.text.secondary}
                                    >
                                        / {props.data.weight}
                                    </Typography>
                                )
                            }
                        </Stack>
                    </Stack>
                    <Divider flexItem/>
                    {
                        props.addable && (
                            <Stack width={'100%'}>
                                <Button
                                    onClick={handleAddToCart}
                                    variant={'contained'}
                                    sx={{
                                        boxShadow: 'none',
                                        height: '100%',
                                        borderRadius: '0 0 4px 4px',
                                        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                                        background: theme.palette.secondary.light,
                                        color: theme.palette.getContrastText(theme.palette.secondary.light),
                                        '&:hover': {
                                            background: theme.palette.secondary.main
                                        }
                                    }}
                                >
                                    add to cart
                                </Button>
                            </Stack>
                        )
                    }
                </Stack>
            </Paper>
        </>
    );
}
