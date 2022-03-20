import {Box} from '@mui/material';
import {useEffect, useState} from 'react';
import {getProducts} from '../../../api/urbaninfusion/public/products';
import {ProductDto} from '../../../api/urbaninfusion/dto/product-dto';
import {ProductsList} from './ProductsList';
import {useParams} from 'react-router-dom';
import SideNavigation from '../../../components/SideNavigation';

const categories = {
    teas: [
        'black tea',
        'green tea',
        'white tea'
    ],
    accessories: [
        'cups'
    ],
    'gift cards': []
};

export default function Products() {
    const [products, setProducts] = useState<ProductDto[]>([]);
    const {id} = useParams();

    useEffect(() => {
        void (async () => {
            const data = await getProducts();
            setProducts(data);
        })();
    }, []);

    return (
        <>
            <Box sx={{
                display: 'flex',
                width: '100%'
            }}>
                <SideNavigation
                    items={categories}
                    header={'Products'}
                    path={'products'}
                />
                <ProductsList products={products} id={id}/>
            </Box>
        </>
    );
}
