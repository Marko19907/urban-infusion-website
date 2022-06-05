import {ReactNode} from 'react';
import {Button, styled} from '@mui/material';
import {ButtonProps} from '@mui/material/Button/Button';

const CustomButton = styled(Button)({
    color: 'white',
    textTransform: 'none',
    fontSize: 24,
    padding: '12px 36px',
    border: '3px solid',
    backdropFilter: 'saturate(0.8) blur(20px)',
    borderRadius: 0,
    '&:hover': {
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
    },
    '&:focus': {
    },
});

type Props = {
    children?: ReactNode;
} & ButtonProps;

export default function StyledButton(props: Props) {
    return (
        <>
            <CustomButton
                {...props}
            >
                {props.children}
            </CustomButton>
        </>
    );
}
