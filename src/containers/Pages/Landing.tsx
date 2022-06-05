import {Box} from '@mui/material';
import HeroSection from '../../components/Pages/Landing/HeroSection';
import FeaturesSection from '../../components/Pages/Landing/FeaturesSection';
import FeaturedProductsSection from '../../components/Pages/Landing/FeaturedProductsSection';
import TestimonialSection from '../../components/Pages/Landing/TestimonialSection';
import Footer from '../Footer';
import useProducts from '../../hooks/products/useProducts';

export default function Landing() {
    const {data: products} = useProducts();

    return (
        <>
            <Box>
                <HeroSection
                    title={'Find your herbal friend'}
                    description={'High quality tea sourced from more than 140 different countries'}
                />
                <FeaturedProductsSection products={products || []}/>
                <FeaturesSection/>
                <TestimonialSection/>
                <Footer/>
            </Box>
        </>
    );
}
