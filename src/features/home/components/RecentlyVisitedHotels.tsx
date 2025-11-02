import { Box, Container } from '@mui/material';
import { History as HistoryIcon } from '@mui/icons-material';
import { useUserInfo } from '@/shared/hooks/useUserInfo';
import type { RecentlyVisitedHotelDto } from '../types';
import { useRecentlyVisitedHotels } from '../hooks';
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
    refetch,
  } = useRecentlyVisitedHotels(userId as string);

  // Show empty state if user is not logged in
  if (!userId) {
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
            title="Sign in to see your hotel history"
            subtitle="Log in to view hotels you've recently explored"
            icon={<HistoryIcon sx={{ fontSize: '3rem', color: 'text.secondary' }} />}
          />
        </Container>
      </Box>
    );
  }

  if (isLoading) return <RecentlyVisitedSkeleton />;
  if (isError)
    return (
      <Box sx={{ py: { xs: 4, sm: 6, md: 8 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <ErrorState
            title="Unable to Load Your Hotel History"
            message="We're having trouble loading your recently visited hotels. Please try again."
            variant="error"
            icon={<HistoryIcon sx={{ fontSize: '3rem', color: 'error.main' }} />}
            showRetry
            onRetry={() => refetch()}
          />
        </Container>
      </Box>
    );

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