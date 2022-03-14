import {Box, Typography} from '@mui/material';
import CoffeeOutlinedIcon from '@mui/icons-material/CoffeeOutlined';

interface Props {
    clickable?: boolean;
    onClick?: () => void;
    sx?: any;
}

Logo.stateProps = {
    clickable: false
};

export default function Logo(props: Props) {
    return (
        <>
            <Box
                onClick={props.onClick}
                sx={{
                    ...props.sx,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    userSelect: 'none',
                    cursor: props.clickable ? 'pointer' : undefined,
                }}
            >
                <Box
                    sx={{
                        textAlign: 'right',
                    }}
                >
                    <Typography variant={'h4'}>
                        Urban
                    </Typography>
                    <Typography marginTop={-3} variant={'h6'} style={{color: '#7DDC6A'}}>
                        Infusion
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: '2.2em',
                        height: '2.2em'
                    }}
                    component={CoffeeOutlinedIcon}
                />
            </Box>
        </>
    );
}
