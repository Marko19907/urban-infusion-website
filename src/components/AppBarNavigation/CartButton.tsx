import {Badge, IconButton, Tooltip, useTheme} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {useNavigate} from 'react-router-dom';

interface Props {
    itemsCount: number;
}

export default function CartButton(props: Props) {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <>
            <Tooltip arrow title={'Cart'}>
                <IconButton
                    onClick={() => navigate('/cart')}
                >
                    <Badge
                        badgeContent={props.itemsCount}
                        color={'primary'}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                    >
                        <ShoppingCartOutlinedIcon sx={{width: 32, height: 32}} color={'primary'}/>
                    </Badge>
                </IconButton>
            </Tooltip>
        </>
    );
}
