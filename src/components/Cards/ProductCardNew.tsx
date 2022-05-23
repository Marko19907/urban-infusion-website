import {Box, Button, CardActionArea, Grow, Typography, useTheme} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useState} from 'react';
import {SxProps} from '@mui/system';
import {Theme} from '@mui/material/styles';
import PictureBox from '../PictureBox';

interface Props {
    id?: number;
    title?: string;
    price?: number;
    image_url?: string;
    onClick?: () => void;
    sx?: SxProps<Theme>;
}

ProductCardNew.defaultProps = {
    title: '',
};

export default function ProductCardNew(props: Props) {
    const [onCardHover, setOnCardHover] = useState<boolean>(false);
    const theme = useTheme();

    return (
        <>
            <CardActionArea
                component={'div'}
                onMouseOver={() => setOnCardHover(true)}
                onMouseLeave={() => setOnCardHover(false)}
                onClick={props.onClick}
                sx={{
                    height: 320,
                    width: 200,
                    boxShadow: 1,
                    borderRadius: `${theme.shape.borderRadius}px`,
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {transform: 'scale3d(1.025, 1.025, 1)', boxShadow: 3},
                    ...props.sx
                }}
            >
                <Box
                    height={'inherit'}
                    width={'inherit'}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <PictureBox height={200} image={props.image_url} alt={'Product image'}/>
                    <Box paddingBottom={6}>
                        <Typography
                            variant={'h4'}
                            paddingBottom={2}
                            textAlign={'center'}
                            sx={{
                                userSelect: 'text',
                            }}
                        >
                            {props.title}
                        </Typography>
                        <Typography
                            variant={'h5'}
                            textAlign={'center'}
                            sx={{
                                userSelect: 'text',
                                color: onCardHover ? 'transparent' : 'default',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            ${props.price}
                        </Typography>
                        {
                            onCardHover ? (
                                <Grow in={onCardHover} timeout={200}>
                                    <Button
                                        variant={'contained'}
                                        size={'small'}
                                        startIcon={<AddShoppingCartIcon/>}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log('Add to cart clicked!');
                                        }}
                                        sx={{
                                            position: 'absolute',
                                            top: 265,
                                            left: 33,
                                        }}
                                    >
                                        Add to cart
                                    </Button>
                                </Grow>
                            ) : (
                                <></>
                            )
                        }
                    </Box>
                </Box>
            </CardActionArea>
        </>
    );
}
