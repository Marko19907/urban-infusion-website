import {IconButton, styled, Switch, useTheme} from '@mui/material';
import {IconButtonProps, IconButtonTypeMap} from '@mui/material/IconButton/IconButton';
import {ExtendButtonBase} from '@mui/material/ButtonBase';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

type Props = {
    mode: 'light' | 'dark';
} & IconButtonProps;

export function ThemeSwitch(props: Props) {
    const theme = useTheme();

    return (
        <>
            <IconButton
                {...props}
                sx={{
                    width: theme.mixins.toolbar.minHeight,
                    height: theme.mixins.toolbar.minHeight,
                }}
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
