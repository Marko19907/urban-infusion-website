import {CssBaseline, Divider, ThemeProvider, Toolbar} from '@mui/material';
import {getTheme} from '../../theme/theme';
import Landing from '../Pages/Landing/Landing';
import NavigationBar from '../NavigationBar';
import Footer from '../Footer';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Products from '../Pages/Products/Products';
import NotFound from '../Pages/NotFound/NotFound';
import {persistor, RootState, store} from '../../state/store';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Account from "../Pages/Account/Account";
import Cart from "../Pages/Cart/Cart";

export default function App() {
    const theme = useSelector((s: RootState) => s.userPreferences.theme);

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={<div>Loading</div>}>
                <ThemeProvider theme={getTheme(theme)}>
                    <CssBaseline/>
                    <BrowserRouter>
                        <NavigationBar/>
                        <Routes>
                            <Route path={'/'} element={<Landing/>}/>
                            <Route path={'/products'} element={<Products/>}/>
                            <Route path={'/products/:id'} element={<Products/>}/>
                            <Route path={'/account'} element={<Account/>}/>
                            <Route path={'/account/:id'} element={<Account/>}/>
                            <Route path={'/cart'} element={<Cart/>}/>
                            <Route path={'*'} element={<NotFound/>}/>
                        </Routes>
                        <Divider/>
                        <Footer/>
                    </BrowserRouter>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
}
