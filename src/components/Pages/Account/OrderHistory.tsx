import {
    Box,
    Grid,
    Typography,
    Paper,
    TableContainer,
    TableCell,
    Table,
    TableHead,
    TableRow,
    TableBody
} from '@mui/material';

enum Status {
    IDLE,
    PROCESSING,
    SENT,
    DELIVERED
}

interface OrderProps {
    status?: Status;
    orderNumber?: number;
    totalPrice?: number;
    date?: Date;
}



const rows: OrderProps[] = [
    {status: 3, orderNumber: 21981, totalPrice: 100, date: new Date('2022-01-01')},
    {status: 0, orderNumber: 45678, totalPrice: 200, date: new Date('2022-03-24')}
];

export default function OrderHistory() {
    return (
        <>

        </>
    );
}
