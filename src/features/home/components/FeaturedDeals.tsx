import { Box, Container } from '@mui/material';
import { LocalOffer as OfferIcon } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import homePageApi from '../api/home-page.api';
import type { FeaturedDealDto } from '../types/home.types';
import FeaturedDealCard from './FeaturedDealCard';
import SectionHeader from './SectionHeader';
import LoadingState from '@/shared/components/LoadingState';
import ErrorState from '@/shared/components/ErrorState';
import EmptyState from '@/shared/components/EmptyState';

function FeaturedDeals() {
  const { data: featuredDeals = [], isLoading, isError } = useQuery({
    queryKey: ['featuredDeals'],
    queryFn: () => homePageApi.getFeaturedDeals(),
  });

  if (isLoading) return <LoadingState message="Loading featured deals..." />;
  if (isError)
    return <ErrorState message="Unable to load featured deals. Please try again later." />;

  if (featuredDeals.length === 0) {
    return (
      <EmptyState
        title="No featured deals available"
        subtitle="Check back later for exciting offers"
        icon={<OfferIcon sx={{ fontSize: '3rem', color: 'text.secondary' }} />}
      />
    );
  }

  return (
    <Box sx={{ py: { xs: 4, sm: 6, md: 8 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <SectionHeader
          title="Featured Deals"
          subtitle="Limited time offers on amazing hotels"
          icon={<OfferIcon sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, color: 'error.main' }} />}
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
          {featuredDeals.map((deal: FeaturedDealDto) => (
            <FeaturedDealCard key={deal.hotelId} deal={deal} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default FeaturedDeals;