import { Box, Container, Skeleton } from '@mui/material';

function TrendingDestinationsSkeleton() {
  return (
    <Box sx={{ py: { xs: 4, sm: 6, md: 8 }, bgcolor: 'background.paper' }}>
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
              sm: 'repeat(auto-fill, minmax(320px, 1fr))',
              md: 'repeat(auto-fill, minmax(360px, 1fr))',
            },
            gap: { xs: 1.5, sm: 2, md: 2.5 },
            justifyItems: 'center',
          }}
        >
          {[...Array(3)].map((_, index) => (
            <Box
              key={index}
              sx={{
                width: '100%',
                maxWidth: 380,
                height: 520,
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              <Skeleton variant="rectangular" width="100%" height={260} />
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
