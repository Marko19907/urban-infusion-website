import {IconButton, Tooltip} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {UserAvatar} from '../UserAvatar';

interface Props {
    img?: string;
    name?: string;
}

export default function AccountButton(props: Props) {
    const navigate = useNavigate();
    return (
        <>
            <Tooltip arrow title={'Account'}>
                <IconButton onClick={() => navigate('/account/')}>
                    <UserAvatar
                        name={props.name}
                        src={props.img}
                        sx={{width: 32, height: 32}}
                    />
                </IconButton>
            </Tooltip>
        </>
    );
}
