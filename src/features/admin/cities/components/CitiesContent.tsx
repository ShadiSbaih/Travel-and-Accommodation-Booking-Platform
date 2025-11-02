import { Box } from '@mui/material';
import CityCard from './CityCard';
import CityListView from './CityListView';
import CityCardSkeleton from './CityCardSkeleton';
import CityListSkeleton from './CityListSkeleton';
import type { CitiesContentProps } from '../types/component.types';

function CitiesContent({
  cities,
  viewMode,
  isLoading,
  hasMore,
  loadMoreRef,
}: Omit<CitiesContentProps, 'onEdit'>) {
  if (isLoading && cities.length === 0) {
    return viewMode === 'grid' ? (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: 3,
          mt: 3,
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <CityCardSkeleton key={index} />
        ))}
      </Box>
    ) : (
      <Box sx={{ mt: 3 }}>
        <CityListSkeleton />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      {viewMode === 'grid' ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </Box>
      ) : (
        <CityListView cities={cities} />
      )}

      {/* Infinite scroll trigger */}
      {hasMore && (
        <Box ref={loadMoreRef} sx={{ py: 2, mt: 3 }}>
          {isLoading && viewMode === 'grid' ? (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                },
                gap: 3,
              }}
            >
              {Array.from({ length: 3 }).map((_, index) => (
                <CityCardSkeleton key={`skeleton-${index}`} />
              ))}
            </Box>
          ) : null}
        </Box>
      )}
    </Box>
  );
}

export default CitiesContent;
