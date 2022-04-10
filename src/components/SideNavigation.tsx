import {Box, Divider, List, ListItemButton, ListItemText, ListSubheader} from '@mui/material';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

interface Props {
    items?: string[];
    header?: string;
    path: string;
}

export default function SideNavigation(props: Props) {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    minHeight: '75vh',
                }}
            >
                <List
                    dense
                    sx={{width: 200}}
                    subheader={
                        <ListSubheader>
                            {props.header}
                        </ListSubheader>
                    }
                >
                    {
                        props.items &&
                        props.items.map(category => (
                            <Category
                                key={category}
                                category={category}
                                path={props.path}
                            />
                        ))
                    }
                </List>
                <Divider orientation={'vertical'}/>
            </Box>
        </>
    );
}

interface CategoryProps {
    path: string;
    category: string;
}

function Category(props: CategoryProps) {
    const [open, setOpen] = useState<boolean>(true);

    const navigate = useNavigate();

    return (
        <Box pb={4}>
            <ListItemButton
                onClick={() => navigate(`/${props.path}/` + props.category)}
            >
                <ListItemText
                    sx={{textTransform: 'capitalize'}}
                    primary={props.category}
                />
            </ListItemButton>
        </Box>
    );
}
