import {Avatar, Button, Stack, Tooltip, Typography} from '@mui/material';
import {formatDate} from '../../../utils/dateParser';

interface Props {
    id?: number;
    username?: string;
    text?: string;
    lastUpdated?: string;
    created?: string;
}

export default function Comment(props: Props) {

    function firstLetterOfUsername(username: string | undefined): string {
        return username ? username.charAt(0).toUpperCase() : '';
    }

    return (
        <>
            <Stack direction={'column'} minHeight={200} width={'100%'} gap={3} sx={{border: '1px solid grey'}}>
                <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={2} margin={3}>
                    <Tooltip title={props.username as string}>
                        <Avatar>{firstLetterOfUsername(props.username)}</Avatar>
                    </Tooltip>
                    <Stack direction={'column'}>
                        <Typography variant={'body1'}>
                            {`${props.username} on ${formatDate(props.created as string)}`}
                        </Typography>
                        <Typography variant={'body2'}>
                            {`Last updated: ${props.lastUpdated ? formatDate(props.lastUpdated) : 'Never'}`}
                        </Typography>
                    </Stack>
                </Stack>
                <Typography variant={'body2'} ml={3} mr={3} mb={1} flexGrow={2} sx={{fontStyle: 'italic'}}>
                    {`'${props.text}'`}
                </Typography>
                <Stack direction={'row'} justifyContent={'flex-end'} alignItems={'center'}>
                    <Button variant={'outlined'}>Edit comment</Button>
                </Stack>
            </Stack>
        </>
    );
}
