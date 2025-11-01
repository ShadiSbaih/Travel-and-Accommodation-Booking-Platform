import { Box, Skeleton } from '@mui/material';
import HotelCardSkeleton from './HotelCardSkeleton';

interface SearchResultsSkeletonProps {
  count?: number;
}

function SearchResultsSkeleton({ count = 6 }: SearchResultsSkeletonProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header Skeleton */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Skeleton variant="text" width="30%" height={40} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Skeleton variant="text" width={80} height={24} />
          <Skeleton variant="circular" width={32} height={32} />
        </Box>
      </Box>

      {/* Grid Skeleton */}
      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, 
          gap: 3,
          gridAutoRows: '1fr',
        }}
      >
        {Array.from({ length: count }).map((_, index) => (
          <HotelCardSkeleton key={index} />
        ))}
      </Box>
    </Box>
  );
}

export default SearchResultsSkeleton;
