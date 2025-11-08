import React from 'react';
import { Box, Container } from '@mui/material';
import { TrendingUp as TrendingIcon } from '@mui/icons-material';
import type { TrendingDestinationDto } from '../types';
import { useTrendingDestinations } from '../hooks';
import TrendingDestinationCard from './TrendingDestinationCard';
import SectionHeader from './SectionHeader';
import { TrendingDestinationsSkeleton } from './skeletons';
import { withDataStates } from '@/shared/hocs';

// Pure presentation component
const TrendingDestinationsContent = React.memo(({ data }: { data?: TrendingDestinationDto[] }) => {
  if (!data) return null;
  
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
          {data.map((destination: TrendingDestinationDto) => (
            <TrendingDestinationCard key={destination.cityId} destination={destination} />
          ))}
        </Box>
      </Container>
    </Box>
  );
});

TrendingDestinationsContent.displayName = 'TrendingDestinationsContent';

// Apply HOC to handle loading, error, and empty states
const TrendingDestinationsWithStates = withDataStates<TrendingDestinationDto[]>(TrendingDestinationsContent, {
  LoadingSkeleton: TrendingDestinationsSkeleton,
  errorTitle: 'Unable to Load Trending Destinations',
  errorMessage: "We're having trouble loading trending destinations right now. Please try again.",
  errorIcon: <TrendingIcon sx={{ fontSize: '3rem', color: 'error.main' }} />,
  emptyTitle: 'No trending destinations available',
  emptySubtitle: 'Explore our search to find your perfect destination',
  emptyIcon: <TrendingIcon sx={{ fontSize: '3rem', color: 'text.secondary' }} />,
  isEmpty: (data) => !data || data.length === 0,
});

// Container component that connects to data
const TrendingDestinations = React.memo(() => {
  const { data, isLoading, isError, refetch } = useTrendingDestinations();
  return (
    <TrendingDestinationsWithStates 
      data={data} 
      isLoading={isLoading} 
      isError={isError} 
      refetch={refetch} 
    />
  );
});

TrendingDestinations.displayName = 'TrendingDestinations';

export default TrendingDestinations;