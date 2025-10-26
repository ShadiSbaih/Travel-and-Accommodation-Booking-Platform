import { Box, Container } from '@mui/material';
import { History as HistoryIcon } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { useUserInfo } from '@/shared/hooks/useUserInfo';
import homePageApi from '../api/home-page.api';
import type { RecentlyVisitedHotelDto } from '../types/home.types';
import RecentlyVisitedCard from './RecentlyVisitedCard';
import SectionHeader from './SectionHeader';
import LoadingState from '@/shared/components/LoadingState';
import ErrorState from '@/shared/components/ErrorState';
import EmptyState from '@/shared/components/EmptyState';

function RecentlyVisitedHotels() {
  const { userId } = useUserInfo();

  const {
    data: recentlyVisitedHotels = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['recentlyVisitedHotels', userId],
    queryFn: () => homePageApi.getRecentlyVisitedHotels(userId as string),
    enabled: !!userId,
  });

  // Don't show section if user is not logged in
  if (!userId) return null;

  if (isLoading) return <LoadingState message="Loading your recently visited hotels..." />;
  if (isError)
    return <ErrorState message="Unable to load your hotel history. Please try again later." />;

  if (recentlyVisitedHotels.length === 0) {
    return (
      <Box sx={{ py: { xs: 4, sm: 6, md: 8 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <SectionHeader
            title="Recently Visited"
            subtitle="Hotels you've checked out recently"
            icon={
              <HistoryIcon sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, color: 'info.main' }} />
            }
          />
          <EmptyState
            title="No recently visited hotels"
            subtitle="Start exploring and your visited hotels will appear here"
            icon={<HistoryIcon sx={{ fontSize: '3rem', color: 'text.secondary' }} />}
          />
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 4, sm: 6, md: 8 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <SectionHeader
          title="Recently Visited"
          subtitle="Hotels you've checked out recently"
          icon={
            <HistoryIcon sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, color: 'info.main' }} />
          }
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(auto-fill, minmax(280px, 1fr))',
              md: 'repeat(auto-fill, minmax(300px, 1fr))',
            },
            gap: { xs: 2, sm: 3, md: 4 },
            justifyItems: 'center',
          }}
        >
          {recentlyVisitedHotels.map((hotel: RecentlyVisitedHotelDto) => (
            <RecentlyVisitedCard key={hotel.hotelId} hotel={hotel} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default RecentlyVisitedHotels;