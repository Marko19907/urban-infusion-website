import {CssBaseline, Divider, ThemeProvider, Toolbar} from '@mui/material';
import {getTheme} from '../../theme/theme';
import Landing from '../Pages/Landing/Landing';
import NavigationBar from '../NavigationBar';
import Footer from '../Footer';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Products from '../Pages/Products/Products';
import NotFound from '../Pages/NotFound/NotFound';
import {RootState} from '../../state/store';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getProducts} from '../../api/urbaninfusion/public/products';
import axios from 'axios';
import {getPath} from '../../api/urbaninfusion/urbaninfusion';
import {Router} from 'react-router-dom';
import {ProductsList} from '../Pages/Products/ProductsList';
import Categories from '../Pages/Products/Categories';

export default function App() {
    const theme = useSelector((store: RootState) => store.userPreferences.theme);

    return (
        <ThemeProvider theme={getTheme(theme)}>
            <CssBaseline/>
            <BrowserRouter>
                <Toolbar/>
                <NavigationBar/>
                <Routes>
                    <Route path={'/'} element={<Landing/>}/>
                    <Route path={'/products'} element={<Products/>}/>
                    <Route path={'/products/:id'} element={<Products/>}/>
                    <Route path={'*'} element={<NotFound/>}/>
                </Routes>
                <Divider/>
                <Footer/>
            </BrowserRouter>
        </ThemeProvider>
    );
}
