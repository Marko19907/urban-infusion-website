import {InputBaseProps} from '@mui/material/InputBase/InputBase';
import {omit} from 'lodash-es';
import {InputBase, Stack, Typography, useTheme} from '@mui/material';

type Props = {
    label?: string;
    adornment?: string;
    editing?: boolean;
    rows?: number;
    value?: any;
} & InputBaseProps;

export default function Input(props: Props) {
    const inputBaseProps = omit(props, ['label', 'adornment', 'editing']);
    const theme = useTheme();
    return (
        <>
            <Stack width={'100%'} p={2} alignItems={'center'}>
                {props.label && (
                    <Typography
                        sx={{userSelect: 'none'}}
                        variant={'subtitle2'}
                        alignSelf={'start'}
                        color={theme.palette.text.secondary}
                    >
                        {props.label}
                    </Typography>
                )}
                <Stack direction={'row'} width={'100%'} spacing={2} alignItems={'center'} sx={{overflowY: 'auto'}}>
                    {props.adornment && (
                        <Typography
                            sx={{userSelect: 'none'}}
                            variant={'subtitle2'}
                            color={theme.palette.text.disabled}
                        >
                            {props.adornment}
                        </Typography>
                    )}
                    {
                        props.editing
                            ? (<InputBase
                                sx={{'*': {p: 0, m: 0}}}
                                fullWidth
                                {...inputBaseProps}
                            />)
                            : (<Typography
                                sx={{
                                    height: (props.multiline && props.rows)
                                        ? 23 * props.rows
                                        : 'inherit',
                                }}
                                textAlign={'left'}
                            >
                                {props.value}
                            </Typography>)
                    }
                </Stack>
            </Stack>
        </>
    );
}
