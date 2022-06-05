import {CssBaseline, ThemeProvider} from '@mui/material';
import {getTheme} from '../theme/theme';
import Landing from './Pages/Landing';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {persistor, RootState, store} from '../state/store';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {QueryClient, QueryClientProvider} from 'react-query';
import Products from './Pages/Products';
import Product from './Pages/Product';
import Account from './Pages/Account/Account';
import Register from './Pages/Register';
import Cart from './Pages/Cart';
import NotFound from './Pages/NotFound';
import Login from './Pages/Login';
import TopAppBar from './Navigation/TopAppBar';
import Profile from './Pages/Account/Profile';
import Orders from './Pages/Account/Orders';
import ManageOrders from './Pages/Account/ManageOrders';
import ManageProducts from './Pages/Account/ManageProducts';
import {ReactQueryDevtools} from 'react-query/devtools';
import Checkout from './Pages/Checkout';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60000,
            retry: 0,
        },
    },
});

export default function App() {
    const theme = useSelector((s: RootState) => s.user.theme);
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                {/*<ReactQueryDevtools initialIsOpen={false}/>*/}
                <PersistGate persistor={persistor} loading={<div>Loading</div>}>
                    <ThemeProvider theme={getTheme(theme)}>
                        <CssBaseline/>
                        <BrowserRouter>
                            <TopAppBar/>
                            <Routes>
                                <Route path={'/'} element={<Landing/>}/>
                                <Route path={'/products'} element={<Navigate to={'/products/all'}/>}/>
                                <Route path={'/products/:id'} element={<Products/>}/>
                                <Route path={'/product/:id'} element={<Product/>}/>
                                <Route path={'/account'} element={<Account/>}>
                                    <Route index element={<Navigate to={'profile'}/>}/>
                                    <Route path={'profile'} element={<Profile/>}/>
                                    <Route path={'orders'} element={<Orders/>}/>
                                    <Route path={'manage-orders'} element={<ManageOrders/>}/>
                                    <Route path={'manage-products'} element={<ManageProducts/>}/>
                                </Route>
                                <Route path={'/cart'} element={<Cart/>}/>
                                <Route path={'/checkout'} element={<Checkout/>}/>
                                <Route path={'/login'} element={<Login/>}/>
                                <Route path={'/register'} element={<Register/>}/>
                                <Route path={'*'} element={<NotFound/>}/>
                            </Routes>
                        </BrowserRouter>
                    </ThemeProvider>
                </PersistGate>
            </Provider>
        </QueryClientProvider>
    );
}
