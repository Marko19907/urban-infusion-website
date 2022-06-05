import {Divider, Paper, Stack, Typography, useTheme} from '@mui/material';
import {ReactNode} from 'react';
import {SxProps} from '@mui/system';

interface Props {
    header?: string;
    icon?: ReactNode;
    children?: ReactNode;
}

export default function SectionCard(props: Props) {
    const theme = useTheme();
    return (
        <>
            <Paper variant={'outlined'}>
                {
                    props.header && (
                        <Stack>
                            <Stack px={4} py={6} bgcolor={theme.palette.primary.light} direction={'row'} alignItems={'center'} spacing={2}>
                                {props.icon}
                                <Typography fontWeight={400} variant={'h6'} textTransform={'capitalize'}>
                                    {props.header}
                                </Typography>
                            </Stack>
                            <Divider/>
                        </Stack>
                    )
                }
                <Stack direction={'column'}>
                    {props.children}
                </Stack>
            </Paper>
        </>
    );
}

interface SectionCardItemProps {
    children?: ReactNode;
    sx?: SxProps;
}

export function SectionCardItem(props: SectionCardItemProps) {
    return (
        <>
            <Stack p={4} sx={{...props.sx}}>
                {props.children}
            </Stack>
            <Divider/>
        </>
    );
}
