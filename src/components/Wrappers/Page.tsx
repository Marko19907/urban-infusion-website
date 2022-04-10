import {CircularProgress, Stack} from '@mui/material';
import {ReactNode} from 'react';

interface Props {
    isLoading?: boolean;
    children?: ReactNode;
}

export default function Page(props: Props) {
    return (
        <>
            {
                props.isLoading
                    ? (
                        <Stack alignItems={'center'} justifyContent={'center'} height={'100vh'}>
                            <CircularProgress size={64}/>
                        </Stack>
                    )
                    : props.children
            }
        </>
    );
}
