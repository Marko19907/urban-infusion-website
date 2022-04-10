import {CssBaseline, Divider, ThemeProvider} from '@mui/material';
import {getTheme} from '../theme/theme';
import Landing from './Pages/Landing';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Products from './Pages/Products';
import NotFound from './Pages/NotFound';
import {persistor, RootState, store} from '../state/store';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Account from './Pages/Account';
import Cart from './Pages/CartPage';
import About from './Pages/About';
import Product from './Pages/Product';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

export default function App() {
    const theme = useSelector((s: RootState) => s.userPreferences.theme);

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <PersistGate persistor={persistor} loading={<div>Loading</div>}>
                    <ThemeProvider theme={getTheme(theme)}>
                        <CssBaseline/>
                        <BrowserRouter>
                            <NavigationBar/>
                            <Routes>
                                <Route path={'/'} element={<Landing/>}/>
                                <Route path={'/products'} element={<Products/>}/>
                                <Route path={'/products/:id'} element={<Products/>}/>
                                <Route path={'/product/:id'} element={<Product/>}/>
                                <Route path={'/account'} element={<Account/>}/>
                                <Route path={'/account/:id'} element={<Account/>}/>
                                <Route path={'/cart'} element={<Cart/>}/>
                                <Route path={'/about'} element={<About/>}/>
                                <Route path={'*'} element={<NotFound/>}/>
                            </Routes>
                            <Divider/>
                            <Footer/>
                        </BrowserRouter>
                    </ThemeProvider>
                </PersistGate>
            </QueryClientProvider>
        </Provider>
    );
}
