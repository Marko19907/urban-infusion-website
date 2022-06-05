import {Box, Stack, Typography, useTheme} from '@mui/material';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';

interface Props {
    clickable?: boolean;
    onClick?: () => void;
}

export default function Logo(props: Props) {
    const theme = useTheme();
    return (
        <>
            <Stack
                direction={'row'}
                alignItems={'center'} justifyContent={'center'}
                onClick={props.onClick}
                sx={{
                    userSelect: 'none',
                    cursor: props.clickable ? 'pointer' : undefined,
                }}
            >
                <Stack textAlign={'right'} spacing={-3}>
                    <Typography variant={'h4'} fontFamily={'Yeseva One'}>
                        Urban
                    </Typography>
                    <Typography variant={'h6'} fontFamily={'Yeseva One'} style={{color: theme.palette.primary.main}}>
                        Infusion
                    </Typography>
                </Stack>
                <Stack
                    sx={{
                        color: theme.palette.primary.main,
                        width: '2.2em',
                        height: '2.2em'
                    }}
                    component={EmojiFoodBeverageIcon}
                />
            </Stack>
        </>
    );
}
