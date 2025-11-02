import { Box, CircularProgress } from '@mui/material';
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
  if (isLoading) {
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
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <CityCardSkeleton key={index} />
        ))}
      </Box>
    ) : (
      <CityListSkeleton />
    );
  }

  return (
    <Box>
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

      {/* Load More Trigger for Infinite Scroll */}
      {hasMore && (
        <Box
          ref={loadMoreRef}
          sx={{
            py: 4,
            mt: 3,
          }}
        >
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
              {Array.from({ length: 3 }).map((_, index) => (
                <CityCardSkeleton key={`skeleton-${index}`} />
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 3,
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(30, 41, 59, 0.95)'
                    : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: 2,
                boxShadow: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '0 4px 20px rgba(0, 0, 0, 0.3)'
                    : '0 4px 20px rgba(0, 0, 0, 0.08)',
              }}
            >
              <CircularProgress
                size={50}
                thickness={4}
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#22d3ee' : '#0891b2',
                }}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default CitiesContent;
