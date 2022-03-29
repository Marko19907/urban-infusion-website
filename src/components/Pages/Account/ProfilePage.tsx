import {Box, Stack, Typography, useTheme} from "@mui/material";
import {ReactNode} from "react";

interface CardProps {
    header: string;
    children?: any;
}


function AccountCard(props: CardProps) {
    const theme = useTheme();
    return (
        <>
            <Stack
                direction={{xs: 'column', md: 'row'}}
                sx={{
                    padding: 10,
                    width: '100%',
                    border: '1px solid red'
                }}
            >
                <Box
                    sx={{
                        border: '1px solid blue',
                        backgroundColor: '',
                        flex: {md: 1}
                    }}>
                    <Typography
                        variant={'h4'}
                        sx={{
                            py: 10,
                            px: 5,
                            width: '100%',
                            textAlign: 'center'
                        }}
                    >{props.header}</Typography>
                </Box>
                <Box
                    sx={{
                        border: '1px solid yellow',
                        flex: {md: '2'},
                        py: 10,
                        px: 5,
                    }}
                >

                </Box>
            </Stack>
        </>
    );
}

// TODO Girts - missing space. Good habit to press "Auto format" now and then :)
export default function ProfilePage(){
    return (<AccountCard header={'Shipping Information'}/>);

}

