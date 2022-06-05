import {Avatar, Button, IconButton, Paper, Stack, TextField, Tooltip, Typography, useTheme} from '@mui/material';
import {stringToColor} from '../../../utils/utils';
import {CommentDto, UpdateCommentDto} from '../../../api/urbaninfusion/dto/comment-dto';
import {formatDate} from '../../../utils/dateParser';
import TimeAgo from 'react-timeago';
import {useState} from 'react';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

interface Props {
    comment: CommentDto;
    onEdit: (data: UpdateCommentDto) => void;
    onDelete: (id: number) => void;
    isAdmin: boolean;
    isMe: boolean;
}

export default function Comment(props: Props) {
    const theme = useTheme();

    const [newText, setNewText] = useState<string>(props.comment.text);
    const [editing, setEditing] = useState<boolean>(false);

    const handleDelete = () => {
        props.onDelete(props.comment.id);
    };

    const handleEdit = () => {
        if (newText.length > 0) {
            props.onEdit({
                id: props.comment.id,
                text: newText,
            });
            setEditing(false);
        }
    };

    return (
        <>
            <Paper sx={{p: 4, position: 'relative'}} variant={'outlined'}>
                <Stack spacing={2}>
                    <Stack
                        direction={'row'}
                        spacing={2}
                        sx={{
                            position: 'absolute',
                            right: 10,
                            top: 10,
                        }}
                    >
                        {
                            props.isMe && (
                                <Tooltip title={'Edit'}>
                                    <IconButton onClick={() => setEditing(!editing)}>
                                        <ModeEditOutlineOutlinedIcon/>
                                    </IconButton>
                                </Tooltip>
                            )
                        }
                        {
                            (props.isAdmin || props.isMe) && (
                                <Tooltip title={'Delete'}>
                                    <IconButton color={'error'} onClick={handleDelete}>
                                        <DeleteOutlineOutlinedIcon/>
                                    </IconButton>
                                </Tooltip>
                            )
                        }
                    </Stack>
                    <Stack spacing={4}>
                        <Stack
                            direction={'row'}
                            justifyContent={'flex-start'}
                            alignItems={'center'}
                            spacing={4}
                        >
                            <Avatar sx={{bgcolor: `${stringToColor(props.comment.user.username)}`}}>
                                {props.comment.user.username?.[0]}
                            </Avatar>
                            <Stack>
                                <Typography>
                                    {props.comment.user.username}
                                </Typography>
                                <Typography variant={'body2'} color={theme.palette.text.secondary}>
                                    {formatDate(props.comment.created)}
                                </Typography>
                            </Stack>
                        </Stack>
                        {
                            editing
                                ? (<Stack spacing={2}>
                                    <TextField
                                        value={newText}
                                        onChange={(event) => setNewText(event.target.value)}
                                    />
                                    <Button onClick={handleEdit} sx={{alignSelf: 'flex-end'}}>
                                        Submit
                                    </Button>
                                </Stack>)
                                : (<Typography variant={'subtitle1'}>
                                    {`${props.comment.text}`}
                                </Typography>)
                        }
                    </Stack>
                    {
                        props.comment.lastUpdated && (
                            <Stack alignSelf={'flex-end'}>
                                <Typography variant={'body2'} color={theme.palette.text.secondary}>
                                    updated <TimeAgo date={Date.parse(props.comment.lastUpdated)}/>
                                </Typography>
                            </Stack>
                        )
                    }
                </Stack>
            </Paper>
        </>
    );
}
