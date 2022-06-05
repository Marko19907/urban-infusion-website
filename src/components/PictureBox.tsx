import {Stack} from '@mui/material';

interface Props {
    height?: number;
    image: string | undefined;
    alt?: string;
    sx?: any;
}

PictureBox.defaultProps = {
    height: 100,
    alt: 'Image',
};

export default function PictureBox(props: Props) {
    return (
        <>
            <Stack
                height={props.height}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{
                    ...props.sx,
                    objectFit: 'contain',
                }}
            >
                <img
                    src={props.image}
                    alt={props.alt}
                    loading={'lazy'}
                    style={{objectFit: 'contain', height: 'inherit'}}
                    draggable={false}
                />
            </Stack>
        </>
    );
}
