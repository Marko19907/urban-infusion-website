import {CircularProgress, Stack, useTheme} from '@mui/material';
import {ReactNode} from 'react';
import {SxProps} from '@mui/system';

interface Props {
    isLoading?: boolean;
    children?: ReactNode;
    sx?: SxProps;
}

export default function Page(props: Props) {
    const theme = useTheme();
    return (
        <>
            <Stack
                sx={{
                    overflow: 'auto',
                    minHeight: `calc(100vh - ${theme.custom.heights.topBar + theme.custom.heights.navBar}px)`,
                    ...props.sx
                }}
            >
                {
                    props.isLoading
                        ? <Stack flex={1} alignItems={'center'} justifyContent={'center'}>
                            <CircularProgress size={64}/>
                    </Stack>
                        : props.children
                }
            </Stack>
        </>
    );
}
