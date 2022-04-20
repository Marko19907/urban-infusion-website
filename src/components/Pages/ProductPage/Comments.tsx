import {CommentDto} from '../../../api/urbaninfusion/dto/comment-dto';
import Comment from './Comment';
import {Box, Stack, Typography} from '@mui/material';

interface Props {
    comments?: CommentDto[];
}

export default function Comments(props: Props) {
    return (
        <>
            <Box>
                {
                    props.comments && props.comments.length !== 0 ? (
                        props.comments.map(comment => (
                            <Comment
                                key={comment.id}
                                id={comment.id}
                                username={comment.user.username}
                                text={comment.text}
                                lastUpdated={comment.lastUpdated}
                                created={comment.created}
                            />
                        ))
                    ) : (
                        <Stack
                            direction={'row'}
                            justifyContent={'flex-start'}
                            alignItems={'center'}
                            height={150}
                        >
                            <Typography>No comments yet</Typography>
                        </Stack>
                    )
                }
            </Box>
        </>
    );
}