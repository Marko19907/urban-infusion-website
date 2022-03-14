import {Box, Divider, Typography} from '@mui/material';
import Section from '../../../components/Wrappers/Section';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import FeaturedProductsSection from './FeaturedProductsSection';
import TestimonialSection from './TestimonialSection';

export default function Landing() {
    return (
        <>
            <Box>
                <HeroSection/>
                <Divider/>
                <FeaturedProductsSection/>
                <Divider/>
                <FeaturesSection/>
                <Divider/>
                <TestimonialSection/>
                <Divider/>
            </Box>
        </>
    );
}
