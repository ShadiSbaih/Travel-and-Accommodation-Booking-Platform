import { Box, Container } from '@mui/material';
import { History as HistoryIcon } from '@mui/icons-material';
import { useUserInfo } from '@/shared/hooks/useUserInfo';
import type { RecentlyVisitedHotelDto } from '../types';
import { useRecentlyVisitedHotels } from '../hooks';
import RecentlyVisitedCard from './RecentlyVisitedCard';
import SectionHeader from './SectionHeader';
import EmptyState from '@/shared/components/EmptyState';
import { RecentlyVisitedSkeleton } from './skeletons';
import { withDataStates } from '@/shared/hocs';

// Pure presentation component
function RecentlyVisitedContent({ data }: { data?: RecentlyVisitedHotelDto[] }) {
  if (!data) return null;

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
          {data.map((hotel: RecentlyVisitedHotelDto) => (
            <RecentlyVisitedCard key={hotel.hotelId} hotel={hotel} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

// Apply HOC for loading and error states
const RecentlyVisitedWithStates = withDataStates<RecentlyVisitedHotelDto[]>(RecentlyVisitedContent, {
  LoadingSkeleton: RecentlyVisitedSkeleton,
  errorTitle: 'Unable to Load Your Hotel History',
  errorMessage: "We're having trouble loading your recently visited hotels. Please try again.",
  errorIcon: <HistoryIcon sx={{ fontSize: '3rem', color: 'error.main' }} />,
  emptyTitle: 'No recently visited hotels',
  emptySubtitle: 'Start exploring and your visited hotels will appear here',
  emptyIcon: <HistoryIcon sx={{ fontSize: '3rem', color: 'text.secondary' }} />,
  isEmpty: (data) => !data || data.length === 0,
});

// Container component with conditional rendering
function RecentlyVisitedHotels() {
  const { userId } = useUserInfo();
  const { data, isLoading, isError, refetch } = useRecentlyVisitedHotels(userId as string);

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

  return (
    <RecentlyVisitedWithStates
      data={data}
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
    />
  );
}

export default RecentlyVisitedHotels;