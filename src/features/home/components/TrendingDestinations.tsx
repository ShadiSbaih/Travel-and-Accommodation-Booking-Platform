import React from 'react';
import { Box, Container } from '@mui/material';
import { TrendingUp as TrendingIcon } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import homePageApi from '../api/home-page.api';
import type { TrendingDestinationDto } from '../types';
import TrendingDestinationCard from './TrendingDestinationCard';
import SectionHeader from './SectionHeader';
import ErrorState from '@/shared/components/ErrorState';
import EmptyState from '@/shared/components/EmptyState';
import { TrendingDestinationsSkeleton } from './skeletons';

const TrendingDestinations = React.memo(() => {
  const { data: trendingDestinations = [], isLoading, isError } = useQuery({
    queryKey: ['trendingDestinations'],
    queryFn: () => homePageApi.getTrendingDestinations(),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });

  if (isLoading) return <TrendingDestinationsSkeleton />;
  if (isError)
    return <ErrorState message="Unable to load trending destinations. Please try again later." />;

  if (trendingDestinations.length === 0) {
    return (
      <EmptyState
        title="No trending destinations available"
        subtitle="Explore our search to find your perfect destination"
        icon={<TrendingIcon sx={{ fontSize: '3rem', color: 'text.secondary' }} />}
      />
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
              sm: 'repeat(auto-fill, minmax(280px, 1fr))',
              md: 'repeat(auto-fill, minmax(300px, 1fr))',
            },
            gap: { xs: 2, sm: 3, md: 4 },
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