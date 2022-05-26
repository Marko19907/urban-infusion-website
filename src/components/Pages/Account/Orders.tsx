import {Paper, Stack, Typography, useTheme} from '@mui/material';
import React from 'react';
import {OrderDto, OrderStatus} from '../../../api/urbaninfusion/dto/order-dto';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import Order from './Order';

interface Props {
    orders?: OrderDto[];
    admin?: boolean;
}

export default function Orders(props: Props) {
    const theme = useTheme();

    return (
        <Stack spacing={4}>
            {
                props.orders && props.orders.length > 0
                    ? (
                        props.orders?.map(order => (
                                <Order key={order.orderId} order={order} admin={props.admin}/>
                        )))
                    : (
                        <Stack
                            color={theme.palette.text.disabled}
                            width={'100%'}
                        >
                            <Typography variant={'h5'}>No orders</Typography>
                        </Stack>
                    )
            }
        </Stack>
    );
}
