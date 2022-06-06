import {Button, Stack, TextField} from '@mui/material';
import {useState} from 'react';

interface Props {
    onAdd: (text: string) => void;
}

export default function CommentForm(props: Props) {
    const [text, setText] = useState<string>('');

    const handleSubmit = () => {
        if (text.length > 0) {
            props.onAdd(text);
            setText('');
        }
    };

    return (
        <>
            <Stack
                spacing={4}
                alignItems={'start'}
            >
                <TextField
                    sx={{width: 400}}
                    required
                    multiline
                    variant={'outlined'}
                    rows={4}
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    label={'Comment'}
                    placeholder={'Write your comment here'}
                    inputProps={{maxLength: 1000}}
                />
                <Button
                    sx={{
                        alignSelf: 'flex-end'
                    }}
                    variant={'contained'}
                    type={'submit'}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Stack>
        </>
    );
}
