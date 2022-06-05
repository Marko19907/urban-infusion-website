import {MenuItem, Stack, TextField, Typography, useTheme} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import SortByAlphaOutlinedIcon from '@mui/icons-material/SortByAlphaOutlined';
import MonitorWeightOutlinedIcon from '@mui/icons-material/MonitorWeightOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import {ReactElement} from 'react';
import {enumValues} from '../../../utils/utils';
import {OrderOption, SortOption} from '../../../containers/Pages/Products';

interface Props {
    sort: SortOption;
    order: OrderOption;
    onSort: (sort: SortOption) => void;
    onOrder: (order: OrderOption) => void;
}

export default function ProductsFilter(props: Props) {
    const theme = useTheme();

    const handleSort = (newValue: SortOption) => {
        props.onSort(newValue);
    };

    const handleOrder = (newValue: OrderOption) => {
        props.onOrder(newValue);
    };

    const getIcon = (option: OrderOption | SortOption): ReactElement => {
        return {
            [OrderOption.ASCENDING]: <ArrowUpwardIcon/>,
            [OrderOption.DESCENDING]: <ArrowDownwardIcon/>,
            [SortOption.NAME]: <SortByAlphaOutlinedIcon/>,
            [SortOption.PRICE]: <AttachMoneyOutlinedIcon/>,
            [SortOption.DISCOUNT]: <LocalOfferOutlinedIcon/>,
            [SortOption.WEIGHT]: <MonitorWeightOutlinedIcon/>,
        }[option] || <></>;
    };

    return (
        <>
            <Stack
                direction={'row'}
                spacing={4}
                alignItems={'start'}
            >
                <TextField
                    select
                    label={'Sort by'}
                    defaultValue={SortOption.NAME}
                    value={props.sort}
                    onChange={(event) => {
                        handleSort(event.target.value as SortOption);
                    }}
                    size={'small'}
                >
                    {
                        enumValues(SortOption).map(option => (
                            <MenuItem key={option} value={option}>
                                <Stack spacing={4} direction={'row'}>
                                    {getIcon(option as SortOption)}
                                    <Typography flex={1} textTransform={'capitalize'}>{option}</Typography>
                                </Stack>
                            </MenuItem>
                        ))
                    }
                </TextField>
                <TextField
                    select
                    label={'Order'}
                    defaultValue={OrderOption.DESCENDING}
                    value={props.order}
                    onChange={(event) => {
                        handleOrder(event.target.value as OrderOption);
                    }}
                    size={'small'}
                >
                    {
                        enumValues(OrderOption).map(option => (
                            <MenuItem key={option} value={option}>
                                <Stack spacing={4} direction={'row'}>
                                    {getIcon(option as OrderOption)}
                                    <Typography flex={1} textTransform={'capitalize'}>{option}</Typography>
                                </Stack>
                            </MenuItem>
                        ))
                    }
                </TextField>
            </Stack>
        </>
    );
}
