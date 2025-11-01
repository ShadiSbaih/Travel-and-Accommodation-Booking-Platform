import { Box, Container, Skeleton } from '@mui/material';

function TrendingDestinationsSkeleton() {
  return (
    <Box sx={{ py: { xs: 4, sm: 6, md: 8 }, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        {/* Header Skeleton */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="35%" height={40} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="55%" height={24} />
          </Box>
        </Box>

        {/* Cards Grid Skeleton */}
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
          {[...Array(6)].map((_, index) => (
            <Box
              key={index}
              sx={{
                width: '100%',
                maxWidth: 320,
                height: 480,
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Skeleton variant="rectangular" width="100%" height={220} />
              <Box sx={{ p: 2.5 }}>
                <Skeleton variant="text" width="70%" height={28} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="50%" height={20} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="90%" height={20} />
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default TrendingDestinationsSkeleton;
