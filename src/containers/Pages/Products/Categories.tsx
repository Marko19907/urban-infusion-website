import {Box, Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader} from '@mui/material';
import {useState} from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {useNavigate} from 'react-router-dom';

const categories = {
    teas: [
        'black tea',
        'green tea',
        'white tea'
    ],
    accessories: [
        'cups'
    ]
};

export default function Categories() {
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
                    sx={{
                        width: 200
                    }}
                    subheader={
                        <ListSubheader>
                            Products
                        </ListSubheader>
                    }
                >
                    {
                        Object.entries(categories).map(([category, subcategories]) => (
                            <Category key={category} category={category} subcategories={subcategories}/>
                        ))
                    }
                </List>
                <Divider orientation={'vertical'}/>
            </Box>
        </>
    );
}

interface CategoryProps {
    category: string;
    subcategories: string[];
}

function Category(props: CategoryProps) {
    const [open, setOpen] = useState<boolean>(true);

    const navigate = useNavigate();

    return (
        <Box pb={4}>
            <ListItemButton onClick={() => setOpen(!open)}>
                <ListItemText sx={{textTransform: 'capitalize'}} primary={props.category}/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={open}>
                <List disablePadding dense>
                    {
                        props.subcategories.map(subcategory => (
                            <ListItemButton
                                key={subcategory}
                                sx={{paddingLeft: 8}}
                                onClick={() => navigate('/products/' + subcategory.replace(' ', '-'))}
                            >
                                <ListItemText sx={{textTransform: 'capitalize'}}>{subcategory}</ListItemText>
                            </ListItemButton>
                        ))
                    }
                </List>
            </Collapse>
        </Box>
    );
}
