import {createTheme} from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Theme {
        custom: {
            heights: {
                topBar: number;
                navBar: number;
            }
        };
    }

    // allow configuration using `createTheme`
    interface ThemeOptions {
        custom: {
            heights: {
                topBar: number;
                navBar: number;
            }
        };
    }
}

export const getTheme = (theme: 'light' | 'dark') => {
    return createTheme({
        custom: {
            heights: {
                topBar: 64,
                navBar: 48,
            }
        },
        spacing: 4,
        palette: {
            mode: theme,
            primary: {
                main: '#122e1e',
                light: '#e3f4eb',
                dark: '#1b472e',
            },
            secondary: {
                main: '#F5A623',
                light: '#FDF5E6'
            },
        },
        typography: {
            fontFamily: [
                'Roboto',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
        },
    });
};
