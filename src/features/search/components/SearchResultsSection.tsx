import { memo } from 'react';
import HotelCard from '@/features/hotels/components/HotelCard';
import ErrorState from '@/shared/components/ErrorState';
import EmptyState from '@/shared/components/EmptyState';
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Typography, Chip } from '@mui/material';
import type { SearchResultsSectionProps } from '../types';
import { SearchResultsSkeleton } from './skeletons';

const SearchResultsSection = memo(function SearchResultsSection({ 
  data, 
  rawData,
  isLoading, 
  error, 
  hasActiveFilters 
}: SearchResultsSectionProps) {
  if (isLoading) {
    return <SearchResultsSkeleton count={6} />;
  }

  if (error) {
    return <ErrorState message="Error loading results. Please try again." />;
  }

  if (!rawData || rawData.length === 0) {
    return <EmptyState title="No hotels found for your search." />;
  }

  if (hasActiveFilters && (!data || data.length === 0)) {
    return (
      <EmptyState 
        title="No hotels match your selected filters."
        subtitle="Try removing some filters to see more results."
        icon={<ErrorOutlineIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />}
      />
    );
  }

  const resultCount = data?.length || 0;
  const totalCount = rawData?.length || 0;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" component="h2" fontWeight="bold">
          Search Results
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip 
            label={`${resultCount} hotel${resultCount !== 1 ? 's' : ''}`}
            color="primary"
            sx={{ 
              fontWeight: 600,
              fontSize: '0.9rem',
              height: 36
            }}
          />
          {hasActiveFilters && totalCount !== resultCount && (
            <Typography variant="body2" color="text.secondary">
              of {totalCount} total
            </Typography>
          )}
        </Box>
      </Box>

      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, 
          gap: 3,
          gridAutoRows: '1fr',
          '& > *': {
            minHeight: 0
          }
        }}
      >
        {data?.map((hotel) => (
          <HotelCard key={hotel.hotelId} hotel={hotel} />
        ))}
      </Box>
    </Box>
  );
});

export default SearchResultsSection;