import { Box } from '@mui/material';
import Navbar from '@/shared/components/Navbar';
import { useUserInfo } from '@/shared/hooks/useUserInfo';
import HeroSection from './HeroSection';
import FeaturedDeals from './FeaturedDeals';
import TrendingDestinations from './TrendingDestinations';
import RecentlyVisitedHotels from './RecentlyVisitedHotels';

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
      <FeaturedDeals />
      <TrendingDestinations />
      <RecentlyVisitedHotels />
    </Box>
  );
}

export default HomePage;