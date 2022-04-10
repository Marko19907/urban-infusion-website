import {ProductDto} from '../../../api/urbaninfusion/dto/product-dto';
import {store} from '../../../state/store';
import CartItem from './CartItem';
import {Box, Divider, Stack, Typography} from '@mui/material';

interface Props {
    items: ProductDto[];
}

export default function CartItemList(props: Props) {


    return (
        <>
            <Stack direction={'column'} width={'100%'}>
                <Stack px={4} direction={'row'} mb={2} alignContent={'flex-end'} textAlign={'right'}>
                    <Box flex={1}/>
                    <Box flex={1}/>
                    <Typography flex={1} variant={'h6'}>Count</Typography>
                    <Typography flex={1} variant={'h6'}>Total Price</Typography>
                </Stack>
                <Divider/>
                <Stack direction={'column'} px={4} textAlign={'right'}>
                    {
                        props.items.map(item => (<CartItem count={1} item={item}/>))
                    }
                </Stack>
            </Stack>
        </>
    );
}
