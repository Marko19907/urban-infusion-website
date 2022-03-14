import {IconButton, styled, Switch} from '@mui/material';
import {IconButtonProps, IconButtonTypeMap} from '@mui/material/IconButton/IconButton';
import {ExtendButtonBase} from '@mui/material/ButtonBase';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

type Props = {
    mode: 'light' | 'dark';
} & IconButtonProps;

export function ThemeSwitch(props: Props) {
    return (
        <>
            <IconButton
                {...props}
            >
                {
                    props.mode === 'light'
                        ? <LightModeIcon sx={{color: 'gray'}}/>
                        : <DarkModeIcon/>
                }
            </IconButton>
        </>
    );
}
