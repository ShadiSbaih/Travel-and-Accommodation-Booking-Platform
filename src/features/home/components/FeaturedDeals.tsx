import React from 'react';
import { Box, Container } from '@mui/material';
import { LocalOffer as OfferIcon } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import homePageApi from '../api/home-page.api';
import type { FeaturedDealDto } from '../types';
import FeaturedDealCard from './FeaturedDealCard';
import SectionHeader from './SectionHeader';
import ErrorState from '@/shared/components/ErrorState';
import EmptyState from '@/shared/components/EmptyState';
import { FeaturedDealsSkeleton } from './skeletons';

const FeaturedDeals = React.memo(() => {
  const { data: featuredDeals = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['featuredDeals'],
    queryFn: () => homePageApi.getFeaturedDeals(),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });

  if (isLoading) return <FeaturedDealsSkeleton />;
  if (isError)
    return (
      <Box sx={{ py: { xs: 4, sm: 6, md: 8 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <ErrorState
            title="Unable to Load Featured Deals"
            message="We're having trouble loading our featured deals at the moment. Please try again."
            variant="error"
            icon={<OfferIcon sx={{ fontSize: '3rem', color: 'error.main' }} />}
            showRetry
            onRetry={() => refetch()}
          />
        </Container>
      </Box>
    );

  if (featuredDeals.length === 0) {
    return (
      <Box sx={{ py: { xs: 4, sm: 6, md: 8 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <SectionHeader
            title="Featured Deals"
            subtitle="Limited time offers on amazing hotels"
            icon={<OfferIcon sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, color: 'warning.main' }} />}
          />
          <EmptyState
            title="No featured deals available"
            subtitle="Check back later for exciting offers"
            icon={<OfferIcon sx={{ fontSize: '3rem', color: 'text.secondary' }} />}
          />
        </Container>
      </Box>
    );
  }

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
          {featuredDeals.map((deal: FeaturedDealDto) => (
            <FeaturedDealCard key={deal.hotelId} deal={deal} />
          ))}
        </Box>
      </Container>
    </Box>
  );
});

FeaturedDeals.displayName = 'FeaturedDeals';

export default FeaturedDeals;