import useCategories from '../../hooks/categories/useCategories';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {AppBar, Divider, Stack, Typography, useTheme} from '@mui/material';
import UnstyledLink from '../../components/UnstyledLink';

export default function ProductNavigation() {
    const [categories, setCategories] = useState<string[]>(['ALL']);

    const {data: fetchedCategories} = useCategories();
    const {pathname} = useLocation();
    const theme = useTheme();

    useEffect(() => {
        if (fetchedCategories) {
            setCategories(['ALL', ...(fetchedCategories as Array<string>)]);
        }
    }, [fetchedCategories]);

    const isActiveCategory = (category: string) => {
        return pathname.toLowerCase().indexOf(category.toLowerCase()) > -1;
    };

    return (
        <>
            <AppBar
                sx={{
                    boxShadow: 'none',
                    maxHeight: theme.custom.heights.navBar
                }}
                position={'sticky'}
                color={'primary'}
            >
                <Stack px={8} py={1} alignItems={'center'}>
                    <Stack
                        direction={'row'}
                        spacing={2}
                        width={'100%'}
                        maxWidth={theme.breakpoints.values.lg}
                    >
                        {
                            categories.map(category => (
                                <UnstyledLink to={`/products/${category.toLowerCase()}`} key={category}>
                                    <Stack
                                        key={category}
                                        height={32}
                                        px={4}
                                        my={1}
                                        alignItems={'center'}
                                        justifyContent={'center'}
                                        borderBottom={'2px solid'}
                                        borderColor={isActiveCategory(category) ? theme.palette.secondary.main : 'transparent'}
                                        sx={{
                                            transition: 'all .1s ease',
                                            cursor: 'pointer',
                                            userSelect: 'none',
                                            '&:hover': {
                                                borderColor: theme.palette.secondary.dark,
                                            }
                                        }}
                                    >
                                        <Typography
                                            textTransform={'capitalize'}
                                            variant={'body2'}
                                        >
                                            {category.toLowerCase()}
                                        </Typography>
                                    </Stack>
                                </UnstyledLink>
                            ))
                        }
                    </Stack>
                </Stack>
                <Divider/>
            </AppBar>
        </>
    );
}
