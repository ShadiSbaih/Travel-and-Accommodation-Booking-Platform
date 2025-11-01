import { Box, Container } from '@mui/material';
import { History as HistoryIcon } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { useUserInfo } from '@/shared/hooks/useUserInfo';
import homePageApi from '../api/home-page.api';
import type { RecentlyVisitedHotelDto } from '../types';
import RecentlyVisitedCard from './RecentlyVisitedCard';
import SectionHeader from './SectionHeader';
import ErrorState from '@/shared/components/ErrorState';
import EmptyState from '@/shared/components/EmptyState';
import { RecentlyVisitedSkeleton } from './skeletons';

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
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });

  // Don't show section if user is not logged in
  if (!userId) return null;

  if (isLoading) return <RecentlyVisitedSkeleton />;
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
              sm: 'repeat(auto-fill, minmax(320px, 1fr))',
              md: 'repeat(auto-fill, minmax(360px, 1fr))',
            },
            gap: { xs: 1.5, sm: 2, md: 2.5 },
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