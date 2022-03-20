import {Avatar, IconButton, Tooltip, useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function AccountButton() {
    const navigate = useNavigate();
    const theme = useTheme();
    return (
        <>
            <Tooltip arrow title={'Account'}>
                <IconButton
                    onClick={() => navigate('/account/')}
                    sx={{
                        width: theme.mixins.toolbar.minHeight,
                        height: theme.mixins.toolbar.minHeight,
                    }}
                >
                    <Avatar sx={{width: 32, height: 32}}>A</Avatar>
                </IconButton>
            </Tooltip>
        </>
    )
}