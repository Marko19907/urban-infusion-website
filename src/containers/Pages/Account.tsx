import {Box} from '@mui/material';
import SideNavigation from '../../components/SideNavigation';
import {ReactNode} from 'react';
import {useParams} from 'react-router-dom';
import OrderHistory from '../../components/Pages/Account/OrderHistory';
import ProfilePage from '../../components/Pages/Account/ProfilePage';

const navigation = [
    "profile",
    "orders",
]

function displayPage(id: string): ReactNode {
    switch (id) {
        case 'orders': {
            return (<OrderHistory/>);
        }
        default: {
            return (<ProfilePage/>);
        }
    }
}

export default function Account() {
    const {id} = useParams();

    return (
        <>
            <Box sx={{
                display: 'flex',
                width: '100%'
            }}>
                <SideNavigation
                    items={navigation}
                    header={'Account'}
                    path={'account'}
                />
                {displayPage(id || '')}
            </Box>
        </>
    );
}
