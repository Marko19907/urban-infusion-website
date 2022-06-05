import {Stack, StackProps, Typography, useTheme} from '@mui/material';
import {omit} from 'lodash-es';

type Props = {
    count: number;
    onIncrement: () => void;
    onDecrement: () => void;
} & StackProps;

export default function Counter(props: Props) {
    const stackProps = omit(props, 'count', 'onIncrement', 'onDecrement');
    const theme = useTheme();
    return (
        <>
            <Stack
                direction={'row'}
                spacing={2}
                border={'1px solid'}
                borderRadius={theme.shape.borderRadius}
                borderColor={theme.palette.divider}
                {...stackProps}
            >
                <Stack py={2} px={4}
                    onClick={() => props.onDecrement()}
                    sx={{
                        userSelect: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <Typography>-</Typography>
                </Stack>
                <Stack py={2} sx={{userSelect: 'none'}}>
                    <Typography>{props.count}</Typography>
                </Stack>
                <Stack py={2} px={4}
                    onClick={() => props.onIncrement()}
                    sx={{
                        userSelect: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <Typography>+</Typography>
                </Stack>
            </Stack>
        </>
    );
}
