import {ReactNode, useState} from 'react';
import {IconButton, Stack} from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface Props {
    items: ReactNode[];
    height?: number | string;
    infinite?: boolean;
}

export default function Carousel(props: Props) {
    const [current, setCurrent] = useState<number>(0);

    const handleLeft = () => {
        if (current > 0) {
            setCurrent(current - 1);
        } else if (props.infinite) {
            setCurrent(props.items.length - 1);
        }
    };

    const handleRight = () => {
        if (current < props.items.length - 1) {
            setCurrent(current + 1);
        } else if (props.infinite) {
            setCurrent(0);
        }
    };

    const handleChangeIndex = (index: number) => {
        setCurrent(index);
    };

    return (
        <>
            <Stack
                width={'100%'}
                direction={'row'}
                alignItems={'center'}
                height={props.height || undefined}
            >
                <IconButton
                    onClick={handleLeft}
                    disabled={props.infinite ? false : current === 0}
                >
                    <ArrowBackIosNewIcon/>
                </IconButton>
                <SwipeableViews index={current} onChangeIndex={handleChangeIndex}>
                    {props.items.map((item, index) => (
                        <Stack key={index}>{item}</Stack>
                    ))}
                </SwipeableViews>
                <IconButton
                    onClick={handleRight}
                    disabled={props.infinite ? false : current === props.items.length - 1}
                >
                    <ArrowForwardIosIcon/>
                </IconButton>
            </Stack>
        </>
    );
}
