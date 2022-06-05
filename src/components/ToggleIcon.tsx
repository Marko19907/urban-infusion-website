import React from 'react';
import {Box} from '@mui/material';

interface Props {
    on: boolean;
    onIcon: JSX.Element;
    offIcon: JSX.Element;
}

/**
 * An animated toggle icon.
 */
export default function ToggleIcon(props: Props) {

    return (
        <>
            <Box
                sx={{
                    width: 24,
                    height: 24,
                    position: 'relative',
                    display: 'inline-block'
                }}
            >
                {React.cloneElement(props.offIcon, {
                    style: {
                        transition: 'clip-path 550ms cubic-bezier(0.4, 0.0, 0.2, 1)',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        clipPath: `${props.on ? 'polygon(0% 0%, 0% 0%, 0% 0%)' : 'polygon(0% 200%, 0% 0%, 200% 0%)'}`
                    }
                })}
                {React.cloneElement(props.onIcon, {
                    style: {
                        transition: 'clip-path 550ms cubic-bezier(0.4, 0.0, 0.2, 1)',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        clipPath: `${props.on ? 'polygon(100% -100%, 100% 100%, -100% 100%)' : 'polygon(100% 100%, 100% 100%, 100% 100%)'}`
                    }
                })}
            </Box>
        </>
    );
}
