import React from 'react';
import { Box, Container } from '@mui/material';
import { TrendingUp as TrendingIcon } from '@mui/icons-material';
import type { TrendingDestinationDto } from '../types';
import { useTrendingDestinations } from '../hooks';
import TrendingDestinationCard from './TrendingDestinationCard';
import SectionHeader from './SectionHeader';
import ErrorState from '@/shared/components/ErrorState';
import EmptyState from '@/shared/components/EmptyState';
import { TrendingDestinationsSkeleton } from './skeletons';

const TrendingDestinations = React.memo(() => {
  const { data: trendingDestinations = [], isLoading, isError, refetch } = useTrendingDestinations();

  if (isLoading) return <TrendingDestinationsSkeleton />;
  if (isError)
    return (
      <Box sx={{ py: { xs: 4, sm: 6, md: 8 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <ErrorState
            title="Unable to Load Trending Destinations"
            message="We're having trouble loading trending destinations right now. Please try again."
            variant="error"
            icon={<TrendingIcon sx={{ fontSize: '3rem', color: 'error.main' }} />}
            showRetry
            onRetry={() => refetch()}
          />
        </Container>
      </Box>
    );

  if (trendingDestinations.length === 0) {
    return (
      <Box sx={{ py: { xs: 4, sm: 6, md: 8 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <SectionHeader
            title="Trending Destinations"
            subtitle="Popular places travelers are exploring now"
            icon={
              <TrendingIcon sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, color: 'success.main' }} />
            }
          />
          <EmptyState
            title="No trending destinations available"
            subtitle="Explore our search to find your perfect destination"
            icon={<TrendingIcon sx={{ fontSize: '3rem', color: 'text.secondary' }} />}
          />
        </Container>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        py: { xs: 4, sm: 6, md: 8 }, 
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <SectionHeader
          title="Trending Destinations"
          subtitle="Popular places travelers are exploring now"
          icon={
            <TrendingIcon sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, color: 'success.main' }} />
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
          {trendingDestinations.map((destination: TrendingDestinationDto) => (
            <TrendingDestinationCard key={destination.cityId} destination={destination} />
          ))}
        </Box>
      </Container>
    </Box>
  );
});

TrendingDestinations.displayName = 'TrendingDestinations';

export default TrendingDestinations;