import React from 'react';
import { Box } from '@mui/material';
import Navbar from '@/shared/components/Navbar';
import { useUserInfo } from '@/shared/hooks/useUserInfo';
import HeroSection from './HeroSection';
import LazySection from './LazySection';
import { FeaturedDealsSkeleton, TrendingDestinationsSkeleton, RecentlyVisitedSkeleton } from './skeletons';

// Lazy load sections for better performance
const FeaturedDeals = React.lazy(() => import('./FeaturedDeals'));
const TrendingDestinations = React.lazy(() => import('./TrendingDestinations'));
const RecentlyVisitedHotels = React.lazy(() => import('./RecentlyVisitedHotels'));

function HomePage() {
  const { fullName } = useUserInfo();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Navbar />
      <HeroSection userName={fullName} />
      
      <LazySection fallback={<FeaturedDealsSkeleton />}>
        <FeaturedDeals />
      </LazySection>
      
      <LazySection fallback={<TrendingDestinationsSkeleton />}>
        <TrendingDestinations />
      </LazySection>
      
      <LazySection fallback={<RecentlyVisitedSkeleton />}>
        <RecentlyVisitedHotels />
      </LazySection>
    </Box>
  );
}

export default HomePage;