import React from 'react';
import { Box, Container } from '@mui/material';
import { LocalOffer as OfferIcon } from '@mui/icons-material';
import type { FeaturedDealDto } from '../types';
import { useFeaturedDeals } from '../hooks';
import FeaturedDealCard from './FeaturedDealCard';
import SectionHeader from './SectionHeader';
import { FeaturedDealsSkeleton } from './skeletons';
import { withDataStates } from '@/shared/hocs';

// Pure presentation component
const FeaturedDealsContent = React.memo(({ data }: { data?: FeaturedDealDto[] }) => {
  if (!data) return null;

  return (
    <Box sx={{ py: { xs: 4, sm: 6, md: 8 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <SectionHeader
          title="Featured Deals"
          subtitle="Limited time offers on amazing hotels"
          icon={<OfferIcon sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, color: 'warning.main' }} />}
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
          {data.map((deal: FeaturedDealDto) => (
            <FeaturedDealCard key={deal.hotelId} deal={deal} />
          ))}
        </Box>
      </Container>
    </Box>
  );
});

FeaturedDealsContent.displayName = 'FeaturedDealsContent';

// Apply HOC for loading, error, and empty states
const FeaturedDealsWithStates = withDataStates<FeaturedDealDto[]>(FeaturedDealsContent, {
  LoadingSkeleton: FeaturedDealsSkeleton,
  errorTitle: 'Unable to Load Featured Deals',
  errorMessage: "We're having trouble loading our featured deals at the moment. Please try again.",
  errorIcon: <OfferIcon sx={{ fontSize: '3rem', color: 'error.main' }} />,
  emptyTitle: 'No featured deals available',
  emptySubtitle: 'Check back later for exciting offers',
  emptyIcon: <OfferIcon sx={{ fontSize: '3rem', color: 'text.secondary' }} />,
  isEmpty: (data) => !data || data.length === 0,
});

// Container component
const FeaturedDeals = React.memo(() => {
  const { data, isLoading, isError, refetch } = useFeaturedDeals();
  return (
    <FeaturedDealsWithStates 
      data={data} 
      isLoading={isLoading} 
      isError={isError} 
      refetch={refetch} 
    />
  );
});

FeaturedDeals.displayName = 'FeaturedDeals';

export default FeaturedDeals;