import {Grid} from '@mui/material';
import {ReactNode} from 'react';
import {SxProps} from '@mui/system';
import {Theme} from '@mui/material/styles';

interface Props {
    children?: ReactNode;
    height?: any;
    bgColor?: string;
    backgroundUrl?: string;
    backgroundUrlMobile?: string;
    sx?: SxProps<Theme>;
}

export default function Section(props: Props) {
    return (
        <>
            <Grid
                container
                sx={{
                    height: props.height || undefined,
                    backgroundColor: props.bgColor || undefined,
                    justifyContent: 'center',
                    backgroundImage: {
                        xs: `url(${props.backgroundUrlMobile || undefined})`,
                        md: `url(${props.backgroundUrl || undefined})`,
                    },
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                <Grid
                    item
                    container
                    sx={{
                        maxWidth: 'lg',
                        height: '100%',
                        mx: 8,
                        my: 32,
                        ...props.sx
                    }}
                >
                    {props.children}
                </Grid>
            </Grid>
        </>
    );
}
