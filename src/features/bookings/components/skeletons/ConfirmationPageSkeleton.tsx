import { Skeleton, Box, Container, Paper, Stack, Divider } from '@mui/material';

/**
 * Skeleton loader for Confirmation Page
 */
function ConfirmationPageSkeleton() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Back Button Skeleton */}
        <Skeleton
          variant="rectangular"
          width={140}
          height={40}
          sx={{ borderRadius: 1, mb: 3 }}
        />

        {/* Action Buttons Skeleton */}
        <Box sx={{ maxWidth: 700, mx: 'auto', mb: 2 }}>
          <Stack direction="row" spacing={2}>
            <Skeleton variant="rectangular" width="50%" height={48} sx={{ borderRadius: 1 }} />
            <Skeleton variant="rectangular" width="50%" height={48} sx={{ borderRadius: 1 }} />
          </Stack>
        </Box>

        {/* Receipt Content Skeleton */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            maxWidth: 700,
            mx: 'auto',
          }}
        >
          {/* Success Header Skeleton */}
          <Box
            sx={{
              textAlign: 'center',
              mb: 3,
              pb: 2,
              borderBottom: '2px solid',
              borderColor: 'divider',
            }}
          >
            <Skeleton
              variant="circular"
              width={48}
              height={48}
              sx={{ mx: 'auto', mb: 1 }}
            />
            <Skeleton variant="text" width={200} height={36} sx={{ mx: 'auto' }} />
          </Box>

          {/* Confirmation Number Skeleton */}
          <Box
            sx={{
              bgcolor: 'grey.200',
              p: 1.5,
              borderRadius: 1,
              mb: 2,
              textAlign: 'center',
            }}
          >
            <Skeleton variant="text" width={150} height={24} sx={{ mx: 'auto', mb: 0.5 }} />
            <Skeleton variant="text" width={180} height={32} sx={{ mx: 'auto' }} />
          </Box>

          {/* Main Details Grid Skeleton */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: 2,
              mb: 2,
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Box key={item}>
                <Skeleton variant="text" width="60%" height={20} sx={{ mb: 0.5 }} />
                <Skeleton variant="text" width="80%" height={24} />
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Total Skeleton */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              bgcolor: 'grey.50',
              borderRadius: 1,
            }}
          >
            <Skeleton variant="text" width={120} height={28} />
            <Skeleton variant="text" width={100} height={40} />
          </Box>

          {/* Footer Skeleton */}
          <Skeleton
            variant="text"
            width="80%"
            height={20}
            sx={{ mt: 2, mx: 'auto' }}
          />
        </Paper>
      </Container>
    </Box>
  );
}

export default ConfirmationPageSkeleton;
