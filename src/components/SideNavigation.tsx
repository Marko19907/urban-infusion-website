import {Box, Collapse, Divider, List, ListItemButton, ListItemText, ListSubheader} from '@mui/material';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface Props {
    items: Record<string, string[]>;
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
                        Object.entries(props.items).map(([category, subcategories]) => (
                            <Category
                                key={category}
                                category={category}
                                path={props.path}
                                subcategories={subcategories}
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
    subcategories: string[];
}

function Category(props: CategoryProps) {
    const [open, setOpen] = useState<boolean>(true);

    const navigate = useNavigate();

    const hasSubcategories = props.subcategories.length > 0;

    return (
        <Box pb={4}>
            <ListItemButton
                onClick={
                    () => hasSubcategories
                        ? setOpen(!open)
                        : navigate(`/${props.path}/` + props.category)
                }
            >
                <ListItemText
                    sx={{textTransform: 'capitalize'}}
                    primary={props.category}
                />
                {
                    hasSubcategories && (open ? <ExpandLess/> : <ExpandMore/>)
                }
            </ListItemButton>
            {
                hasSubcategories &&
                (<Collapse in={open}>
                    <List disablePadding dense>
                        {
                            props.subcategories.map(subcategory => (
                                <ListItemButton
                                    key={subcategory}
                                    sx={{paddingLeft: 8}}
                                    onClick={() => navigate(`/${props.path}/` + subcategory)}
                                >
                                    <ListItemText sx={{textTransform: 'capitalize'}}>{subcategory}</ListItemText>
                                </ListItemButton>
                            ))
                        }
                    </List>
                </Collapse>)
            }
        </Box>
    );
}
